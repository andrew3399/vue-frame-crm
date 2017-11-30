<template>
	<!-- <div class="notice__container">
		<div class="notice__title">{{title}}</div>
		<div class="notice__content">{{content}}</div>
		<p class="notice__tip">{{tip}}</p>
		<p class="notice__time">{{time}}</p>
	</div> -->
<div class="crm-wrapper">
	<!--面包屑star-->
	<div class="bread-crumbs">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
				<t-breadcrumb separator=">">
					<t-breadcrumb-item href="/">账户管理</t-breadcrumb-item>
					<t-breadcrumb-item>公告列表</t-breadcrumb-item>
				</t-breadcrumb>
			</div>	
		</div>
	</div>	
    <!--面包屑 end-->
	<div class="enquiries mt-10">
		<p class="text-center">巡查公告</p>
		<p class="text-left text-in">	根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月按照党务公开原则和巡视工作条例有关规定，现将巡视整改情况予以公布。
	中国移动党组将以此次巡视整改为契机，</p>
		<p class="text-left text-in">认真贯彻全面从严之治党要求，把巡视整改与加强党的建设、推进反腐倡廉和深化企业改革结合起来，深入推进“战略转型、改革创新、反腐倡廉”战略落地，以实实在在的整改成效推动公司的持续健康发展，以高速快捷安全的数字服务助力经济社会建设，为中国特色社会主义事业作出更大的贡献。
	欢迎广大干部群众与巡视整改落实情况进行监督。如有意见建议，请及时向我们反映。
联系方式：123203089</p>
		<p class="text-right">中移党委第二巡视组</p>
		<p class="text-right">2017年10月18日</p>
    </div>
	<div class="enquiries mt-10">
		<!-- 标题 star-->
		<div class="enquiries-title">
			<span></span>相关附件
		</div>
		<div class="enquiries-form">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
					<div class="row">
	  					<div class="col-12 user-lst">
	  						<ul class="menu">
	  							<li class="lt">相关附件：</li>
	  							<li class="rt"><t-icon type="aid-menu aid-file-document"></t-icon>Thing.doc</li>
	  						</ul>
	  					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>	
</template>
<script>
	export default {
		data () {
			return {
				// title: '',
				// content: '',
				// tip: '',
				// time: ''
			}
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	@import './notice.scss'
</style>