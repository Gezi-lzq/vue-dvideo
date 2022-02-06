// 该文件用于创建Vuex中最核心的store
import Vue from "vue";
// 引入Vuex
import Vuex from "vuex";
// 应用Vuex插件
Vue.use(Vuex);

import Identicon from 'identicon.js';

import actions from "./actions";
import mutations from "./mutations";


// 准备state--用于储存数据
const state = {
  account: "0x0000000000000",
  dvideo: null,
  videos: [],
  videosCount: 0,
  currentHash: null,
  currentTitle: null,
  loading: false,
};

//准备getters——用于将state中的数据进行加工
const getters = {
    // 根据账号地址生成默认头像
	avatar(state){
		let id = new Identicon(state.account, 30).toString()
        return "data:image/png;base64," + id
	}
}

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
});
