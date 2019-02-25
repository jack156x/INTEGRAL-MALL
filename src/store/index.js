import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
import actions from './action'
Vue.use(Vuex)
const state = {
	showChose : false,
	Province : null
}
const mutations = {
	change(){
		state.showChose = !state.showChose
	},
	changefalse(){
		state.showChose = false
	}
}
export default new Vuex.Store({
	state,
	actions,
	mutations,
})