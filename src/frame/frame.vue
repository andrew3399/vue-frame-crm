<template>
    <div class="layout layout--one-screen bg-gray-lightest-5">
        <div :class="['menu-backdrop d-xl-none',{'show': isOpenOnMinWin === false}]" @click="closeMenuOnMinWin"></div>
        <div :class="['layout-sidebar',{'layout-sidebar--folded': isOpen === false},{'show': isOpenOnMinWin === false}]"  v-if="showMenuHead === '1' || showMenuHead === '3'">
            <div class="layout-logo-left">
                <slot name="frame-header">
                    <!-- <span v-if> -->
                        <!--<router-link :to="logoRouter">-->
                            <!-- <img :src="img" alt="" class="layout-logo-img"/> -->
                            <!-- <img :src="imgMin" alt="" class="layout-logo-min-img"/> -->
                        <!--</router-link>-->
                    <!-- </span> -->
                    <span >
                <img :src="img" alt="" class="layout-logo-img"/>
                        <img :src="imgMin" alt="" class="layout-logo-min-img"/>
                    </span>
                </slot>
                <a href="javascript:;" class="d-none d-xl-block thumb-icon" v-if="showMenu">
                    <t-icon type="menu" class="text-xxl text-black" @click.native="openOrClose"></t-icon>
                </a>
            </div>
            <div :class="['layout-menu', {'menu--folded': isOpen === false}, {'menu--fold--show': clientWidth > 1200}, {'menu--fold--min': clientWidth <= 1199}]">
                <slot name="frame-menu">
                    <t-menu
                            type="light"
                            :active-name="queryActiveMenu"
                            :open-names="queryOpenName"
                            :open-position="openPosition"
                            :accordion="accordion"
                            :class="[{'menu--folded': isOpen === false && clientWidth > 1200}]"
                            @on-select="hdMenuClick"
                            ref="sidebarMenu">
                        <template v-for="(item1, x) in treeData">
                            <t-submenu :name="item1.menuName" v-if="item1.children && item1.children.length">
                                <template slot="title">
                                    <t-icon :type="item1.menuIcon" v-if="item1.menuIcon"></t-icon>
                                    <t-avatar size="sm" bg-state="success" :text="item1.rightTag" :dot="false"
                                              v-else></t-avatar>
                                    <router-link :to="{ path: item1.menuUrl }"
                                                 v-if="item1.rightTag === tag && item1.menuUrl">
                                        <span class="sub-text" :title="lang === 'ZH'?item1.menuName:item1.menuEnName">{{lang === 'EN'?item1.menuName:item1.menuEnName}}</span>
                                    </router-link>
                                    <a href="javascript:;" @click="handleOtherRegin(item1.systemUrl + item1.menuUrl)"
                                       target="_self"
                                       v-else-if="item1.systemUrl && item1.menuUrl && item1.rightTag !== tag">
                                        <span class="sub-text" :title="lang === 'ZH'?item1.menuName:item1.menuEnName">{{lang === 'EN'?item1.menuName:item1.menuEnName}}</span>
                                    </a>
                                    <span class="sub-text" :title="lang === 'ZH'?item1.menuName:item1.menuEnName" v-else>{{lang === 'EN'?item1.menuName:item1.menuEnName}}</span>
                                </template>
                                <template v-for="(item2, y) in item1.children">
                                    <t-submenu v-if="item2.children && item2.children.length" :name="item2.menuName"
                                               class="second-submenu">
                                        <template slot="title">
                                            <router-link :to="{ path: item2.menuUrl}"
                                                         v-if="item2.rightTag === tag && item2.menuUrl">
                                                <span class="sub-text" :title="lang === 'ZH'?item2.menuName:item2.menuEnName">{{lang === 'EN'?item2.menuName:item2.menuEnName}}</span>
                                            </router-link>
                                            <a href="javascript:;"
                                               @click="handleOtherRegin(item2.systemUrl + item2.menuUrl)" target="_self"
                                               v-else-if="item2.systemUrl && item2.menuUrl && item2.rightTag !== tag">
                                                <span class="sub-text" :title="lang === 'ZH'?item2.menuName:item2.menuEnName">{{lang === 'EN'?item2.menuName:item2.menuEnName}}</span>
                                            </a>
                                            <span class="sub-text" :title="lang === 'ZH'?item2.menuName:item2.menuEnName"
                                                  v-else>{{lang === 'ZH'?item2.menuName:item2.menuEnName}}</span>
                                        </template>
                                        <template v-for="(item3, z) in item2.children">
                                            <t-submenu v-if="item3.children && item3.children.length"
                                                       :name="item3.menuName" :id="x + '' +y" class="second-submenu">
                                                <t-menu-item v-for="(item4, w) in item3.children" :name="item4.menuName"
                                                             :key="w" @click.native="getMenu(item4)" class="sec-item">
                                                    <router-link :to="{ path: item4.menuUrl }"
                                                                 v-if="item4.rightTag === tag && item4.menuUrl">
                                                        <span class="sub-text" :title="lang === 'EN'?item4.menuName:item4.menuEnName">{{lang === 'EN'?item4.menuName:item4.menuEnName}}</span>
                                                    </router-link>
                                                    <a href="javascript:;"
                                                       @click="handleOtherRegin(item4.systemUrl + item4.menuUrl)"
                                                       target="_self"
                                                       v-else-if="item4.systemUrl && item4.menuUrl && item4.rightTag !== tag">
                                                        <span class="sub-text" :title="lang === 'EN'?item4.menuName:item4.menuEnName">{{lang === 'EN'?item4.menuName:item4.menuEnName}}</span>
                                                    </a>
                                                    <span class="sub-text" :title="lang === 'EN'?item4.menuName:item4.menuEnName"
                                                          v-else>{{lang === 'EN'?item4.menuName:item4.menuEnName}}</span>
                                                </t-menu-item>
                                            </t-submenu>
                                            <t-menu-item :name="item3.menuName" :key="z" @click.native="getMenu(item3)"
                                                         class="sec-item" v-else>
                                                <router-link :to="{ path: item3.menuUrl }"
                                                             v-if="item3.rightTag === tag && item3.menuUrl">
                                                    <span class="sub-text"
                                                          :title="lang === 'EN'?item3.menuName:item3.menuEnName">{{lang === 'EN'?item3.menuName:item3.menuEnName}}</span>
                                                </router-link>
                                                <a href="javascript:;"
                                                   @click="handleOtherRegin(item3.systemUrl + item3.menuUrl)"
                                                   target="_self"
                                                   v-else-if="item3.systemUrl && item3.menuUrl && item3.rightTag !== tag">
                                                    <span class="sub-text"
                                                          :title="lang === 'EN'?item3.menuName:item3.menuEnName">{{lang === 'EN'?item3.menuName:item3.menuEnName}}</span>
                                                </a>
                                                <span class="sub-text" :title="lang === 'EN'?item3.menuName:item3.menuEnName"
                                                      v-else>{{lang === 'EN'?item3.menuName:item3.menuEnName}}</span>
                                            </t-menu-item>
                                        </template>
                                    </t-submenu>
                                    <t-menu-item :name="item2.menuName" v-else>
                                        <router-link :to="{ path: item2.menuUrl }"
                                                     v-if="item2.rightTag === tag && item2.menuUrl">
                                            <span class="sub-text" :title="lang === 'ZH'?item2.menuName:item2.menuEnName">{{lang === 'EN'?item2.menuName:item2.menuEnName}}</span>
                                        </router-link>
                                        <a href="javascript:;"
                                           @click="handleOtherRegin(item2.systemUrl + item2.menuUrl)" target="_self"
                                           v-else-if="item2.systemUrl && item2.menuUrl && item2.rightTag !== tag">
                                            <span class="sub-text" :title="lang === 'ZH'?item2.menuName:item2.menuEnName">{{lang === 'EN'?item2.menuName:item2.menuEnName}}</span>
                                        </a>
                                        <span class="sub-text" :title="lang === 'ZH'?item2.menuName:item2.menuEnName" v-else>{{lang === 'EN'?item2.menuName:item2.menuEnName}}</span>
                                    </t-menu-item>
                                </template>
                            </t-submenu>
                            <t-menu-item :name="item1.menuName" v-else>
                                <t-icon :type="item1.menuIcon" v-if="item1.menuIcon"></t-icon>
                                <t-avatar size="sm" bg-state="success" :text="item1.rightTag" :dot="false"
                                          v-else></t-avatar>
                                <router-link :to="{ path: item1.menuUrl }"
                                             v-if="item1.rightTag === tag && item1.menuUrl">
                                    <span class="sub-text" :title="lang === 'ZH'?item1.menuName:item1.menuEnName">{{lang === 'EN'?item1.menuName:item1.menuEnName}}</span>
                                </router-link>
                                <a href="javascript:;" @click="handleOtherRegin(item1.systemUrl + item1.menuUrl)"
                                   target="_self"
                                   v-else-if="item1.systemUrl && item1.menuUrl && item1.rightTag !== tag">
                                    <span class="sub-text" :title="lang === 'ZH'?item1.menuName:item1.menuEnName">{{lang === 'EN'?item1.menuName:item1.menuEnName}}</span>
                                </a>
                                <span class="sub-text" :title="lang === 'ZH'?item1.menuName:item1.menuEnName" v-else>{{lang === 'EN'?item1.menuName:item1.menuEnName}}</span>
                            </t-menu-item>
                        </template>
                    </t-menu>
                </slot>
            </div>
        </div>
        <div :class="['layout-content', 'layout-delete-dot',{'hidenMenu': showMenuHead !== '1' && showMenuHead !== '3'}]">
            <div class="bg-white pt-10" style="padding-bottom: 10px;" v-if="showMenuHead === '4'">
                <div class="bg-primary pl-10" style="color: white">
                    <span >
                        {{lang === 'EN' ? staffMpMenu.mpNameus : staffMpMenu.mpNamecn}}
                    </span>
                </div>
                <div class="tab-menu" v-if="showMenuHead === '4'">
                    <t-button-group>
                        <t-button type="outline-primary" style="cursor: pointer;" v-for="staffMenu in staffMpMenu.menulist" @click="changeStaffMpMenu(staffMenu.menuUrl)">
                            {{lang === 'EN'? staffMenu.menuEnName : staffMenu.menuName}}
                        </t-button>
                    </t-button-group>
                </div>
            </div>

            <div class="layout-nav navbar navbar-expand-lg bg-white align-items-center layout-nav--top"  v-if="showMenuHead === '1' || showMenuHead === '2'">
                <div class="row nav-row">
                    <div class="col col-6 nav-col">
                        <a href="javascript:;" class="d-xm-block thumb-icon" v-show="!showMenu">
                            <t-icon type="menu" class="text-xxl text-black" @click.native="openOrClose"></t-icon>
                        </a>
                        <slot name="frame-nav-left"></slot>
                    </div>
                    <div class="col col-6 nav-col nav-col--right">
                        <slot name="frame-nav">
                            <t-menu
                                    mode="horizontal"
                                    type="light"
                                    @on-select="handleNavSelect"
                                    class="menu-span"
                            >

                                <template v-for="(item, x) in navs">
                                    <t-submenu v-if="item.children" :name="x">
                                        <template slot="title">
                                            <t-icon :type="item.icon" v-if="item.icon"></t-icon>
                                            <span class="sub-text" v-if="item.name">{{item.name}}</span>
                                        </template>
                                        <t-menu-item v-for="(item1, index) in item.children" :key="index + 'item'"
                                                     :name="x + '' + index">
                                            <t-icon :type="item1.icon" v-if="item1.icon"></t-icon>
                                            <span class="sub-text" v-if="item1.name">{{item1.name}}</span>
                                        </t-menu-item>
                                    </t-submenu>
                                    <t-menu-item :name="x" v-else>
                                        <t-badge dot state="danger" v-if="item.icon === 'bell' && count">
                                        <span @click="showSlipbox">
                                            <t-icon :type="item.icon" v-if="item.icon"></t-icon>
                                        <span class="sub-text" v-if="item.name">{{item.name}}</span>
                                    </span>
                                        </t-badge>
                                        <template v-else-if="item.icon === 'bell'">
                                    <span @click="showSlipbox">
                                        <t-icon :type="item.icon" v-if="item.icon"></t-icon>
                                        <span class="sub-text" v-if="item.name">{{item.name}}</span>
                                    </span>
                                        </template>
                                        <template v-else>
                                            <a href="javascript:;" target="_self"
                                               v-if="item.handleType && item.handleType === 'logout'"
                                               @click="handleLogout(item)">
                                                <t-icon :type="item.icon" v-if="item.icon"></t-icon>
                                                <span class="sub-text" v-if="item.name">{{item.name}}</span>
                                            </a>
                                            <span v-else>
                                          <!--<a href="javascript:;" target="_self" @click="toChangePWD()">-->
                                                <!--<t-icon :type="item.icon" v-if="item.icon"></t-icon>-->
                                                <!--<span class="sub-text" v-if="item.name">{{item.name}}</span>-->
                                                <!--</a>-->
                                        <t-dropdown>
                                            <t-badge class="ml-4" style="margin-left:0!important;">
                                                <t-icon :type="item.icon" v-if="item.icon"></t-icon>
                                                <!--{{staffName}}-->
                                                {{formRight.staffName}}
                                                <t-icon type="arrow-down-drop" size="20"></t-icon>
                                            </t-badge>
                                            <t-dropdown-menu slot="list" class="cl-frame-dropdown">
                                                <t-dropdown-item v-on:on-click="toPersonalInfo()">
                                                    <t-icon type="account-circle"></t-icon>
                                                    <!--{{staffName}}-->
                                                    {{$t('frame.personalTitle')}}
                                                </t-dropdown-item>
                                                <t-dropdown-item v-on:on-click="toChangePWD()">
                                                    <t-icon type="lock-unlocked"></t-icon>
                                                    {{$t('frame.change_psd')}}
                                                </t-dropdown-item>
                                            </t-dropdown-menu>
                                        </t-dropdown>
                                      </span>
                                        </template>
                                    </t-menu-item>
                                </template>
                            </t-menu>
                        </slot>
                        <t-button type="outline-secondary" v-text="lang === 'ZH'? '中' : lang" size="sm" class="btn-lang" @click="handleChangeLang">
                        </t-button>
                    </div>
                </div>
            </div>
            <div :class="slipbox__container" v-clickout-side="handleClickoutSide">
                <div class="slipbox__content" :class="[{'close': hideSlip}]">
                    <div class="slipbox__close" @click="hideSlipbox">
                        <a href="javascript:;" target="_self">
                            <t-icon type="close"></t-icon>
                        </a>
                    </div>
                    <div class="slipbox__body">
                        <slot name="slipbox-body">
                            <t-tabs v-model="tabs">
                                <t-tab-panel :label="$t('frame.sysInform')" name="tab-1">
                                    <div class="notice-wrap" v-for="(item, index) in notices"
                                         :class="{'notice-active': isActive === index}"
                                         @click="handleNoticeClick(index, item)">
                                        <span class="nw-l"><t-tag state="info">info</t-tag></span>
                                        <span class="nw-r">
                                          <p class="nw-r-title">{{item.bulletinTitle}}</p>
                                          <p class="nw-r-time">{{$t('frame.expiryDate')}}：{{item.activeTime | format}} {{$t('frame.to')}} {{item.inactiveTime | format}}</p>
                                      </span>
                                    </div>
                                    <p class="notice__loading" v-if="notices.length > 0 "><a href="javascript:;" target="_self"
                                                                  @click="loadingMore">{{$t('frame.loadingMore')}}</a>
                                    </p>
                                </t-tab-panel>
                            </t-tabs>
                        </slot>
                    </div>
                </div>
            </div>
            <div :class="['layout-main',{'hidenNavTop': showMenuHead === '5'},{'showMoreNav': showMenuHead === '4'}]">
                <div class="layout-main--content">
                    <div class="bread-crumbs cmi-bread-crumbs-wrap" v-if="breadcrumbArr && showMenuHead !== '4' && showMenuHead !== '5'">
                        <div class="row ml-0 mr-0">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pl-0">
                                <t-breadcrumb separator=">" >
                                    <t-breadcrumb-item v-for="(item, $idx) in breadcrumbArr" :key="$idx"
                                                       :class="($idx == 0 || $idx == breadcrumbArr.length - 1) ? 'unclick' : ''"
                                                       :href="($idx == 0 || $idx == breadcrumbArr.length - 1) ? '' : item.menuUrl">
                                        {{lang === 'EN' ? item.menuName : item.menuEnName}}
                                    </t-breadcrumb-item>
                                </t-breadcrumb>
                            </div>
                        </div>
                    </div>
                    <router-view></router-view>
                    <div class="pager-footer" v-if="showMenuHead !== '4' && showMenuHead !== '5'">
                    <p>{{pagerFooter}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="slide-wrap-content" :class="[{'slideWrapClose': hideSlideWrapSlip}]">
            <t-icon type="close" size="36" class="icon-close mr-5 mt-3" @click.native="handleClickClose"></t-icon>
        </div>
    </div>
</template>
<script>
    import ClickoutSide from './clickoutside.js'
    import SessionStorage from '../utils/sessionStorage.js'
    import LocalStorage from '../utils/localStorage.js'
    import {transData, getQueryData, getQuery, uuid} from '../utils/utils.js'
    import * as Constant from '../store/constant.js'
    import {mapMutations, mapState} from 'vuex'
    import {Base64} from 'js-base64'
    import QueryString from 'query-string'
    // import EventHub from '../eventHub'
    let sessionStorage = new SessionStorage ()
    //test
    let localStorage = new LocalStorage()

    let timeout = null

    let throttle = function (func, wait, options) {
        let context
        let args
        let result
        // 上次执行时间点
        let previous = 0
        if (!options) options = {}
        // 延迟执行函数
        let later = function () {
            // 若设定了开始边界不执行选项，上次执行时间始终为0
            previous = options.leading === false ? 0 : new Date().getTime()
            timeout = null
            result = func.apply(context, args)
            if (!timeout) context = args = null
        }
        return function () {
            let now = new Date().getTime()
            // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
            if (!previous && options.leading === false) previous = now
            // 延迟执行时间间隔
            let remaining = wait - (now - previous)
            context = this
            args = arguments
            // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
            // remaining大于时间窗口wait，表示客户端系统时间被调整过
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout)
                timeout = null
                previous = now
                result = func.apply(context, args)
                if (!timeout) context = args = null
                // 如果延迟执行不存在，且没有设定结尾边界不执行选项
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining)
            }
            return result
        }
    }

    export default {
        name: 'TFrame',
        props: {
            img: {
                type: String
            },
            imgMin: {
                type: String
            },
            showMenuHead: {
                type: String,
                default: '1'
            },
            // logo 路由
            // logoRouter: {
            //     type: Object,
            //     default: () => {
            //         return {
            //             path: '/'
            //         }
            //     }
            // },
            // 当前展开的menu
            activeMenu: {
                type: [String, Number]
            },
            openNames: {
                type: [Array]
            },
            /**
             * 渲染menu菜单
             * {
             *  menuIcon, 一级菜单的右侧icon的type，对应的是aidesign的图标库
             *  name, 当前菜单的名称
             *  path, 路由的path对象
             *  link  非本项目的链接
             * }
             */
            menuList: {
                type: Array,
                default: () => {
                    return []
                }
            },
            /**
             * 渲染头部menu
             * {
             *  type, 'icon'| 'dropdown' | 'avatar'
             *  icon, 图标icon的type，对应的是aidesign的图标库
             *  children, 如果是dropdown时需要提供dropdownitem
             * }
             */
            navs: {
                type: Array,
                default: []
            },
            /**
             * 服务调用实例
             */
            instance: {
                type: Function
            },
            /**
             * 登录相关的设置
             */
            authorization: {
                type: Object
            },
            /**
             * 当前服务的
             */
            tag: {
                type: String
            }
        },
        data() {
            return {
                formRight:{
                    staffName: '',
                    staffNo: '',
                    HKTime:'',
                },
                isOpen: true,
                isOpenOnMinWin: true,
                openPosition: 'down',
                clientWidth: 1200,
                showMenu: true,
                needBackDrop: false,
                hideSlip: true,
                hideSlideWrapSlip: true,
                accordion: true,
                isActive: 0,
                menu: [],
                count: 10,
                notices: [],
                queryActiveMenu: '',
                queryOpenName: [],
                lang: 'EN',
                tabs: 'tab-1',
              staffMpMenu:{
                mpNameus: '',
                mpNamecn: '',
                menulist: []
              },
              staffMenuFuncMap: {}
            }
        },
        computed: {
            breadcrumbArr(){
                debugger
                return this.$store.state.storeModule.breadcrumbArr
            },
            treeData() {
                if (this.menuList && this.menuList.length) {
                    return this.menuList
                } else if (this.menu && this.menu.length) {
                    return this.menu
                }
                return []
            },
            ins() {
                this.setInstance(this.instance)
                return this.instance
            },
            auth() {
                this.setAuthorization(this.authorization)
                return this.authorization
            },
            pagerFooter() {
                let year = new Date().getFullYear()
                return `©️${year} ` + this.$t('frame.pagerFooter')
            }
        },
        directives: {
            ClickoutSide
        },
        filters: {
            format: function (param) {
                if (!param || param < 0) return ''
                let crt = new Date(param)

                function Format(format) {
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

                return Format('yyyy/MM/dd')
            }
        },
        watch: {
          '$route'(to,from){
            // 监听路由变化情况，切换对应的面包屑信息
            if (this.showMenuHead != 4){
              this.getParentMenu()
            }
          }
        },
        methods: {
          getBaseInfo(){
            let that = this
              if (this.authorization != undefined && this.authorization.baseInfoUrl != undefined
                && this.authorization.baseInfoUrl != '') {
              this.instance.post(this.authorization.baseInfoUrl,{}).then(res=>{
                let resData = res.data;
                sessionStorage.set('frame-base-info',resData)
                that.translateBaseInfo(resData);
              })
            }
          },

          getLocalTime(){
            //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
            var d = new Date();
            //得到1970年一月一日到现在的秒数
            var len = d.getTime();
            //本地时间与GMT时间的时间偏移差
            var offset = d.getTimezoneOffset() * 60000;
            //得到现在的格林尼治时间
            var utcTime = (len + offset) + 3600000*8;
            var date = new Date(utcTime);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            var currentTime = year + "-" + month + "-" + day + "  " + hour + ":" + minutes + ":" + second ;
            this.formRight.HKTime =  currentTime;
          },
          translateBaseInfo(resData){
            this.menu = resData.staffMenue;
            sessionStorage.set('menu_list',this.menu)
            this.translateMenuInfo(this.menu);
            this.formRight.staffName = resData.staffName
            this.formRight.staffNO = resData.staffNo
            this.notices = resData.bulletinList
            this.staffMenuFuncMap = resData.staffMenuFunsMap
          },
          changeStaffMpMenu(url){
            if (url.indexOf('?') > -1){
              url = url + "&showMenuHead=4"
            } else{
              url = url + "?showMenuHead=4"
            }
            if(this.mpId != ''){
              url = url + "&mpId=" + this.mpId
            }
            let routePath = this.$route.matched[0].path
            this.$router.push(url)
            if (url.indexOf(routePath) == -1 && this.showMenuHead === 4){
              this.$router.go(0)
            }
          },
          //ESOP集成涉及的菜单列表信息获取
          getStaffMpMenue(){
            let that = this
            let routePath = this.$route.path
            let pathParams = this.$route.query
            if (pathParams != null && pathParams != '' && pathParams.mpId != undefined
                && pathParams.mpId != null && pathParams.mpId != ''
                && this.authorization.getStaffMpMenue != undefined){
                this.mpId = pathParams.mpId
                this.instance.post(this.authorization.getStaffMpMenue,{
                  mpId: pathParams.mpId
                }).then(function(ret){
                  console.log(ret)
                  if (ret.status === 200 && ret.data != null){
                    that.$store.state.storeModule.staffMpMenu = ret.data
                    that.staffMpMenu = ret.data
                    let menuList = ret.data.menulist
                    if (menuList.length > 0) {
                       let defaultMenu = menuList[0]
                        let menuUrl = defaultMenu.menuUrl
                      if (menuUrl.indexOf('/') > -1){
                         let menuRoutePath = menuUrl.substring(0,menuUrl.lastIndexOf("/"));
                         if (routePath.indexOf(menuRoutePath) > -1){
                           if(that.showMenuHead === '4' ){
                             that.changeStaffMpMenu(menuUrl)
                           }
                         }
                      }
                    }
                  }
                  // if (ret.data)
                })
            }
          },
          getParentMenu(){
            let that  = this
            this.instance.post(this.authorization.parentMenuUri, {
              url: this.$route.path,
              params: this.$route.params
            }).then(function (ret) {
              if (ret.data.success) {
                let parthMenuArray = ret.data.result
                if (parthMenuArray != null && parthMenuArray.length > 0 && that.authorization.getStaffMenuFunc !== undefined) {
                  that.$store.state.storeModule.staffMenuFunc = []
                  let currentMenu = parthMenuArray[parthMenuArray.length - 1]

                  let frameBaseInfo = sessionStorage.get('frame-base-info')
                  if (frameBaseInfo && frameBaseInfo != null && frameBaseInfo.staffMenuFunsMap != null
                   && frameBaseInfo.staffMenuFunsMap != undefined){
                //   let frameBaseInfo = localStorage.get('frame_base_info')
                //   if (frameBaseInfo && frameBaseInfo != null){
                    that.$store.state.storeModule.staffMenuFunc = frameBaseInfo.staffMenuFunsMap[currentMenu.menuId]
                  }
                  if (that.$store.state.storeModule.staffMenuFunc != undefined && that.$store.state.storeModule.staffMenuFunc.length <= 0){
                    that.instance.post(that.authorization.getStaffMenuFunc, {
                      menuId: currentMenu.menuId
                    }).then(function (res) {
                      if (res != null && res !== '') {
                        that.$store.state.storeModule.staffMenuFunc = res.data
                      }
                    })
                  }
                }
                that.$store.state.storeModule.breadcrumbArr = []
                that.$store.state.storeModule.breadcrumbArr = ret.data.result
              }
            })
          },
          /* 消息点击触发 */
            handleNoticeClick(index, item) {
                this.isActive = index
                this.hideSlip = true
                const bulletinId = item.bulletinId
                this.$router.push({name: 'notice', params: {bulletinId}})
            },
            /* 页面存在点击操作、keyUp操作, 将sessionTime更新 */
            handleRefreshSessionTime(that) {
                /**
                 *  在存数据之前需要判断一下当前 sessionTime 是否生效
                 *  如果已经失效，则不需要存数据
                 *  如果没失效，这里需要判断accsstoken 是否存在，不存在的话，需要重新请求token
                 */
                let accessToken = localStorage.get('access_token')
                let refreshToken = localStorage.get('refresh_token')
                let sessionTime = localStorage.get('session_time')
                let currentTime = new Date().getTime()
                /**
                 * sessionTime 存在,需要重新设置sessiontime的过期时间
                 */
                if (sessionTime) {
                    let time = new Date().getTime() + 8 * 60 * 60 * 1000
                    throttle(() => {
                        localStorage.set('session_time', time, 8 * 60 * 60 * 1000)
                    }, 5 * 1000, {leading: false, trailing: true})()

                    /**
                     * accessToken 不存在，需要根据refreshToken，获取并设置accessToken、refreshToken
                     */
                    if (!accessToken) {
                        that.instance.post(that.authorization.tokenUri +
                            '?grant_type=refresh_token' + '&refresh_token=' + encodeURIComponent(refreshToken) + '&scope=read', '', {
                            headers: {
                                Authorization: 'Basic ' + Base64.encode(that.authorization.client_id + ':' + that.authorization.clientSecret)
                            }
                        })
                            .then(res => {
                                localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
                                // localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
                            }).catch(res => {
                            if (res && res.response) {
                                switch (res.response.status) {
                                    /**
                                     * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
                                     */
                                    case 401:
                                        that.getTokenAgian()
                                        break
                                }
                            }
                        })
                    }
                } else {
                    let alink = document.createElement('a')
                    alink.href = window.location.href
                    let path = alink.pathname.replace(/^([^\/])/, '/$1')
                    localStorage.set('aid-path', decodeURIComponent(path))
                    that.logoutAndRemoveSession()
                }
            },
            /* 加载更多 */
            loadingMore() {
                this.hideSlip = true
                this.$router.push({name: 'notice-list'})
            },
            handleClickClose() {
                this.hideSlideWrapSlip = true
            },
            /* 点击图标触发 */
            handleLogout(item) {
                if (item && item.handleType && item.handleType === 'logout') {
                    /* 登出 */
                    this.logoutAndRemoveSession()
                }
            },
            logoutAndRemoveSession() {
                localStorage.remove('access_token')
                localStorage.remove('refresh_token')
                localStorage.remove('session_time')
                sessionStorage.remove('menu_list')
                sessionStorage.remove('frame-base-info')
                window.location.href = this.authorization.logout_uri
            },
            /* 到修改密码 */
            toChangePWD() {
                this.$router.push({name: 'change'})
            },
            toPersonalInfo() {
                this.$router.push({name: 'personal'})
            }
            ,
            closeMenuOnMinWin() {
                this.isOpenOnMinWin = true
            },
            openOrClose() {
                this.isOpen = !this.isOpen
                this.isOpenOnMinWin = false
                // if (this.clientWidth >= 1200 && !this.isOpen) {
                //  this.openPosition = 'right'
                // } else {
                //  this.openPosition = 'down'
                // }
                if (this.clientWidth >= 1200) {
                    this.openPosition = this.openPosition === 'down' ? 'right' : 'down'
                } else {
                    this.openPosition = 'down'
                }

                if (this.clientWidth >= 1200 && !this.isOpen) {
                    this.showMenu = false
                } else {
                    this.showMenu = true
                }
            },
            hdMenuClick(name) {
                this.$emit('menu-click', name)
            },
            handleNavSelect(name) {
                this.$emit('nav-menu-click', name)
            },
            getMenu(item) {
                this.$emit('on-click', item)
            },
            showSlipbox() {
                this.hideSlip = false
            },
            hideSlipbox() {
                this.hideSlip = true
            },
            _ischild(child) {
                while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
                    if (child === this.$el) {
                        return true
                    }
                    child = child.parentNode
                }
                return false
            },
            _isChildNode(child, parent) {
                while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
                    if (child === this.$el.getElementsByClassName(parent)[0]) {
                        return true
                    }
                    child = child.parentNode
                }
                return false
            },
            handleClickoutSide(e) {
                if (this._ischild(e.target) && (!e.target.classList.contains('slipbox__content') || !this._isChildNode(e.target, 'slipbox__content')) && !this._isChildNode(e.target, 'slide-wrap-content')) {
                    this.hideSlipbox()
                    return true
                }
                return false
            },
            /* 切换语言 */
            handleChangeLang() {
                let language = 'en-US'
                if (this.lang === 'EN') {
                    this.lang = 'ZH'
                    language = 'en-US'
                } else if (this.lang === 'ZH') {
                    this.lang = 'EN'
                    language = 'zh-CN'
                }
                localStorage.set('aid-language', language)
                this.$i18n.locale = language
                this.instance.post(this.authorization.changeLangUri, {
                    language: this.lang
                }).then(res => {
                    // window.location.reload()
                }).catch(res => {
                    that.handleResponseExcept(res)
                })
            },
            
            /* 跳出当前域，并将其 path 保存下来 */
            handleOtherRegin(url) {
                let accessToken = localStorage.get('access_token')
                let sessionTime = localStorage.get('session_time')
                let refreshToken = localStorage.get('refresh_token')
                let that = this

                if (sessionTime && !accessToken) {
                    that.instance.post(that.authorization.tokenUri +
                        '?grant_type=refresh_token' + '&refresh_token=' + encodeURIComponent(refreshToken) + '&scope=read', '', {
                        headers: {
                            Authorization: 'Basic ' + Base64.encode(that.authorization.client_id + ':' + that.authorization.clientSecret)
                        }
                    }).then(res => {
                        localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
                        // localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
                      that.changeToPage(url)
                    }).catch(res => {
                      that.changeToPage(url)
                    })
                } else {
                  that.changeToPage(url)
                }
            },
            changeToPage(url){
                let alink = document.createElement('a')
                alink.href = url
                let path = alink.pathname.replace(/^([^\/])/, '/$1')
                if(url.indexOf('?') > -1){
                  window.location.href = url + '&path=' + path
                }else{
                  if (path.indexOf('/rpt/views') > 0){
                    window.location.href = url
                  } else {
                    window.location.href = url + '?path=' + path
                  }
                }
            },
            handleResponseExcept(res){
              /**
               * 处理相关错误的问题
               */
              if (res && res.response) {
                switch (res.response.status) {
                  /**
                   * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
                   */
                  case 401:
                    let that = this
                    let title = this.$t('frame.systemInfo')
                    let content = this.$t('frame.systemInfoContent')
                    this.$Modal.warning({
                      title: title,
                      content: content,
                      onOk: () => {
                        let accessToken = localStorage.get('access_token')
                        let refreshToken = localStorage.get('refresh_token')
                        if (!accessToken || !refreshToken) return
                        let msg = {
                          client_id: that.authorization.client_id,
                          redirect_uri: encodeURIComponent(that.authorization.redirect_uri),
                          state: uuid(6, 16)
                        }
                        window.location.href = that.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
                      }
                    })
                    break
                }
              }
            },
            /* 用于处理401重新再发请求 */
            // 重新获取 token
            // 获取menu后重新如果返回401
            getTokenAgian(cb) {
                let that = this
                let refreshToken = localStorage.get('refresh_token')
                this.instance.post(this.authorization.tokenUri +
                    '?grant_type=refresh_token' + '&refresh_token=' + encodeURIComponent(refreshToken) + '&scope=read', '', {
                    headers: {
                        Authorization: 'Basic ' + Base64.encode(that.authorization.client_id + ':' + that.authorization.clientSecret)
                    }
                })
                    .then(res => {
                        localStorage.set('access_token', res.data.access_token, res.data.expires_in * 1000)
                        // localStorage.set('refresh_token', res.data.refresh_token, Math.pow(2, 32))
                        cb && cb()
                    })
            },
            // 获取menu数据
            getMenuCb() {
                let that = this;
              let menuListInfo = localStorage.get('menu_list')
              if (menuListInfo != null && menuListInfo != ''){
                that.translateMenuInfo(res);
              }else{
                this.instance.get(this.authorization.menuUri,
                  {
                    params: {
                      language: this.lang
                    }
                  }).then(res => {
                  localStorage.set('menu_list',res.data)
                  that.translateMenuInfo(res.data);

                }).catch(res => {
                  that.handleResponseExcept(res)
                })
              }

            },
            translateMenuInfo(res){
              /**
               * 先找出这一条数据，并将其 menuName 组成一个数组
               */
              this.menu = transData(res, 'menuId', 'menuPid', 'children', 'menuOrder')
              /**
               * 设置自动展开
               */
              this.$nextTick(() => {
                let route = localStorage.get('aid-path') || this.$route.path || getQuery('path') || '/'
                let queryName = getQueryData(res, 'menuId', 'menuPid', decodeURIComponent(route), 'menuName')
                this.queryActiveMenu = queryName.name
                this.queryOpenName = queryName.names
                let routeArr2 = ['/res', '/cust', '/order', '/acct','/mks', '/rpt', '/prod', '/odp', '/base', '/']
                let querys = localStorage.get('query-key')
                if (route && !routeArr2.includes(decodeURIComponent(route))) {
                  let query = JSON.parse(querys)
                  this.$router.push({path: decodeURIComponent(route), query: query})
                  localStorage.remove('aid-path')
                  localStorage.remove('query-key')
                }
              })
            },
            getbulletinListCb() {
                this.instance.get(this.authorization.bulletinListUri,
                    {
                        params: {
                            pageNo: 1,
                            pageSize: 10
                        }
                    }).then(res => {
                    this.notices = res.data.result
                }).catch(res => {
                    that.handleResponseExcept(res)
                })
            },
            //查询
            queryStaff() {
                let that = this;
                this.$nextTick(() => {
                    this.instance.get(this.authorization.getStaffName, {}).then(res => {
                        that.formRight = res.data;
                    }).catch(res => {
                        that.makeAlert(that.$t('frame.warning'));
                    })
                })
            },
            ...mapMutations([
                'setInstance',
                'setAuthorization'
            ])
        },
        async created() {
            /* 用于监测传过来的path */
            let path = getQuery('path') || this.$route.path
            let routeArr = ['/res', '/cust', '/order', '/acct', '/mks', '/rpt', '/prod', '/odp', '/provision', '/base', '/']
            if (path && !routeArr.includes(decodeURIComponent(path))) {
                localStorage.set('aid-path', decodeURIComponent(path))
            }
            /**
             * 获取所有URL query 并存储
             */
            const parsed = QueryString.parse(window.location.search)
            localStorage.set('query-key', JSON.stringify(parsed))
            /**
             * 用于监测用户点击和输入行为
             */
            let that = this
            document.body.onclick = function () {
                that.handleRefreshSessionTime(that)
            }
            document.body.onkeyup = function () {
                that.handleRefreshSessionTime(that)
            }
            // let path = getQuery('path')
            // localStorage.set('aid-path', path, 5 * 60 * 1000)
            let accessToken = localStorage.get('access_token')
            let refreshToken = localStorage.get('refresh_token')
            if (!accessToken || !refreshToken) return
            if (this.menuList && this.menuList.length) return

            // 获取login处设置的语言
            // let fetchLang = await this.instance.get(this.authorization.langUri)
            // if (fetchLang.data === '中') {
            //     this.lang = 'EN'
            //     localStorage.set('aid-language', 'zh-CN')
            //     this.$i18n.locale = 'zh-CN'
            // } else if (fetchLang.data === 'en') {
            //     this.lang = '中'
            //     localStorage.set('aid-language', 'en-US')
            //     this.$i18n.locale = 'en-US'
            // }

            // 设置语言信息
            let fetchLang = await this.instance.get(this.authorization.langUri)
            console.log(JSON.stringify(fetchLang))
            if (fetchLang.data === 'zh') {
                this.lang = 'EN'
                localStorage.set('aid-language', 'zh-CN')
                this.$i18n.locale = 'zh-CN'
            } else if (fetchLang.data === 'en') {
                this.lang = 'ZH'
                localStorage.set('aid-language', 'en-US')
                this.$i18n.locale = 'en-US'
            }
            // this.$i18n.locale = language
            // this.lang = language === 'en-US' ?  'ZH' : 'EN'
            // 获取基础信息
            let baseInfo = sessionStorage.get('frame-base-info')
            if (baseInfo != null ){
              this.translateBaseInfo(baseInfo)
            } else {
              this.getBaseInfo();
            }
        },
        beforeMount(){
            this.getParentMenu()
            if (this.showMenu === '4'){
              this.getStaffMpMenue()
            }
        },
        mounted() {
          let that = this
          this.timer = setInterval(function(){
            that.getLocalTime();
          },1000)
            /* 设置 */
            this.$nextTick(() => {
                this.setInstance(this.instance)
                this.setAuthorization(this.authorization)
            })
            let clientWidth = document.body.clientWidth || document.body.offsetWidth
            that.clientWidth = clientWidth
            if (this.clientWidth < 1200) {
                this.openPosition = 'down'
            }
            if (that.clientWidth >= 1200 && !that.isOpen) {
                that.showMenu = false
            } else {
                that.showMenu = true
            }

            window.addEventListener('resize', () => {
                let clientWidth = document.body.clientWidth || document.body.offsetWidth
                that.clientWidth = clientWidth
                if (that.clientWidth < 1200) {
                    that.openPosition = 'down'
                }

                if (that.clientWidth >= 1200 && !that.isOpen) {
                    that.showMenu = false
                } else {
                    that.showMenu = true
                }
            })
        }
    }
</script>
<style lang="scss">
    @import './frame.scss';
</style>