<style>
    .res-selectTable .cmi-tab .table__header table th:first-child{
        text-indent: 0px !important;
    }
    .res-selectTable .table__row td:first-child{
        text-indent: 0px !important;
    }
    .table-aa.cmi-tab .table__cell{display: grid !important;}
</style>
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
        <div class="row">
            <div class="col-6">
                <div class="enquiries notice-state-wrap">
                    <!-- 标题 star-->
                    <div class="enquiries-title">
                        <span></span>{{$t('handle_local.handle.unHandle')}}
                    </div>
                    <!-- 标题 end-->
                    <div class="notice-manage-wrap" v-for="item in handleItems">
                        <!-- <div class="row notice-state-content">
                            <div class="col-12 row mb8">
                                <div class="col-6 text-left">已办流程标题</div>
                                <div class="col-6 text-right"> 2018-05-14</div>
                            </div>
                            <div class="col-12 row mb8">
                                <div class="col-6 text-left">已办流程标题</div>
                                <div class="col-6 text-right"> 2018-05-14</div>
                            </div>
                        </div> -->

                        <div class="notice-manage-content" @click="jumpToApproval(item.formUrl)">
                            <div class="text-left content-title">
                                <span>{{item.label}}</span>
                            </div>
                            <div class="text-right content-time">{{item.workflowCreateDate}}</div>
                        </div>
                    </div>
                    <div class="d-flex flex-row-reverse mt-10">
                        <t-button @click="jumpToUnHandle">more</t-button>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="enquiries notice-state-wrap">
                    <!-- 标题 star-->
                    <div class="enquiries-title">
                        <span></span>{{$t('handle_local.handle.handle')}}
                    </div>
                    <!-- 标题 end-->
                    <div class="notice-manage-wrap" v-for="item in unHandleItems">
                        <!-- <div class="row notice-state-content">
                            <div class="col-12 row mb8">
                                <div class="col-6 text-left">已办流程标题</div>
                                <div class="col-6 text-right"> 2018-05-14</div>
                            </div>
                            <div class="col-12 row mb8">
                                <div class="col-6 text-left">已办流程标题</div>
                                <div class="col-6 text-right"> 2018-05-14</div>
                            </div>
                        </div> -->

                        <div class="notice-manage-content" @click="jumpToApproval(item.formUrl)">
                            <div class="text-left content-title">
                                <span>{{item.label}}</span>
                            </div>
                            <div class="text-right content-time">{{item.workflowCreateDate}}</div>
                        </div>

                    </div>
                    <div class="d-flex flex-row-reverse mt-10">
                        <t-button @click="jumpToHandle">more</t-button>
                    </div>
                </div>
            </div>
        </div>
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

        <slide-component @ievent="ievent('basicInfoDiv',basicInfoDiv)"  style="padding-top: 10px;"  :title="$t('my_task.myTasks')"></slide-component>

        <div class="enquiries mt-10" style="padding:0px 0px 15px 0px;"  v-show="basicInfoDiv">
            <!-- 标题 star-->
            <div class="notice-list-title" >
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                    </div>
                    <div  class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
                        <div class="d-flex justify-content-start">
                            <div  class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" style=" font-size: .875rem; padding: 1.3% 0 0 0;  font-weight: 400;text-align:right;color:#868e8f">
                                {{$t('my_task.taskListFilter')}}
                            </div>
                            <div  class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <t-select v-model="filterType"  @on-change="changeTaskListFilter">
                                    <t-option v-for="item in changeTaskListFilterList" :value="item.value" :key="item.value">
                                        {{lang.indexOf('zh')!=-1 ? (item.label_zh?item.label_zh:item.label):item.label}}
                                    </t-option>
                                </t-select>
                            </div>
                            <!--查询区域 star-->
                            <div class="manag-rt-btn">
                                <t-button type="primary" @click="handleJumpToAdd()">{{$t('my_task.newTask')}}</t-button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div  class="selectTable">
                <!-- 查询结果tab star-->
                <div class="enquiries-tab" class="res-selectTable">
                    <div class="cmi-tab mt-15 table-aa">
                        <t-table  border :columns="columns" :data="queryData" :all-ellipsis="true"></t-table>
                    </div>
                    <!--  分页 star-->
                    <div class="notice-pager mt-10" style="margin: 20px 0px 5px 0px !important;">
                        <t-pager :total="taskTotal" :page-size="taskPageSize"  @on-change="handleOnTaskPagerChange" @on-size-change="handleOnTaskPagerSizeChange" show-elevator show-sizer></t-pager>

                    </div>
                    <!-- 分页 star-->
                </div>
                <!-- 查询结果tab end-->
            </div>

        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    //引入常量配置
    import Storage from '../../src/views/localstorage.js'
    // 注册详情页面组件
    import slideComponent from './component/slide/slide.vue'

    let storage = new Storage();


    export default {
        data () {
            return {
              lang: storage.get("aid-language"),
              bulletinTitle:'',
              basicInfoDiv:true,
              initFlag:false,
              chooseDateType:'',
                total: 0,
              taskTotal:0,
                pageSize: 5,
              taskPageSize:5,
                sizerRange: [10, 15, 20, 50],
                pageNo: 1,
              taskPageNo:1,
                items: [],
                handleItems: [],
                unHandleItems: [],
                changeTaskListFilterList:[],
                queryData: [],
                filterType:'',
                fromItem:{
                    pageNum:1,
                    pageSize:5,
                    lang:'',
                    title:"",
                    applyOperId:"",
                    taskStaffId:"100000000",
                    applyTime:"",
                    queneId:"HAMWA",
                    stationId:"",
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
            }),
          columns() {
            return [
              {
                title: this.$t('my_task.dueDate'),
                key: 'workCloseTime',
                align: 'center',
                width: 130,
                render: (h, params) => {
                  return h('span', !params.row.workCloseTime ? '' : this.tranceDate(params.row.workCloseTime))
                }
              },
              {
                title: this.$t('my_task.status'),
                key: 'workStatusName',
                align: 'center',
                width: 90,
              },
              {
                title: this.$t('my_task.subject'),
                key: 'subject',
                width: 160,
                align: 'center',
              },
              {
                title: this.$t('my_task.name'),
                key: 'contactName',
                width: 160,
                align: 'center',
              },
            {
              title: this.$t('my_task.relatedTo'),
                key: 'relatedToName',
              width: 120,
              align: 'center',
            }, {
              title: this.$t('my_task.account'),
              key: 'relatedName',
                width: 180,
                align: 'center',
              },{
              title: this.$t('my_task.oper'),
              key: 'action',
                width: 240,
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                  return h('div', [
                    h('t-button', {
                      props: {
                        type: 'outline-primary',
                        size: 'sm'
                      },
                      style: {
                        marginRight: '5px',
                      },
                      on: {
                        click: () => {
                          this.show(params.row)
                        }
                      }
                    },  this.$t('my_task.detail')),
                    h('t-button', {
                      props: {
                        type: 'outline-primary',
                        size: 'sm'
                      },
                      style: {
                        marginRight: '5px',
                      },
                      on: {
                        click: () => {
                          this.modify(params.row)
                        }
                      }
                    }, this.$t('my_task.modify')),
                    h('t-button', {
                      props: {
                        type: 'outline-primary',
                        size: 'sm'
                      },
                      style: {
                        marginRight: '5px',
                      },
                      on: {
                        click: () => {
                          this.complete(params.row)
                        }
                      }
                    }, this.$t('my_task.complete')),
                  ])
                }
            },
            ]
          },
        },
      components: {
        slideComponent,
      },
        methods: {
          ievent(slideDiv,slideDivState) {
            switch (slideDiv) {
              case 'basicInfoDiv' :
                this.basicInfoDiv = !slideDivState
                break
            }
          },
            navToDetail (item) {
                const bulletinId = item.bulletinId
                this.$router.push({ name: 'notice', params: { bulletinId }})
                // this.$router.push({ path: `notice/${item.bulletinId}` })
                // this.$router.push({ path: '/notice', query: { bulletinId: item.bulletinId } })
            },
            tranceDate(code) {
                 return code.split(" ")[0]
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
          handleOnTaskPagerChange(item){
            this.taskPageNo = item
            this.queryMyTasks(this.filterType)
          },
            handleOnPagerSizeChange (item) {
                this.pageSize = item
                this.pageNo = 1
                this.getBulletinList()
            },
          handleOnTaskPagerSizeChange(item) {
            this.taskPageSize = item
            this.taskPageNo = 1
            this.queryMyTasks(this.filterType)
          },
          initTasklistFilter(){
              //初始化获取筛选器的值
            this.instance.get(this.authorization.initTasklistFilter, {}
            ).then(res => {
              this.changeTaskListFilterList  = res.data.result.tasklistFilterData;
              this.filterType ='101';
              this.queryMyTasks(this.filterType);
            }).catch(res => {
              this.$Message.warning(this.$t('frame.warning'))
            })
           },
          changeTaskListFilter(){
            if(this.initFlag){
              this.queryMyTasks(this.filterType);
            }
          },
         queryMyTasks(val){
           this.$nextTick(() => {
             this.instance.get(this.authorization.queryMyTasks, {
               params: {
                 lanager: this.lang,
                 pageNum: this.taskPageNo,
                 pageSize: this.taskPageSize,
                 queryType: val
               }
             }).then(res => {
               this.queryData = [];
               this.taskTotal = 0;
               if (res.data.success) {
                 this.queryData = res.data.result.result == null ? [] : res.data.result.result;
                 this.taskTotal = res.data.result.count;
               }
             }).catch(res => {
               this.$Message.warning(this.$t('frame.warning'))
             })
             this.initFlag = true;
           })
           },
          show(taskRow){
            window.open("/cust/detail-task?taskId="+taskRow.taskId +"&workId="+taskRow.workId,"_self");
          },
          modify(taskRow){
          //  this.$router.push({ name: 'newTask'})
            window.open("/cust/mod-task?oper=U&taskId="+taskRow.taskId +"&workId="+taskRow.workId,"_self");
          },
          complete(taskRow){
           window.open("/cust/mod-task?oper=U&completeFlag=1&taskId="+taskRow.taskId +"&workId="+taskRow.workId,"_self");
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
             getUnHandleList(){
                debugger
                let that = this
                this.instance.get(this.authorization.queryUnhandle, {
                    params: {
                            taskStaffId:that.fromItem.taskStaffId,
                            stationId:that.fromItem.stationId,
                            queneId:that.fromItem.queneId,
                            pageNum: that.fromItem.pageNum,
                            pageSize: that.fromItem.pageSize,
                            title:that.fromItem.title,
                            lang:that.fromItem.lang,
                            applyOperId:that.fromItem.applyOperId,
                            applyTime:that.fromItem.applyTime
                        }
                }).then(ret => {
                    // console.log(JSON.stringify(ret.data))


                    // that.total = ret.data.result.count
                    that.handleItems = ret.data.result.result
                    // that.fromItem.formKey = ret.data.result.result.extAttr.formKey


                    //if()

                }).catch(ret => {
                        this.$Message.warning(this.$t('frame.warning'))
                })
            },
            getHandleList(){
                 let that = this
                 debugger
                this.instance.get(this.authorization.queryHandle, {
                    params: {
                            taskStaffId:that.fromItem.taskStaffId,
                            stationId:that.fromItem.stationId,
                            queneId:that.fromItem.queneId,
                            pageNum: that.fromItem.pageNum,
                            pageSize: that.fromItem.pageSize,
                            title:that.fromItem.title,
                            lang:that.fromItem.lang,
                            applyOperId:that.fromItem.applyOperId,
                            applyTime:that.fromItem.applyTime
                        }
                }).then(ret => {
                    // console.log(JSON.stringify(ret.data))

                    debugger
                    // that.total = ret.data.result.count
                    that.unHandleItems = ret.data.result.result
                    // that.fromItem.formKey = ret.data.result.result.extAttr.formKey


                    //if()

                }).catch(ret => {
                        this.$Message.warning(this.$t('frame.warning'))
                })
            },
           handleChooseTask(){

          },
            handleChooseRole(bulletinTitle){
              this.$nextTick(() => {
                this.instance.get(this.authorization.bulletinListUri, {
                  params: {
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    bulletinTitle: this.bulletinTitle,
                  }
                }).then(res => {
                  let data = res.data
                  this.total = data.count
                  this.pageSize = data.pageSize
                  this.pageNo = data.pageNo
                  if (data.result && data.result.length) {
                    this.items = data.result.sort((a, b) => {
                      return parseInt(a.topFlag) - parseInt(b.topFlag)
                    })
                  }
                }).catch(res => {
                  this.$Message.warning(this.$t('frame.warning'))
                })
              })
            },
            jumpToApproval(formKey){
                // debugger
                // let jsonObject = JSON.parse(formKey);
                console.log(formKey);
                // console.log(jsonObject);
                // console.log(JSON.stringify(formKey))
                var formkey1 = formKey
                var url1 = "http://10.19.10.87:18080"
                var url = url1.concat(formkey1);
                console.log(url)
                window.open(url);
            },
            handleJumpToAdd(){
                //跳转到新增
              // this.$router.push({ name: 'newTask'})
              // console.log(url)
              window.open("/cust/new-task?oper=C&assign=home","_self");
            },
        },

        mounted () {
            /**
             * 等待首次加载生效
             */
            setTimeout(() => {
                this.getBulletinList()
                this.initTasklistFilter()
                this.getUnHandleList()
                this.getHandleList()
            }, 300)
        },
    }
</script>
<style lang="scss" scoped>
	@import './notice.scss';
</style>