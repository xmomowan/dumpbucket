import Vue from 'vue';
import Vuex from 'vuex';

import config from '@config';

const state = {

    dumpbucket: {
        saveToLocal: false,
        content: '',
    },
};

const mutations = {

    TOGGLE_SAVE_TO_LOCAL: (state: any) => {

        state.dumpbucket.saveToLocal = !state.dumpbucket.saveToLocal;
    },

    MUTATE_SAVE_TO_LOCAL: (state: any, payload: boolean) => {

        state.dumpbucket.saveToLocal = payload;
    },

    MUTATE_CONTENT: (state: any, payload: string) => {

        state.dumpbucket.content = payload;
    },
};

const getters = {

    dumpbucket_getSaveToLocal: (state: any) => state.dumpbucket.saveToLocal,
    dumpbucket_getContent: (state: any) => state.dumpbucket.content,
};

const actions = {

    toggleSaveToLocal: (context: any) => {

        context.commit('TOGGLE_SAVE_TO_LOCAL');
    },

    dumpbucket_setSaveToLocal: (context: any, payload: boolean) => {

        context.commit('MUTATE_SAVE_TO_LOCAL', payload);

        if (!payload) {

            context.dispatch('dumpbucket_deleteContentFromStorage');
        }
    },

    dumpbucket_setContent: (context: any, payload: string) => {

        context.commit('MUTATE_CONTENT', payload);
    },

    // clear content and localstorage
    dumpbucket_dump: (context: any) => {

        context.commit('MUTATE_CONTENT', '');
        context.dispatch('dumpbucket_deleteContentFromStorage');
    },

    // save content to localstorage
    dumpbucket_persist: (context: any) => {
        localStorage.setItem(config.localStorage.contentKey, 
                             context.state.dumpbucket.content);
    },

    // save content to localstorage but check the flag before that
    dumpbucket_persist_checked: (context: any) => {
        if (context.state.dumpbucket.saveToLocal) {
            localStorage.setItem(config.localStorage.contentKey, 
                                 context.state.dumpbucket.content);
        }
    },

    // load localstorage to store
    // if content is not undefined we set savetolocal to true
    // since that's the only way to save anything
    dumpbucket_load: (context: any) => {
        const content = localStorage.getItem(config.localStorage.contentKey);

        if (content === 'undefined' || content === null || content === '') {

            context.dispatch('dumpbucket_setContent', '');
        } else {

            context.dispatch('dumpbucket_setContent', content);
            context.dispatch('dumpbucket_setSaveToLocal', true);
        }
    },

    dumpbucket_deleteContentFromStorage: () => {

        localStorage.removeItem(config.localStorage.contentKey);
    },
};

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});
