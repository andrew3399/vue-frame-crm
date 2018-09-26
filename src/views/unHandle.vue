<template>
    <div class="crm-wrapper">
        <!-- 查询部分 -->
        <div class="enquiries mt-10">
            <!-- 标题 star-->
            <div class="enquiries-title">
                <span></span>
            </div>
            <div class="enquiries-form">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <!-- 第一列 -->
                        <div class="row">
                            <!-- <div class="col-12">
                                <div class="row mb-20">
                                    <div class="col-6 text-right lh-40">
                                        {{$t('handle_local.handle.order_title')}}
                                    </div>
                                    <div class="col-6">
                                        <t-input v-model="fromItem.label"></t-input>
                                    </div>
                                </div>
                            </div> -->
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-6 text-right lh-40">
                                        {{$t('handle_local.handle.applicant')}}
                                    </div>
                                    <div class="col-6">
                                        <t-input v-model="fromItem.applyOperId"></t-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                        <!-- 第二列 -->
                        <div class="row">
                            <div class="col-12">
                                <div class="row mb-20">
                                    <div class="col-6 text-right lh-40">
                                        {{$t('handle_local.handle.application_date')}}
                                    </div>
                                    <div class="col-6">
                                        <t-date-picker v-model="fromItem.applyTime"  style="width:100%;"></t-date-picker>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 text-center" style="align-self: flex-end;">
                        <t-button type="primary" class="w_100" @click="query(1)">{{$t('handle_local.handle.query_btn')}}</t-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 查询部分 -->
        <!-- 表格 -->
        <div class="enquiries mt-10" style="padding:20px 20px 0px 20px;">
            <!-- 表格中的标题及按钮 -->
            <!-- <div class="query-creat-btn d-flex justify-content-between">
                <div>
                    <div class="enquiries-label">
                        <span></span>我是标题
                    </div>
                </div>
                <div>
                    <t-button type="outline-primary" >右上角按钮</t-button>
                </div>
            </div> -->
            <!-- 表格中的标题及按钮 -->
            <!-- 表格部分 -->
            <div class="enquiries-tab">
                <div class="cmi-tab">
                    <t-table line :columns="columns" :data="queryData"></t-table>
                </div>
                <!-- 分页 -->
                <div class="cmi-pager mt-15">
                    <t-pager :total="total" :page-size="pageSize" :show-elevator="true" size="sm"
                             :current="pageNum"
                             @on-change="changePage"></t-pager>
                </div>
                <!-- 分页 -->
            </div>
            <!-- 表格部分 -->
        </div>
        <!-- 表格 -->
    </div>
</template>
<script>
  // import authorization from './authorization.js'
  import Storage from '../utils/localstorage.js'
  import { mapState } from 'vuex'
  let storage = new Storage()
  export default{
    data() {
      return {
        aid_language:'',
        total:0,
        pageSize:5,
        queryData: [],
        fromItem:{
          pageNum:1,
          pageSize:5,
          lang:'',
          title:"",
          applyOperId:"",
          taskStaffId:"100000000",
          applyTime:"",
          queneId:"HAMWA",
          stationId:"23232",
          formKey:"",
        }
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
            title: this.$t('handle_local.handle.application_form_title'),
            key: 'title',
          },
          {
            title: this.$t('handle_local.handle.applicant_name'),
            key: 'applyOperId',
          },
          {
            title: this.$t('handle_local.handle.application_date'),
            key: 'workflowCreateDate',
          },
          {
            title: this.$t('handle_local.handle.operation'),
            key: 'action',
            width: '230',
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
                      this.showDetail(params.row);
                      // //                                            this.$router.push({path:'cmi-warehouse-detail/' + params.row.storageId});
                    }
                  }
                }, '待办')
              ])
            }
          },
        ]

      },
    },
    mounted() {
      /**
       * 获取语言
       */
      this.fromItem.lang = storage.get('aid-language');
    },
    methods: {
      query(num) {
        let that = this
        that.queryData = []
        that.fromItem.pageNum = num == null ? 1 : num;
        that.fromItem.pageSize = 5
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

          that.queryData = ret.data.result.result

          that.total = ret.data.result.count
          // that.fromItem.formKey = ret.data.result.result.extAttr.formKey


          //if()

        }).catch(ret => {
          this.$Message.warning(this.$t('frame.warning'))
        })

      },
      showDetail(agent){
        var formkey1 = agent.formUrl
        var url1 = window.location.host.trim()
        console.log(url1)
        var url = url1.concat(formkey1);
        window.open(url);
      },
      changePage(pageNum){
        let that = this
        that.queryData = []
        that.query(pageNum)
      }
    }
  }
</script>


