<template>
	<div class="notice__container">
		<div class="notice__title">{{title}}</div>
		<div class="notice__content">{{content}}</div>
		<p class="notice__tip">{{tip}}</p>
		<p class="notice__time">{{time}}</p>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				title: '',
				content: '',
				tip: '',
				time: ''
			}
		},
		methods: {

		}
	}
</script>
<style lang="scss">
	@import './notice.scss'
</style>