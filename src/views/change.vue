<template>
    <div class="crm-wrapper">
        <!--面包屑star-->
        <div class="bread-crumbs">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <t-breadcrumb separator=">">
                        <t-breadcrumb-item href="/">{{$t('frame.home')}}</t-breadcrumb-item>
                        <t-breadcrumb-item>{{$t('frame.changeTitle')}}</t-breadcrumb-item>
                    </t-breadcrumb>
                </div>
            </div>
        </div>
        <!--面包屑 end-->
        <div class="enquiries" style="padding: 15px 15px 0px 15px">
            <!-- 标题 star-->
            <div class="enquiries-title">
                <span></span>{{$t('frame.changeTitle')}}
            </div>
            <div class="row">
                <div class="col-6">
                    <t-form :model="formRight" :rules="ruleFormLabel" label-position="right" :label-span="4">
                        <t-form-item :label="$t('frame.accountId')" >
                            <div class="text-40">
                                <!--{{$t('frame.mobileNum')}}-->
                                {{ formRight.staffNo }}
                            </div>
                        </t-form-item>
                        <t-form-item :label="$t('frame.oldPsd')" prop="input1" class="pt-15">
                            <t-input type="password"  v-model="formRight.input1" style="width: 214px"></t-input>
                        </t-form-item>
                        <t-form-item :label="$t('frame.newPsd')" prop="input2" class="pt-15">
                            <t-input type="password"  v-model="formRight.input2" style="width: 214px" :maxlength="20"></t-input>
                        </t-form-item>
                        <t-form-item :label="$t('frame.confirmNew')" prop="input3" class="pt-15">
                            <t-input type="password"  v-model="formRight.input3" style="width: 214px" :maxlength="20"></t-input>
                        </t-form-item>
                    </t-form>
                </div>
                <div class="col-6">
                    <div class="free-tips-wrap change-tips-wrap">
                        <div class="free-tips-cnt">
                            <p class="tips-content ml-25 mb-10">{{$t('frame.psdRule')}}</p>
                            <p><i class="tips-num mb-10">1</i>{{$t('frame.rule1')}}</p>
                            <p><i class="tips-num mb-10">2</i>{{$t('frame.rule7')}}</p>
                            <p><i class="tips-num mb-10">3</i>{{$t('frame.rule6')}}</p>
                            <p><i class="tips-num mb-10">4</i>{{$t('frame.rule2')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule3')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule4')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule5')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule8')}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="bottom-button">
                <t-button type="primary" @click="submit" :disabled="formRight.staffName == ''?true:false">{{$t('frame.submit')}}</t-button>
            </div>
        </div>

        <!-- 错误弹框 -->
        <div class="warning-modal" v-show="showModal">
            <div class="warning-modal-backdrop"></div>
            <div class="warning-modal">
                <div class="warning-modal-dialog warning-tips">
                    <div class="warning-modal-content">
                        <div class="warning-icon">
                            <i :class="alertClass"></i>
                        </div>
                        <div class="waring-cnt">
                            <p><span>{{resultContent}}</span></p>
                        </div>
                        <div class="waring-btn" @click="handleOk">
                            <span class="yes">{{$t('frame.btn_yes')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 成功弹框 -->
        <div class="warning-modal" v-show="showSuccessModal">
            <div class="warning-modal-backdrop"></div>
            <div class="warning-modal">
                <div class="warning-modal-dialog warning-tips">
                    <div class="warning-modal-content">
                        <div class="warning-icon">
                            <i class="aid aid-check-circle-outline"></i>
                        </div>
                        <div class="waring-cnt">
                            <p><span>{{resultSuccessContent}}</span></p>
                        </div>
                        <div class="waring-btn" @click="handleSuccessOk">
                            <span class="yes">{{$t('frame.btn_yes')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import LocalStorage from '../utils/localStorage.js'

    let localStorage = new LocalStorage()
    export default {
        data(){
            return {
                formRight: {
                    staffName: '',
                    staffNo: '',
                    input1: '',
                    input2: '',
                    input3: '',
                },
                ruleFormLabel: {
                    input1: [
                        {required: true, message: this.$t('frame.inputNull'), trigger: 'blur'}
                    ],
                    input2: [
                        {required: true, message: this.$t('frame.inputNull'), trigger: 'blur'}
                    ],
                    input3: [
                        {required: true, message: this.$t('frame.inputNull'), trigger: 'blur'}
                    ]
                },
                alertClass: 'aid aid-alert-circle-outline',
                //弹框
                showModal: false,
                //弹框内容
                resultContent:'',
                //成功弹框
                showSuccessModal: false,
                //成功弹框内容
                resultSuccessContent:'',
            }
        },
        computed: {
            ...mapState({
                instance: state => state.storeModule.instance,
                authorization: state => state.storeModule.authorization
            })
        },
        mounted(){
            /**
             * 等待首次加载生效
             */
            setTimeout(() => {
                this.queryStaff();
            }, 300)
        },
        methods: {
            //查询
            queryStaff(){
                let that = this;
                this.formRight.input1 = '';
                this.$nextTick(() => {
                    this.instance.get(this.authorization.getStaffName, {}).then(res => {
                        // that.formRight.staffName = res.data;
                        that.formRight = res.data;
                    }).catch(res => {
                        that.makeAlert(that.$t('frame.warning'));
                    })
                })
            },
            logoutAndRemoveSession() {
                localStorage.remove('access_token')
                localStorage.remove('refresh_token')
                localStorage.remove('session_time')
                window.location.href = this.authorization.logout_uri
            },
            //提交
            submit(){
                let that = this;
                if(this.formRight.input1 == null || this.formRight.input1 == ""){
                    this.makeAlert(this.$t('frame.inputNull'))
                    return;
                }
                if(this.formRight.input2 == null || this.formRight.input2 == ""){
                    this.makeAlert(this.$t('frame.inputNull'))
                    return;
                }
                if(this.formRight.input3 == null || this.formRight.input3 == ""){
                    this.makeAlert(this.$t('frame.inputNull'))
                    return;
                }
                if(this.input2 != this.input3){
                    this.makeAlert(this.$t('frame.check'))
                    return;
                }
                this.instance.get(this.authorization.changePWD,{
                    params: {
                        'input1':this.formRight.input1,
                        'input2':this.formRight.input2,
                        'input3':this.formRight.input3,
                    }
                }).then(function(res){
                    if(res != null && res.data.resultCode == '000000'){
                        that.showSuccessModal = true;
                        that.resultSuccessContent = res.data.resultMessage;
                    }else{
                        that.makeAlert(res.data.resultMessage);
                    }
                },function(){
                    that.makeAlert(that.$t('frame.warning'));
                })
            },
            //弹框
            makeAlert(msg){
                this.showModal = true;
                this.resultContent = msg;
            },
            //取消弹框
            handleOk(){
                this.showModal = false;
            },
            //成功后跳转页面
            handleSuccessOk(){
                this.showSuccessModal = false;
                this.logoutAndRemoveSession()
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import './notice.scss'
</style>