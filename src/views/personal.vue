<template>
    <div class="crm-wrapper">
        <!--面包屑 end-->
        <div class="bread-crumbs">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <t-breadcrumb separator=">">
                        <t-breadcrumb-item href="/">{{$t('frame.mySettings')}}</t-breadcrumb-item>
                        <t-breadcrumb-item>{{$t('frame.personalTitle')}}</t-breadcrumb-item>
                    </t-breadcrumb>
                </div>
            </div>
        </div>
        <!--面包屑 end-->
        <div class="enquiries" style="padding: 15px 15px 0px 15px">
            <!-- 标题 star-->
            <div class="enquiries-title">
                <span></span>{{$t('frame.personalTitle')}}
            </div>
            <!-- 标题 end-->
            <!--form表单 stat-->
            <t-form :rules="ruleFormLabel"  label-position="right" :label-span="4" ref="formRight" :model="formRight" class="mt-20">
            <!--<div class="enquiries-form">-->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.firstName')" class="mb-20" prop="firstName" label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.firstName"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.lastName')" class="mb-20" prop="lastName"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.lastName"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.alias')" class="mb-20" prop="alias"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.alias"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.email')" class="mb-20" prop="email"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.email"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.staffNO')" class="mb-20" prop="staffNO"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.staffNO"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.nickname')" class="mb-20" prop="nickname"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.nickname"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.phone')" class="mb-20" prop="phone"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.phone"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.mobile')" class="mb-20" prop="mobile"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.mobile"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.fax')" class="mb-20" prop="fax"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.fax"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.department')" class="mb-20" prop="department"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.department"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                </div>
                <!--选择框币种-->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.currency')" class="mb-20" prop="currency"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-select v-model="formRight.currency" clearable>
                                        <t-option :value="option.value" v-for="option in currencyList" :key="option.value">
                                            {{option.label}}
                                        </t-option>
                                    </t-select>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.countryRegion')" class="mb-20" prop="countryRegion"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.countryRegion"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.stateProvince')" class="mb-20" prop="stateProvince"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.stateProvince"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.city')" class="mb-20" prop="city"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.city"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.postCode')" class="mb-20" prop="postCode"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.postCode"></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                </div>
                <!--街道/地址-->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <t-form-item :label="$t('frame.streetAddress')" class="mb-20" prop="streetAddress"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  type="textarea" v-model="formRight.streetAddress"  :autosize="{minRows: 3,maxRows: 3}" ></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
                </div>
                <!--取消、提交按钮-->
                <div class="bottom-button">
                    <t-button type="outline-primary" class="mr-20" @click="cancel()">{{$t('frame.cancel')}}</t-button>
                    <t-button type="primary" @click="save('formRight')">{{$t('frame.submit')}}</t-button>
                </div>
            <!--</div>-->
            </t-form>
        </div>

        <!-- 弹框 -->
        <div class="warning-modal" v-show="msgModalObj.isShow">
            <div class="warning-modal-backdrop"></div>
            <div class="warning-modal">
                <div class="warning-modal-dialog warning-tips">
                    <div class="warning-modal-content">
                        <div class="warning-icon" style="padding-top: 15px">
                            <i :class="msgModalObj.msgIcon"></i>
                        </div>
                        <div class="waring-cnt">
                            <p style="padding: 15px"><span>{{msgModalObj.msg}}</span></p>
                        </div>
                        <div v-if="msgModalObj.isShowCancle" class="waring-btn">
                            <span class="yes col-6" style="background-color: #999; border-bottom-right-radius: 0" @click="msgModalObj.handleClose">{{$t('promotion.cancel')}}</span>
                            <span class="yes col-6" @click="msgModalObj.handleOk">{{$t('promotion.ok')}}</span>
                        </div>
                        <div v-else class="waring-btn">
                            <span class="yes" @click="msgModalObj.handleOk">{{$t('promotion.ok')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹框 -->
        <t-modal v-model="modal">
            <p>{{modalMessage}}</p>
        </t-modal>


    </div>
</template>

<script>
  import Storage from '../../src/views/localstorage.js'

  let storage = new Storage();

  export default {
    name: 'personal',
    data(){
      return {
        formRight: {
          firstName: '',
          lastName: '',
          alias: '',
          email: '',
          staffNO: '',
          nickname: '',
          phone: '',
          mobile: '',
          fax: '',
          department: '',
          currency: '',
          countryRegion: '',
          stateProvince: '',
          city: '',
          postCode: '',
          streetAddress: ''
        },
        currencyList:[
          {
            label:this.$t("frame.HKD"),
            value:'HKD'
          },
          {
            label:this.$t("frame.USD"),
            value:'USD'
          },
          {
            label:this.$t("frame.EUR"),
            value:'EUR'
          },
          {
            label:this.$t("frame.SGD"),
            value:'SGD'
          },
          {
            label:this.$t("frame.GBP"),
            value:'GBP'
          },
          {
            label:this.$t("frame.CNY"),
            value:'CNY'
          },
        ],
        ruleFormLabel: {
          lastName: [
            {required: true, message: this.$t('frame.inputNull'), trigger: 'blur'}
          ],
          alias: [
            {required: true, message: this.$t('frame.inputNull'), trigger: 'blur'}
          ],
          email: [
            {required: true, message: this.$t('frame.inputNull'), trigger: 'blur'}
          ],
          currency: [
            {required: true, message: this.$t('frame.inputNull'), trigger: 'blur'}
          ]
        },
        modalMessage:"",
        //自定义模态框
        msgModalObj: {
          isShow: false,
          msgIcon: '',
          isShowCancle: false,
          msg: '',
          handleClose: () => {
            this.isShow = true
          },
          handleOk: () => {
          },
        },
      }
    },
    methods: {
      /**
       * 初始化
       */
      init(){
        console.log('personal init')
        let that = this;
        this.$nextTick(() => {
          console.log(that)
          console.log(that.$parent.authorization)
          if (that.$parent.authorization != undefined && that.$parent.authorization.personalInfoInit != undefined) {
            that.$parent.instance.post(that.$parent.authorization.personalInfoInit).then(function (ret) {
              console.log("=======" + ret.data.result)
              that.email = ret.data.result.EMAIL;
              that.firstName = ret.data.result.First_Name;
              that.lastName = ret.data.result.Last_Name;
            })
          }
        })
      },
      /**
       * 保存提交
       */
      save(name) {
        let that = this
        this.$refs[ 'formRight' ].validate((valid) => {
          if (valid) {
            this.$crm.post(services.personal.PERSONAL_UPDATA+'?language='+that.formRight.aid_language, {
              "operFlag":'C',
              "businessHallVO": this.formRight,
            }).then(ret => {
              // console.log(JSON.stringify(ret.data))
              if (ret != null && ret.data.success) {
                that.messageModal( false, that.$t('message.save_success'),
                  function () {
                    that.$router.push({ name:'personal'});
                  });
              } else {
                that.modal = true,
                  that.modalMessage = ret.data.resultMessage;
              }
            })
            // }else{
            //   let formItem = this.formItem
            //   // formItem.language = this.formItem.language
            //   this.$crm.put(services.agent.AGENT_SAVE+'?language='+that.formItem.aid_language, {
            //     "operFlag":'U',
            //     "businessHallVO": formItem,
            //   }).then(ret => {
            //     // console.log(JSON.stringify(ret.data))
            //     if (ret != null && ret.data.success) {
            //       that.messageModal(true, 'aid aid-check-circle-outline', false, that.$t('cmi.agent.message.modify_success'),
            //         function () {
            //           that.$router.push({ name:'cmi-agent-management'});
            //         });
            //     } else {
            //       that.modal = true,
            //         that.modalMessage = ret.data.resultMessage;
            //     }
            //   })
            // }
          }
        })
      },
      /**
       * 取消
       */
      cancel(){
        this.$router.push({name: 'personal'});
      },
    },
    mounted(){
      /**
       * 等待首次加载生效
       */
      setTimeout(() => {
        this.init();
      }, 300)

    }
  }
</script>

<!--<style lang="scss" scoped>-->
    <!--@import './notice.scss'-->
<!--</style>-->