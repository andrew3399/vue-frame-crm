<template>
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
    <div class="enquiries mt-10" style="padding:0px 0px 20px 0px;">
        <div class="notice-list-wrap">
            <div class="n-l-title">
                <span>巡查公告</span>
                <i class="tips-top">置顶</i>
            </div>
            <div class="n-l-content">
                <p class="text-left n-l-nr">根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月……</p>
                <p class="text-left n-l-time">党委第二次巡视组 <em>08-12 14:09:09</em></p>
            </div>
        </div>
        <div class="notice-list-wrap">
            <div class="n-l-title">
                <span class="text-emr">双节促销 </span>
                <i class="tips-emr">紧急</i>
            </div>
            <div class="n-l-content">
                <p class="text-left  n-l-nr text-emr">根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月根据集团党委的统一部署，集团公司党委第二次巡视组于2017年11月……</p>
                <p class="text-left n-l-time">党委第二次巡视组 <em>08-12 14:09:09</em></p>
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