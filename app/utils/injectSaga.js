import { createInjectorFactory } from './injectUtils';

function injectSaga(store, key, saga) {

    // checkKey(key);
    // checkDescriptor(newDescriptor);

    const existingSaga = store.injectedSagas[key];
    if (existingSaga) {
        if (existingSaga.saga === saga) {
            return;
        }

        existingSaga.task.cancel();
    }

    store.injectedSagas[key] = {
        saga,
        task: store.runSaga(saga),
    };
}

function onModuleUpdate(hotModule, saga, options) {
    for (const { key, store } of hotModule.instances) {
        injectSaga(store, key, saga, options);
    }
}

const createSagaInjector = createInjectorFactory(onModuleUpdate, {
    componentPrefix: 'injectSaga',
});

export default function(sourceModule) {
    return createSagaInjector(sourceModule);
};
