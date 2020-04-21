import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)  //在vue中使用Vuex

import axios from './../api/a';

const store = new Vuex.Store({
    state: {
        count: 1,
        mutation_a:10,
    },
    mutations: {
        increment(state, b) {
            // 变更状态
            state.count+= b.A;
        },
        mutation(state, data){
            state.mutation_a += data;
        }
    },
    actions: {
        increment(context) {
            axios.data((a) => {
                context.commit('increment',{A:a});
            })
        }
    }
});

export default store;