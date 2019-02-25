<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<!-- <router-view></router-view> -->
	</div>

</template>

<script>
// import { test, testdemo } from './service/getData.js'
export default {
	data() {
		return {

		}
	},
	mounted() {
	},
	methods: {

	}
}
</script>
<style lang="scss">
// @import './style/px2rem.scss';
@import './style/common';
@import './style/font/iconfont.css';
.router-fade-enter-active,
.router-fade-leave-active {
	transition: opacity .1s;
}

.router-fade-enter,
.router-fade-leave-active {
	opacity: 0;
}
</style>
