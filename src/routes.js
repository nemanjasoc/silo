import Login from './components/Login.vue';
import SelectionScreen from './components/SelectionScreen.vue';
import InstallerSelection from './components/InstallerSelection.vue';
import CustomerMobileScreen from './components/CustomerMobileScreen.vue';
import Silos from './components/tables/Silos.vue';
import Users from './components/tables/Users.vue';
import Feed from './components/tables/Feed.vue';
import Customer from './components/tables/Customer.vue';
import Installer from './components/tables/Installer.vue';
import store from './store/store';

export const routes = [
    { 
        path: '/login', 
        component: Login, 
        name: 'login',
        beforeEnter: function (to, from, next) {
            // If logged and logged in like a feeder or customer redirect to /selection-screen. If not logged in like a feeder or customer call next()
            if (store.state.loggedInUser && (store.state.loggedInUser.role != 'installer')) {
                next({ path: '/selection-screen' })
            }
            // If logged in and logged in like an installer redirect to /installer-selection. If not logged in like an installer call next()
            if (store.state.loggedInUser && store.state.loggedInUser.role == 'installer') {
                next({ path: '/installer-selection' })
            }

            next()
        }
    },
    { 
        path: '/selection-screen', 
        component: SelectionScreen, 
        name: 'selection-screen',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role == 'installer') {
                next({ path: '/installer-selection' })
            }

            next()
        } 
    },
    { 
        path: '/installer-selection', 
        component: InstallerSelection, 
        name: 'installer-selection',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role != 'installer') {
                next({ path: '/selection-screen' })
            }

            next()
        }  
    },
    { 
        path: '/multi-silo-screen', 
        component: Silos, 
        name: 'silos',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role == 'installer') {
                next({ path: '/installer-selection' })
            }
               
            next()
        }  
    },
    { 
        path: '/master-data-users', 
        component: Users, 
        name: 'users',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role == 'installer') {
                next({ path: '/installer-selection' })
            }
            if (store.state.loggedInUser.role == 'customer') {
                next({ path: '/selection-screen' })
            }

            next()
        }   
    },
    { 
        path: '/master-data-feed', 
        component: Feed, 
        name: 'feed',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role == 'installer') {
                next({ path: '/installer-selection' })
            }
            if (store.state.loggedInUser.role == 'customer') {
                next({ path: '/selection-screen' })
            }

            next()
        }   
    },
    { 
        path: '/master-data-customer', 
        component: Customer, 
        name: 'customer',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role == 'installer') {
                next({ path: '/installer-selection' })
            }
            if (store.state.loggedInUser.role == 'customer') {
                next({ path: '/selection-screen' })
            }

            next()
        }   
    },
    { 
        path: '/master-data-silo-installer', 
        component: Installer, 
        name: 'installer',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role != "installer") {
                next({ path: '/selection-screen' })
            }

            next()
        }   
    },
    { 
        path: '/customer-mobile-screen', 
        component: CustomerMobileScreen, 
        name: 'customer-mobile-screen',
        beforeEnter: function (to, from, next) {
            if (!store.state.loggedInUser) {
                next({ path: 'login' })
            }
            if (store.state.loggedInUser.role == 'installer') {
                next({ path: '/installer-selection' })
            }
            if (store.state.loggedInUser.role == 'feeder') {
                next({ path: '/selection-screen' })
            }

            next()
        }   
    },
    { 
        path: '*', 
        redirect: '/login' 
    }
];
