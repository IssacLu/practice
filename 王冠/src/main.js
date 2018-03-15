// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import VueResource from 'vue-resource';
import iView from 'iview';
import Vuex from 'vuex';
import VueQuillEditor from 'vue-quill-editor';

import 'iview/dist/styles/iview.css';

import layout from './components/layout/layout';

Vue.use(VueResource);
Vue.use(iView);
Vue.use(Vuex);
Vue.use(VueQuillEditor);

let store = new Vuex.Store({
  state: {
    user: {},
    org: {},
    stustate: '',
    orgstate: ''
  },
  mutations: {
    orgsuccesslogin (state, payload) {
      state.org = payload.info;
      state.orgstate = payload.status;
    },
    stusuccesslogin (state, payload) {
      state.user = payload.info;
      state.stustate = payload.status;
    }
  }
});

var ticketRoot = 'https://ticket.twtstudio.com/api.php';
window.ticketRoot = ticketRoot;
Vue.config.debug = true;
Vue.http.options.root = ticketRoot;
Vue.http.options.emulateJSON = true;
Vue.http.options.credentials = true;

Vue.config.productionTip = false;

// var orgname = '';
// window.orgname = orgname;
// var orgpassword = '';
// window.orgpassword = orgpassword;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<layout/>',
  components: { layout }
});
