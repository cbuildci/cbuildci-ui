import { createInjectorFactory } from './injectUtils';

function injectReducer(store, key, reducer) {
    // Skip if already set.
    if (store.injectedReducers[key] === reducer) {
        return;
    }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(
        store.createReducer(store.injectedReducers),
    );
}

function onModuleUpdate(hotModule, reducer) {
    for (const { key, store } of hotModule.instances) {
        injectReducer(store, key, reducer);
    }
}

const createSagaInjector = createInjectorFactory(onModuleUpdate, {
    componentPrefix: 'injectReducer',
});

export default function(sourceModule) {
    return createSagaInjector(sourceModule);
};
