import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";

import * as serviceWorker from './serviceWorker';


Vue.use(Vue2Editor);

serviceWorker.unregister();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
