<template>
    <div class="crm-wrapper">
        <!-- 面包屑start -->
        <!-- <div class="bread-crumbs mt-10">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <t-breadcrumb separator=">"> -->
                        <!--<t-breadcrumb-item href="/">{{$t('notice_local.notice.title')}}-->
                        <!--</t-breadcrumb-item>-->
                        <!-- <t-breadcrumb-item href="/">{{$t('notice_local.notice.sub_title')}}</t-breadcrumb-item>
                        <t-breadcrumb-item>{{$t('notice_local.notice.main_title')}}</t-breadcrumb-item>
                    </t-breadcrumb>
                </div>
            </div>
        </div> -->
        <!-- 面包屑end -->
        <div class="enquiries mt-10" style="padding:0px 0px 15px 0px;">
            <!-- 标题 star-->
            <div class="notice-list-title" >
                <div class="d-flex justify-content-between">
                    <div>
                        <span class="span"></span>{{$t('notice_local.notice.list_title')}}
                    </div>
                    <div>
                        <t-input  icon="magnify" icon-placement="right" @click.native="handleChooseRole" v-model="bulletinTitle"></t-input>
                    </div>
                </div>
            </div>
            <div class="notice-manage-wrap"  v-if="total!=0" v-for="item in items" @click="navToDetail(item)">
                <div class="notice-manage-content">
                    <div class="text-left content-title">
                        <t-tag state='warning' v-if="parseInt(item.topFlag) === 1">{{$t('notice_local.notice.list_tag_top')}}</t-tag>
                        <t-tag state='success'v-if="parseInt(item.bulletinLevel) === 3">{{$t('notice_local.notice.list_tag_emergency')}}</t-tag>
                        <t-tag state='info'v-if="parseInt(item.bulletinLevel) === 2">{{$t('notice_local.notice.list_tag_important')}}</t-tag>
                        <span>{{item.bulletinTitle}}</span>
                    </div>
                    <!-- <div v-html="item.bulletinContent"></div> -->
                    <div class="text-right content-time">{{item.createTimeString}}</div>
                </div>
            </div>
            <div class="notice-pager mt-10" style="margin: 20px 0px 5px 0px !important;">
                <t-pager :total="total" :page-size="pageSize" :sizer-range="sizerRange" @on-change="handleOnPagerChange" @on-size-change="handleOnPagerSizeChange" show-elevator show-sizer></t-pager>
            </div>
        </div>

    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data () {
            return {
                bulletinTitle:'',
                total: 0,
                pageSize: 5,
                sizerRange: [10, 15, 20, 50],
                pageNo: 1,
                items: [],
                handleItems: [],
                unHandleItems: [],
                fromItem:{
                    pageNum:1,
                    pageSize:5,
                    lang:'',
                    title:"",
                    applyStaffId:"",
                    taskStaffId:"100000000",
                    applyTime:"",
                    queneId:"HAMWA",
                    stationId:"23232",
                    formKey:"",            
                 }
            }
        },
        filters: {
            format: function (param) {
                if (!param || param < 0) return ''
                let crt = new Date(param)
                function Format (format) {
                    let fmt = format
                    if (!fmt) fmt = 'yyyy/MM/dd HH:mm:ss'
                    let o = {
                        "M+": crt.getMonth() + 1, //月份
                        "d+": crt.getDate(), //日
                        "h+": crt.getHours(), //小时
                        "m+": crt.getMinutes(), //分
                        "s+": crt.getSeconds(), //秒
                        "q+": Math.floor((crt.getMonth() + 3) / 3), //季度
                        "S": crt.getMilliseconds() //毫秒
                    };
                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (crt.getFullYear() + "").substr(4 - RegExp.$1.length))
                    for (let k in o)
                        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                    return fmt
                }

                return Format('yyyy/MM/dd hh:mm:ss')
            }
        },
        computed: {
            ...mapState({
                instance: state => state.storeModule.instance,
                authorization: state => state.storeModule.authorization
            })
        },
        methods: {
            navToDetail (item) {
                const bulletinId = item.bulletinId
                this.$router.push({ name: 'notice', params: { bulletinId }})
                // this.$router.push({ path: `notice/${item.bulletinId}` })
                // this.$router.push({ path: '/notice', query: { bulletinId: item.bulletinId } })
            },
            jumpToUnHandle(){
                this.$router.push({ name: 'unHandle'})
            },
            jumpToHandle(){
                this.$router.push({ name: 'handle'})
            },
            handleOnPagerChange (item) {
                this.pageNo = item
                this.getBulletinList()
            },
            handleOnPagerSizeChange (item) {
                this.pageSize = item
                this.pageNo = 1
                this.getBulletinList()
            },
            getBulletinList (params) {
                this.$nextTick(() => {
                    this.instance.get(this.authorization.bulletinListUri, {
                        params: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize
                        }
                    }).then(res => {
                        let data = res.data
                        this.total = data.count
                        this.pageSize = data.pageSize
                        this.pageNo = data.pageNo
                        this.items = data.result
                     /*   if (data.result && data.result.length) {
                            this.items = data.result.sort((a,b) => {
                                return parseInt(a.topFlag) - parseInt(b.topFlag)
                            })
                        }*/
                    }).catch(res => {
                        this.$Message.warning(this.$t('frame.warning'))
                    })
                })
            },
            handleChooseRole(bulletinTitle){
                this.$nextTick(() => {
                    this.instance.get(this.authorization.bulletinListUri, {
                        params: {
                            pageNo: this.pageNo,
                            pageSize: this.pageSize,
                            bulletinTitle:this.bulletinTitle,
                        }
                    }).then(res => {
                        let data = res.data
                        this.total = data.count
                        this.pageSize = data.pageSize
                        this.pageNo = data.pageNo
                        if (data.result && data.result.length) {
                            this.items = data.result.sort((a,b) => {
                                return parseInt(a.topFlag) - parseInt(b.topFlag)
                            })
                        }
                    }).catch(res => {
                        this.$Message.warning(this.$t('frame.warning'))
                    })
                })
            },
            jumpToApproval(formKey){
                // console.log(JSON.stringify(formKey))
                var formkey1 = formKey
                var url1 = "http://10.19.10.87:18080"
                var url = url1.concat(formkey1);
                // console.log(url)
                window.open(url);
            }
        },
        mounted () {
            /**
             * 等待首次加载生效
             */
            setTimeout(() => {
                this.getBulletinList()
            }, 300)
        }
    }
</script>
<style lang="scss" scoped>
	@import './notice.scss'
</style>