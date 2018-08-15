import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

export function getComponentDisplayName(type) {
    const displayName = type.displayName || type.name;
    return displayName && displayName !== 'ReactComponent'
        ? displayName
        : 'Component';
}

// global/modules

/* eslint-disable camelcase, no-undef */
const requireIndirect = typeof __webpack_require__ !== 'undefined'
    ? __webpack_require__
    : require;
/* eslint-enable */

export function createHoc(prefix, SourceComponent, TargetComponent) {
    hoistNonReactStatics(TargetComponent, SourceComponent);
    TargetComponent.displayName = `${prefix}${getComponentDisplayName(
        SourceComponent,
    )}`;
    return TargetComponent;
}

export function createHotModuleDefault() {
    return {
        instances: [],
        updateTimeout: 0,
    };
}

export function createHotModuleInstanceDefualt(props) {
    return props;
}

export function hasInstanceDefault(instances, { key, store }) {
    return instances.some((inst) => inst.key === key && inst.store === store);
}

function makeHotExport(getHotModule, sourceModule, onModuleUpdate, args) {
    if (process.env.NODE_ENV === 'production' || !sourceModule.hot) {
        return;
    }

    const updateInstances = () => {
        const hotModule = getHotModule(sourceModule.id);

        clearTimeout(hotModule.updateTimeout);

        hotModule.updateTimeout = setTimeout(() => {
            try {
                const moduleExport = requireIndirect(sourceModule.id);
                onModuleUpdate(hotModule, moduleExport.default, ...args);
            }
            catch (e) {
                throw e; // TODO: ignore errors?
            }
        });
    };

    // Mark as self-accepted for Webpack
    // Update instances for Parcel
    sourceModule.hot.accept(updateInstances);

    // Webpack way
    if (sourceModule.hot.addStatusHandler) {
        if (sourceModule.hot.status() === 'idle') {
            sourceModule.hot.addStatusHandler((status) => {
                if (status === 'apply') {
                    updateInstances();
                }
            });
        }
    }
}

export function createInjectorFactory(onModuleUpdate, {
    componentPrefix = 'hotInject',
    hasInstance = hasInstanceDefault,
    createHotModule = createHotModuleDefault,
    createHotModuleInstance = createHotModuleInstanceDefualt,
} = {}) {
    const hotModules = {};

    const getHotModule = (moduleId) => {
        if (!hotModules[moduleId]) {
            hotModules[moduleId] = createHotModule();
        }

        return hotModules[moduleId];
    };

    return function createInjector(sourceModule, ...args) {
        if (!sourceModule || !sourceModule.id) {
            // this is fatal
            throw new Error(
                `\`${componentPrefix}\` could not find the \`id\` property in the \`module\` you have provided`,
            );
        }

        const moduleId = sourceModule.id;
        const hotModule = getHotModule(moduleId);
        makeHotExport(getHotModule, sourceModule, onModuleUpdate, args);

        return (key, moduleExport) => (WrappedComponent) => {
            return createHoc(
                componentPrefix,
                WrappedComponent,
                class ExportedComponent extends React.Component {

                    static contextTypes = {
                        store: PropTypes.object.isRequired,
                    };

                    UNSAFE_componentWillMount() {
                        const store = this.context.store;

                        // Skip if already loaded.
                        if (hasInstance(hotModule.instances, { key, store })) {
                            return;
                        }

                        hotModule.instances.push(createHotModuleInstance({
                            store,
                            key,
                        }));

                        onModuleUpdate(hotModule, moduleExport, ...args);
                    }

                    render() {
                        return (
                            <WrappedComponent {...this.props} />
                        );
                    }
                },
            );
        };
    };
}
