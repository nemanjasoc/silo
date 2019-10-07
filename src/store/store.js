import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import feed from './modules/feed';
import customer from './modules/customer';
import silos from './modules/silos';
import installer from './modules/installer';
import tableUsers from './modules/tableUsers';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        users: [
            {
                first_name: 'Michael',
                last_name: 'Smith',
                username: 'michael.smith',
                password: 'feeder1',
                role: 'feeder'
            },
            {
                first_name: 'James',
                last_name: 'Johnson',
                username: 'james.johnson',
                password: 'feeder2',
                role: 'feeder'
            },
            {
                first_name: 'John',
                last_name: 'Williams',
                username: 'john.williams',
                password: 'feeder3',
                role: 'feeder'
            },
            {
                first_name: 'David',
                last_name: 'Jones',
                username: 'david.jones',
                password: 'feeder4',
                role: 'feeder'
            },
            {
                first_name: 'Robert',
                last_name: 'Brown',
                username: 'robert.brown',
                password: 'feeder5',
                role: 'feeder'
            },
            {
                first_name: 'William',
                last_name: 'Davis',
                username: 'william.davids',
                password: 'customer1',
                role: 'customer'
            },
            {
                first_name: 'Richard',
                last_name: 'Miller',
                username: 'richard.miller',
                password: 'customer2',
                role: 'customer'
            },
            {
                first_name: 'Mark',
                last_name: 'Wilson',
                username: 'mark.wilson',
                password: 'installer1',
                role: 'installer'
            }
        ],
        loggedInUser: null
    },
    mutations: {
        setLoggedInUser: function (state, payload) {
            state.loggedInUser = payload;
        },
        resetLoggedInUser: function (state) {
            state.loggedInUser = null;
        }
    },
    modules: {
        feed,
        customer,
        silos,
        installer,
        tableUsers
    }
});

