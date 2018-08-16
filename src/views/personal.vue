<template>
    <div class="crm-wrapper">
        <!--面包屑 end-->
        <div class="bread-crumbs">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <t-breadcrumb separator=">">
                        <t-breadcrumb-item href="/">{{$t('frame.home')}}</t-breadcrumb-item>
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

                </div>
                <!--选择框币种-->
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <t-form-item :label="$t('frame.department')" class="mb-20" prop="department"  label-span="220px">
                            <div class="row">
                                <div class="col-8 pr-0">
                                    <t-input  v-model="formRight.department" disabled></t-input>
                                </div>
                            </div>
                        </t-form-item>
                    </div>
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
                                    <t-input :maxlength='500'  type="textarea" v-model="formRight.streetAddress"  :autosize="{minRows: 3,maxRows: 3}" ></t-input>
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

        <!--弹框一个按钮-->
        <div class="warning-modal" v-show="oneModal">
            <div class="warning-modal-backdrop"></div>
            <div class="warning-modal">
                <div class="warning-modal-dialog warning-tips">
                    <div class="warning-modal-content">
                        <div class="d-flex justify-content-between">
                            <div></div>

                        </div>
                        <div class="warning-icon">
                            <i v-show="!flag" class="aid aid-alert-circle-outline"></i>
                            <i v-show="flag" class="aid aid-check-circle"></i>
                        </div>
                        <div class="waring-cnt">
                            <p><span>{{modalMessage}}</span></p>
                        </div>
                        <div class="waring-btn" @click="handleOk">
                            <span class="yes" style="border-bottom-left-radius: 4px;">{{$t('frame.btn_yes')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--弹框一个按钮-->
        <!--弹框两个按钮-->
        <div class="warning-modal" v-show="twoModal">
            <div class="warning-modal-backdrop"></div>
            <div class="warning-modal">
                <div class="warning-modal-dialog warning-tips">
                    <div class="warning-modal-content">
                        <div class="d-flex justify-content-between">
                            <div></div>
                            <!-- <div @click="handleClose">
                                <i class="aid aid-close warning-modal-close"></i>
                            </div> -->
                        </div>
                        <div class="warning-icon">
                            <i class="aid aid-help-circle"></i>
                        </div>
                        <div class="waring-cnt" style="padding-bottom: 20px">
                            <p><span>{{modalMessage}}</span></p>
                        </div>
                        <div class="waring-btn reject-btn">
                            <span class="no" @click="handleClose()" >{{$t('promotion.cancel')}}</span>
                            <span class="yes" @click="subAddPrice()" >{{$t('promotion.ok')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
  import Storage from '../../src/views/localstorage.js'

  let storage = new Storage();

  export default {
    name: 'personal',
    data(){
      return {
        flag:false,
        oneModal:false,
        twoModal:false,
        modalMessage:'',
        errorTipFlag:false,
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
          streetAddress: '',
          chnlId:'',
          departId:''

        },
        currencyList:[],
        ruleFormLabel: {
          lastName: [
            {required: true, message: this.$t('frame.lastName') + this.$t('frame.inputNull'), trigger: 'blur'}
          ],
          alias: [
            {required: true, message:  this.$t('frame.alias') + this.$t('frame.inputNull'), trigger: 'blur'}
          ],
          email: [
            {
              required: true,
              message:  this.$t('frame.email') + this.$t('frame.inputNull'),
              trigger: 'blur',
              that: this,
              validator(rule, value, callback) {
                if (!value) {
                  callback(rule.message);
                } else {
                  //验证是否是正整数
                  let posPattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                  let result = posPattern.test(value);
                  if (!result) {
                    rule.message = this.that.$t('frame.emainl') + this.that.$t("frame.emailError"),
                      callback(rule.message);
                  } else
                    callback();
                }
              }
            }
          ],
          mobile: [
            {
              required: false,
              trigger: 'blur',
              that: this,
              validator(rule, value, callback) {
                if (!value) {
                  callback(rule.message);
                } else {
                  //验证是否是正整数
                  let posPattern = /^[\(]\+[0-9][0-9]*[\)][0-9][0-9]*$/;
                  let result = posPattern.test(value);
                  if (!result) {
                    rule.message = this.that.$t('frame.mobile') + this.that.$t("frame.mobileError"),
                      callback(rule.message);
                  } else
                    callback();
                }
              }
            }
          ],
          postCode:[
            {
              required: false,
              trigger: 'blur',
              that: this,
              validator(rule, value, callback) {
                if (!value) {
                  callback(rule.message);
                } else {
                  //验证是否是正整数
                  let posPattern = /^[1-9][0-9]{5}$/;
                  let result = posPattern.test(value);
                  if (!result) {
                    rule.message = this.that.$t('frame.postCode') + this.that.$t("frame.emailError"),
                      callback(rule.message);
                  } else
                    callback();
                }
              }
            }
          ],
          currency: [
            {required: true, message:  this.$t('frame.currency') + this.$t('frame.inputNull'), trigger: 'blur'}
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
              debugger
              // console.log(JSON.stringify(ret.data))
              // console.log(ret.data.sysStaffVos.result[0].contactCountry)
              that.formRight.chnlId = ret.data.sysStaffVos.result[0].chnlId;
              that.formRight.departId = ret.data.sysStaffVos.result[0].departId;
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
              "lang":this.aid_language,
              "vo": this.formRight,
            }).then(ret => {
              if (ret != null && "000000" == ret.data.responseHeader.resultCode) {
                debugger
                that.oneModal = true;
                that.modalMessage =that.$t('message.modify_success');
                that.flag= true;
                that.errorTipFlag = false;

              } else {
                that.oneModal = true;
                that.modalMessage =that.$t('message.modify_fail');
                that.flag= false;
                that.errorTipFlag = true;
              }
            })

          }
        })
      },
      /**
       * 取消
       */
      cancel(){
        // console.log(this.$router)
        this.$router.push(this.$router.history.current.matched[0])
       // this.$router.push({name: '/cust'});
      },
      handleOk(){
        if(this.errorTipFlag){
          this.oneModal = false
        }else{
          this.oneModal = false
          this.$router.push(this.$router.history.current.matched[0])
        }
      },
      handleClose(){
        this.oneModal = false
        this.twoModal = false
        this.modalMessage = ''
      },
      subAddPrice(){
        let that = this;
        that.twoModal = false;
        that.oneModal = false;
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