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
                    <t-form :model="formRight" :rules="ruleFormLabel" label-position="right" :label-span="4" class="mt-20">
                        <t-form-item :label="$t('frame.accountId')">
                            <div class="text-40">
                                {{$t('frame.mobileNum')}}
                            </div>
                        </t-form-item>
                        <t-form-item :label="$t('frame.oldPsd')" prop="input1">
                            <t-input v-model="formRight.input1" style="width: 214px"></t-input>
                        </t-form-item>
                        <t-form-item :label="$t('frame.newPsd')" prop="input2">
                            <t-input v-model="formRight.input2" style="width: 214px"></t-input>
                        </t-form-item>
                        <t-form-item :label="$t('frame.confirmNew')" prop="input3">
                            <t-input v-model="formRight.input3" style="width: 214px"></t-input>
                        </t-form-item>
                    </t-form>
                </div>
                <div class="col-6">
                    <div class="free-tips-wrap">
                        <div class="free-tips-cnt">
                            <p class="tips-content ml-25 mb-10">{{$t('frame.psdRule')}}</p>
                            <p><i class="tips-num mb-10">1</i>{{$t('frame.rule1')}}</p>
                            <p><i class="tips-num mb-10">2</i>{{$t('frame.rule2')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule3')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule4')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule5')}}</p>
                            <p class="ml-25 mb-5">{{$t('frame.rule6')}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="bottom-button">
                <t-button type="primary" @click="submit">{{$t('frame.submit')}}</t-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
              formRight: {
                input1: '',
                input2: '',
                input3: '',
              },
              ruleFormLabel: {
                input1: [
                  {required: false, message: 'input不能为空', trigger: 'blur'}
                ],
                input2: [
                  {required: false, message: 'input不能为空', trigger: 'blur'}
                ],
                input3: [
                  {required: false, message: 'input不能为空', trigger: 'blur'}
                ]
              }
            }
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    @import './notice.scss'
</style>