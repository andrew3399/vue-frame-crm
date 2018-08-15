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
                                    <t-input  v-model="formRight.department" disabled></t-input>
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
                                            {{formRight.lang.indexOf('zh')!=-1 ? (option.label_zh?option.label_zh:option.label):option.label}}
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
          lang:'',
          level:'',
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
        currencyList:[],
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
        let that = this;
        this.$nextTick(() => {
          this.aid_language = storage.get('aid-language');
          // console.log(that.$parent.authorization)
          if (that.$parent.authorization != undefined && that.$parent.authorization.personalInfoInit != undefined) {
            that.$parent.instance.post(that.$parent.authorization.getCurrency).then(function (ret) {
              that.currencyList = ret.data.result.courrencyLevel;
            })

            that.$parent.instance.post(that.$parent.authorization.personalInfoInit).then(function (ret) {
              that.formRight.firstName = ret.data.sysStaffVos.result[0].firstName;
              that.formRight.lastName = ret.data.sysStaffVos.result[0].lastName;
              that.formRight.email = ret.data.sysStaffVos.result[0].email;
              that.formRight.alias = ret.data.sysStaffVos.result[0].staffNameEn;
              that.formRight.staffNO = ret.data.sysStaffVos.result[0].staffNo;
              that.formRight.nickname = ret.data.sysStaffVos.result[0].staffName;
              that.formRight.phone = ret.data.sysStaffVos.result[0].officePhone;
              that.formRight.mobile = ret.data.sysStaffVos.result[0].contactTel;
              that.formRight.fax = ret.data.sysStaffVos.result[0].fax;
              that.formRight.department = ret.data.sysStaffVos.result[0].departName;
              that.formRight.countryRegion = ret.data.sysStaffVos.result[0].contactCountry;
              that.formRight.stateProvince = ret.data.sysStaffVos.result[0].contactProvince;
              that.formRight.city = ret.data.sysStaffVos.result[0].contactCity;
              that.formRight.postCode = ret.data.sysStaffVos.result[0].postcode;
              that.formRight.streetAddress = ret.data.sysStaffVos.result[0].address;
              that.formRight.currency = ret.data.sysStaffVos.result[0].currencyCode;


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
            that.$parent.$cmi.put(that.$parent.authorization.personalInfoUpdate, {
              "vo": this.formRight,
            }).then(ret => {
              console.log(JSON.stringify(ret.data)+"211212121222121")
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
      this.formRight.lang = storage.get('aid-language');
      /**
       * 等待首次加载生效
       */
      setTimeout(() => {
        this.init();
      }, 300)
    },
    /**
     * 自定义的通用信息提示框
     * @param isShow 是否显示提示框
     * @param msgIcon 提示图标
     * @param isShowCancle 是否显示取消按钮
     * @param msg 提示信息
     * @param handleOk 确定后回调函数
     */
    messageModal(isShow, msgIcon, isShowCancle, msg, handleOk) {
      this.msgModalObj = {
        isShow: isShow,
        msgIcon: msgIcon,
        isShowCancle: isShowCancle,
        msg: msg,
        handleClose: () => {
          this.msgModalObj.isShow = false
        },
        handleOk: handleOk
      }
    }

  }
</script>

<!--<style lang="scss" scoped>-->
    <!--@import './notice.scss'-->
<!--</style>-->