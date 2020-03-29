import Vue from 'vue';

import AuthCallback from './AuthCallback.vue';

Vue.config.productionTip = false;

const node = document.getElementById('callback');

if (node) {
  new Vue({
    render: (h) => h(AuthCallback)
  }).$mount(node);
}
