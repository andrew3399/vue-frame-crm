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
                                    <router-link :to="{ path: getRouterLinkUrl(item1.menuUrl) }"
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
                                            <router-link :to="{ path: getRouterLinkUrl(item2.menuUrl)}"
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
                                                    <router-link :to="{ path: getRouterLinkUrl(item4.menuUrl) }"
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
                                                <router-link :to="{ path: getRouterLinkUrl(item3.menuUrl) }"
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
                                        <router-link :to="{ path: getRouterLinkUrl(item2.menuUrl) }"
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
                                <router-link :to="{ path: getRouterLinkUrl(item1.menuUrl) }"
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

            <div class="layout-nav navbar navbar-expand-lg bg-white align-items-center layout-nav--top"  v-if="showMenuHead === '1' || showMenuHead === '2'">
                <div class="row nav-row">
                    <div class="col col-1 nav-col">
                        <a href="javascript:;" class="d-xm-block thumb-icon" v-show="!showMenu">
                            <t-icon type="menu" class="text-xxl text-black" @click.native="openOrClose"></t-icon>
                        </a>
                        <slot name="frame-nav-left"></slot>
                    </div>
                    <div class="col col-11 nav-col nav-col--right">
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
                                        <span v-if="x=='0'">
                                            <t-icon type="clock">
                                            </t-icon><font color="#0085D0">HK</font>&nbsp&nbsp{{formRight.HKTime}}&nbsp&nbsp&nbsp
                                        </span>
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
                                                <span style="width: 80px;overflow: hidden;">{{formRight.staffName}}</span>
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
                                    <p class="notice__loading" v-if="notices != null && notices.length > 0 "><a href="javascript:;" target="_self"
                                                                  @click="loadingMore">{{$t('frame.loadingMore')}}</a>
                                    </p>
                                </t-tab-panel>
                            </t-tabs>
                        </slot>
                    </div>
                </div>
            </div>
            <div :class="[{'layout-main': showMenuHead !== '4'},{'hidenNavTop': showMenuHead === '5'},{'showMoreNav': showMenuHead === '4'}]">
                <div class="layout-main--content">
                    <!--
                        showMenuHead: 4  EIP集成隐藏菜单 头部信息
                                      5  隐藏菜单栏 头部信息
                    -->
                    <div class="bread-crumbs cmi-bread-crumbs-wrap" v-if="breadcrumbArr && showMenuHead !== '4' && showMenuHead !== '5'">
                        <div class="row ml-0 mr-0">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 pl-0">
                                <div class="breadcrumbs">
                                    <template v-for="(item, $idx) in breadcrumbArr" >
                                        <router-link :to="{ path: getRouterLinkUrl(item.menuUrl) }" class="canclick"
                                                v-if="item.rightTag === tag && $idx > 0 && $idx <= breadcrumbArr.length - 2 && item.menuUrl">
                                            <span> {{lang === 'EN' ? item.menuName : item.menuEnName}}</span>
                                            <span v-if="$idx <= breadcrumbArr.length - 2">></span>
                                        </router-link>
                                        <a  :key="$idx" v-else
                                            class="unclick"
                                            @click="($idx === breadcrumbArr.length - 1) && item.menuUrl ? '': changeToPage(item.menuUrl)">
                                            <span> {{lang === 'EN' ? item.menuName : item.menuEnName}}</span>
                                            <span v-if="$idx <= breadcrumbArr.length - 2">></span>
                                        </a>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- EIP 集成导航栏和菜单栏 -->
                    <div class="bg-white pt-10"  v-if="showMenuHead === '4'">
                        <div class="customer-tt-title pl-10">
                            <span class="eipBread">
                                {{staffMpMenuName}}
                            </span>
                        </div>
                         <div :class="{'customer-tt-table': mpTreeData && mpTreeData.length > 7,
                                    'customer-tt-table-low': mpTreeData && mpTreeData.length <= 7}"
                              v-if="mpType === '1'">
                            <ul class="menu" >
                                <li v-for="staffMenu in staffMpMenu.menulist" @click="changeStaffMpMenu(staffMenu.systemUrl,staffMenu.menuUrl)" :class="{'z-crttab':staffMenu.menuUrl === staffMpMenuUrl}">
                                    {{lang === 'EN'? staffMenu.menuName !== null && staffMenu.menuName !== '' ? staffMenu.menuName : staffMenu.menuEnName  : staffMenu.menuEnName}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="crm-wrapper" style="padding: 0 10px 15px!important;">
                        <div :class="{'customer-tt-table': mpTreeData && mpTreeData.length > 7,
                                        'customer-tt-table-low': mpTreeData && mpTreeData.length <= 7}"
                             v-if="mpType === '2' && mpTreeData && mpTreeData.length">
                            <ul class="menu_eip ">
                                <!-- 在这里判断 -->
                                <template  v-for="item in musterMenuList">
                                    <li :class="{'z-crttab':item.url === $route.path}"
                                              :key="item.menuId" @click="selectMpMenu(item.url + ';' + item.url,lang === 'EN' ? ' > '+item.menuName : ' > '+item.menuEnName,authMenuList.indexOf(item.menuId)>-1?false:true)"
                                              v-if="!item.childMenu || item.childMenu.length < 0">
                                        <svg class="icon glyph-icon" aria-hidden="true">
                                            <use :xlink:href="item.menuIcon"></use>
                                        </svg>
                                        <span class="glyph-name">{{lang === 'EN' ? item.menuName : item.menuEnName}}</span>
                                        <i class="glygh-line"></i>
                                    </li>
                                    <!-- 有二级的菜单 -->
                                    <li else :class="{'z-crttab':item.menuUrl === $route.path}" :key="item.menuId">
                                        <t-dropdown placement="bottom" style="width: 100%;" v-on:on-visible-change="dropDownIconChange">
                                            <div class="menu__submenu-title" >
                                                <svg class="icon glyph-icon" aria-hidden="true">
                                                    <use :xlink:href="item.menuIcon"></use>
                                                </svg>

                                                <span class="glyph-name">{{lang === 'EN' ? item.menuName : item.menuEnName}}</span>
                                                <i class="glygh-line"></i>
                                            </div>
                                            <t-dropdown-menu slot="list" >
                                                <t-dropdown-item  v-for="staffMenu in item.childMenu" :key="staffMenu.menuId"
                                                                  v-on:on-click="selectMpMenu(staffMenu.url + ';' + staffMenu.url,
                                                                                            lang === 'EN' ? ' > ' + item.menuName +  ' > ' + staffMenu.menuName
                                                                                                          : ' > ' + item.menuEnName +  ' > ' + staffMenu.menuEnName,authMenuList.indexOf(staffMenu.menuId)>-1?false:true)"
                                                                  :selected="staffMenu.url === $route.path"
                                                                  divided
                                                                  :name="staffMenu.url + ';' + staffMenu.url" :value="staffMenu.url" :disabled="authMenuList.indexOf(staffMenu.menuId)>-1?false:true">
                                                    {{lang === 'EN' ? staffMenu.menuName : staffMenu.menuEnName}}
                                                </t-dropdown-item>
                                            </t-dropdown-menu>
                                        </t-dropdown>
                                    </li>
                                    <!-- 有二级的菜单 -->
                                </template>
                            </ul>
                        </div>
                    </div>
                    <router-view v-if="!isIframeContent" class="pt-10"></router-view>
                    <iframe v-if="isIframeContent" class="pt-10" :width="clientWidth" height="1000" :src="iframeUrl" frameborder="0"></iframe>
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
    import {transData, getQueryData, getQuery, uuid, translateMpMenuData, transDataToJson} from '../utils/utils.js'
    import * as Constant from '../store/constant.js'
    import {mapMutations, mapState} from 'vuex'
    import {Base64} from 'js-base64'
    import QueryString from 'query-string'
    // import EventHub from '../eventHub'
    let sessionStorage = window.sessionStorage
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
                musterMenuList:[],
                authMenuList:[],
                formRight:{
                    staffName: '',
                    staffNo: '',
                    HKTime:'',
                },
                dropDownIcon:'chevron-down',
                isOpen: true,
                isOpenOnMinWin: true,
                openPosition: 'down',
                clientWidth: 1200,
                showMenu: true,
                needBackDrop: false,
                hideSlip: true,
                hideSlideWrapSlip: true,
                isIframeContent: false,
                iframeUrl: '',
              staffMpMenuUrl: '',
                accordion: true,
                isActive: 0,
                translateMenu:[],
                menu: [],
                count: 10,
                notices: [],
                queryActiveMenu: '',
                queryOpenName: [],
                lang: 'EN',
                tabs: 'tab-1',
                scheduleTime: 0,
                staffMpMenu:{
                   mpNameus: '',
                   mpNamecn: '',
                   menulist: []
                },
                tempStaffMpMenuName: '',
                staffMenuFuncMap: {},
                mpType:'1',
                translateMpMenuMap:{}
            }
        },
        computed: {
            staffMpMenuName(){
               return  this.lang === 'EN' ? this.staffMpMenu.mpNamecn : this.staffMpMenu.mpNameus
            },
            mpTreeData(){
              return this.staffMpMenu.menulist
            },
            breadcrumbArr(){
                debugger
                return this.$store.state.storeModule.breadcrumbArr
            },
            treeData() {
                 if (this.translateMenu && this.translateMenu.length) {
                    return this.translateMenu
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
            this.getParentMenu()
            // 判断跳转过来的路由信息上面是否有mpType
            if (to.query.mpType && to.query.mpType !== ''){
              this.mpType = to.query.mpType
            } else {
              this.mpType = '1'
            }
            this.staffMpMenu.menulist = []
            console.log('watch  $route:' + to.query.showMenuHead )
            if (this.mpType && this.mpType === '2' && (!to.query.showMenuHead ||to.query.showMenuHead !== '4')) {
              //解析菜单对应的MENU信息
              let frameBaseInfo = JSON.parse(sessionStorage.getItem('frame-base-info'))
              if (frameBaseInfo && frameBaseInfo !== '' && frameBaseInfo.staffMenue){
                let menuListInfo = frameBaseInfo.staffMenue
                this.translateMpMenuMap = translateMpMenuData(menuListInfo, 'menuId', 'menuPid', 'children', 'menuOrder')
                let menuId = this.$route.query.menuId
                this.staffMpMenu.menulist = this.translateMpMenuMap[menuId ]
              }
            } else if(to.query.showMenuHead && to.query.showMenuHead === '4'){
              this.getStaffMpMenue()
            }
          }
        },
        methods: {
          getMusterMenu(){
              let that = this
              this.instance.post(this.authorization.getMusterMenu,{}).then(res=>{
                  let resData = res.data.result;
                  that.musterMenuList = resData
              })
          },
          dropDownIconChange(visible){
            if (visible){
              this.dropDownIcon = "chevron-up"
            } else {
              this.dropDownIcon = "chevron-down"
            }
          },
          getRouterLinkUrl(url){
            if(url.indexOf('?') > 0){
               return url + '&apMenu=1'
            } else {
              return url + '?apMenu=1'
            }
          },
          selectMpMenu(url,mpMenuName,authorizaFlag){
              if(authorizaFlag){
                  return
              }
            if (url === null || url === undefined
              || url === '' || url.indexOf(';') < 0){
              return;
            }

            if (this.lang === 'EN'){
              this.staffMpMenu.mpNamecn = this.tempStaffMpMenuName + mpMenuName
            } else {
              this.staffMpMenu.mpNameus = this.tempStaffMpMenuName + mpMenuName
            }
            console.log('selectMpMenu:' + url)
            let urlInfoArray = url.split(';')
            let systemUrl = urlInfoArray[0]
            let menuUrl = urlInfoArray[1]
            if (menuUrl.indexOf('?') > -1){
              if(menuUrl.indexOf('mpType=') < 0 && this.$route.query.mpType){
                menuUrl = menuUrl + '&mpType=' + this.$route.query.mpType
              }
              if (menuUrl.indexOf('menuId=') < 0 && this.$route.query.menuId){
                menuUrl = menuUrl + '&menuId=' + this.$route.query.menuId
              }
            } else {
              menuUrl = menuUrl + '?mpType=' + this.$route.query.mpType + '&menuId=' + this.$route.query.menuId
            }
            this.changeStaffMpMenu(systemUrl,menuUrl)
          },
          getClientWidth(){
            let clientWidth = document.body.clientWidth || document.body.offsetWidth
            return clientWidth
          },
          setIframeHeight(iframe) {
            if (iframe) {
              var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
              if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
              }
            }
          },
          getBaseInfo(){
            let that = this
              if (this.authorization !== undefined && this.authorization.baseInfoUrl !== undefined
                && this.authorization.baseInfoUrl !== '') {
              this.instance.post(this.authorization.baseInfoUrl,{}).then(res=>{
                let resData = res.data;
                sessionStorage.setItem('frame-base-info',JSON.stringify(resData))
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
              this.translateMenuInfo(this.menu);
              this.formRight.staffName = resData.staffName
              this.formRight.staffNO = resData.staffNo
              this.staffMenuFuncMap = resData.staffMenuFunsMap
              let authMenuList = []
              this.menu.filter(item=>{
                  if(item.menuId){
                      authMenuList.push(item.menuId.toString())
                  }
              })

              sessionStorage.setItem('musterMenuList',authMenuList)

          },
          changeStaffMpMenu(systemUrl,url){
            console.log('changeStaffMpMenu:  ' + url)
            this.staffMpMenuUrl = url
            if (url.indexOf('showMenuHead=') === -1 && this.$route.query.showMenuHead){
              if (url.indexOf('?') > -1){
                url = url + "&showMenuHead=" + this.$route.query.showMenuHead
              } else{
                url = url + "?showMenuHead=" + this.$route.query.showMenuHead
              }
            }
            if(this.mpId && this.mpId !== '' && url.indexOf('mpId') === -1 && this.$route.query.mpId){
              url = url + "&mpId=" + this.mpId
            }
            let routePath = this.$route.matched[0].path
            //RAP路径信息
            let rapPathStart = '.jsp';
            if (url.indexOf(rapPathStart) < 0){
              if (url.indexOf(routePath) === -1){
                this.changeToPage(systemUrl + url)
              } else {
                this.$router.push(url)
              }
            } else {
              let aidLanguage = localStorage.get('aid-language');
              if (aidLanguage === 'en-US'){
                aidLanguage = 'en'
              } else if (aidLanguage === 'zh-CN'){
                aidLanguage = 'zh_CN'
              }
              this.isIframeContent = true
              if (url.indexOf('?') > -1 ){
                this.iframeUrl = systemUrl + url + '&lang=' + aidLanguage;
              } else {
                this.iframeUrl = systemUrl + url + '?lang=' + aidLanguage;
              }
              let loginUserName = sessionStorage.getItem('loginUserName')
              if (loginUserName && loginUserName !== '' && this.iframeUrl.indexOf('loginUser=') < 0){
                if (this.iframeUrl.indexOf('?') > -1) {
                  this.iframeUrl = this.iframeUrl + '&loginUser='+loginUserName
                } else {
                  this.iframeUrl = this.iframeUrl + '?loginUser='+loginUserName
                }
              }
            }
          },
          //ESOP集成涉及的菜单列表信息获取
          getStaffMpMenue(){
            let that = this
            console.log('===================  getStaffMpMenue ==============')
            console.log(this.$route)
            console.log('===================  getStaffMpMenue end ==============')
            let routePath = this.$route.path
            let pathParams = this.$route.query
            if (pathParams != null && pathParams !== '' && pathParams.mpId !== undefined
                && pathParams.mpId != null && pathParams.mpId !== ''
                && this.authorization.getStaffMpMenue !== undefined){
               this.mpId = pathParams.mpId
              this.instance.post(this.authorization.getStaffMpMenue,{
                mpId: pathParams.mpId
              }).then(function(ret){
                if (ret.status === 200 && ret.data != null && that.mpType === '1'){
                  that.$store.state.storeModule.staffMpMenu = ret.data
                  that.staffMpMenu = ret.data
                  let menuList = ret.data.menulist
                  that.translateMpMenu(menuList)
                } else if(ret.status === 200 && ret.data != null && that.mpType === '2'){
                  that.$store.state.storeModule.staffMpMenu = ret.data
                  that.staffMpMenu = ret.data
                  that.tempStaffMpMenuName = that.lang === 'EN' ? that.staffMpMenu.mpNamecn : that.staffMpMenu.mpNameus
                  if (that.showMenuHead === '4'){
                    let routePath = that.$route.path
                    let menuJson = transDataToJson(ret.data.menulist, 'menuId')
                    let menuInfo = menuJson[routePath]
                    if (menuInfo === null || menuInfo === undefined){
                      let fullPath = that.$route.fullPath
                      menuInfo = menuJson[fullPath]
                      if (menuInfo === null || menuInfo === undefined){
                        fullPath = fullPath.replace(/[?,&]{0,}apMenu=\w*/g, '');
                        fullPath = fullPath.replace(/[?,&]{0,}acd=\w*/g, '');
                        fullPath = fullPath.replace(/[?,&]{0,}code=\w*/g, '');
                        fullPath = fullPath.replace(/[?,&]{0,}state=\w*/g, '');
                        fullPath = fullPath.replace(/[?,&]{0,}mpType=\w*/g, '');
                        fullPath = fullPath.replace(/[?,&]{0,}menuId=\w*/g, '');
                        fullPath = fullPath.replace(/[?,&]{0,}showMenuHead=\w*/g, '');
                        fullPath = fullPath.replace(/[?,&]{0,}mpId=\w*/g, '');
                        console.log('fullPath:' + fullPath)
                        menuInfo = menuJson[fullPath]
                      }
                    }
                    let parentMenuInfo = {}
                    if (menuInfo && menuInfo.menuPid){
                      let menuPid = menuInfo.menuPid
                      parentMenuInfo = menuJson[menuPid]
                    }
                    if (that.lang === 'EN'){
                      if (parentMenuInfo && parentMenuInfo.menuName){
                        that.staffMpMenu.mpNamecn = that.tempStaffMpMenuName + ' > ' + parentMenuInfo.menuName
                        if (menuInfo && menuInfo.menuName){
                          that.staffMpMenu.mpNamecn = that.staffMpMenu.mpNamecn + ' > ' + menuInfo.menuName
                        }
                      } else if (menuInfo &&  menuInfo.menuName){
                        that.staffMpMenu.mpNamecn = that.tempStaffMpMenuName + ' > ' + menuInfo.menuName
                      }
                    } else {
                      if (parentMenuInfo && parentMenuInfo.menuEnName){
                        that.staffMpMenu.mpNameus = that.tempStaffMpMenuName + ' > ' + parentMenuInfo.menuEnName
                        if (menuInfo && menuInfo.menuEnName){
                          that.staffMpMenu.mpNameus =  that.staffMpMenu.mpNameus + ' > ' + menuInfo.menuEnName
                        }
                      }else if (menuInfo && menuInfo.menuEnName){
                        that.staffMpMenu.mpNameus = that.tempStaffMpMenuName + ' > ' + menuInfo.menuEnName
                      }
                    }
                  }
                  that.translateMpMenuMap = translateMpMenuData(ret.data.menulist, 'menuId', 'menuPid', 'children', 'menuOrder')
                  let menuId = that.$route.query.menuId
                  that.staffMpMenu.menulist = that.translateMpMenuMap[menuId]
                }
              }).catch(function(e){
                console.error(e)
              })
            }
          },
          translateMpMenu(menuList){
            let that = this;
            let routePath = this.$route.path
            if (menuList !== null && menuList.length > 0) {
              let staffMpMenuList = new Array();
              for(let i = 0; i < menuList.length; i++){
                staffMpMenuList.push(menuList[i].menuUrl)
              }
              let defaultMenu = menuList[0]
              let menuUrl = defaultMenu.menuUrl
              if (staffMpMenuList.indexOf(routePath) < 0 && menuUrl.indexOf('.jsp') > 0){
                that.changeStaffMpMenu(defaultMenu.systemUrl,menuUrl)
              }
            }
          },
          getParentMenu(){
            let that  = this
            let frameBaseInfo = JSON.parse(sessionStorage.getItem('frame-base-info'))
            this.instance.post(this.authorization.parentMenuUri, {
              url: this.$route.fullPath,
              params: this.$route.params
            }).then(function (ret) {
              if (ret.data && ret.data.success && ret.data.result && ret.data.result.length > 0) {
                that.translateParentMenu(frameBaseInfo, ret.data.result)
                that.$store.state.storeModule.breadcrumbArr = []
                that.$store.state.storeModule.breadcrumbArr = ret.data.result
              } else {
                let fullPath = that.$route.fullPath
                fullPath = fullPath.replace(/[?,&]{0,}apMenu=\w*/g, '');
                fullPath = fullPath.replace(/[?,&]{0,}acd=\w*/g, '');
                fullPath = fullPath.replace(/[?,&]{0,}code=\w*/g, '');
                fullPath = fullPath.replace(/[?,&]{0,}state=\w*/g, '');
                fullPath = fullPath.replace(/[?,&]{0,}mpType=\w*/g, '');
                fullPath = fullPath.replace(/[?,&]{0,}menuId=\w*/g, '');
                that.instance.post(that.authorization.parentMenuUri, {
                  url: fullPath,
                  params: that.$route.params
                }).then(function (ret) {
                  if (ret.data && ret.data.success && ret.data.result && ret.data.result.length > 0) {
                    that.translateParentMenu(frameBaseInfo, ret.data.result)
                    that.$store.state.storeModule.breadcrumbArr = []
                    that.$store.state.storeModule.breadcrumbArr = ret.data.result
                  } else {
                    that.instance.post(that.authorization.parentMenuUri, {
                      url: that.$route.path,
                      params: that.$route.params
                    }).then(function (ret) {
                      if (ret.data && ret.data.success && ret.data.result && ret.data.result.length > 0) {
                        that.translateParentMenu(frameBaseInfo, ret.data.result)
                        that.$store.state.storeModule.breadcrumbArr = []
                        that.$store.state.storeModule.breadcrumbArr = ret.data.result
                      }
                    })
                  }
                })
              }
            })
          },
          translateParentMenu(frameBaseInfo,parthMenuArray){
            let that = this
            that.$store.state.storeModule.staffMenuFunc = []
            let currentMenu = parthMenuArray[parthMenuArray.length - 1]
            if (frameBaseInfo && frameBaseInfo != null && frameBaseInfo.staffMenuFunsMap != null
              && frameBaseInfo.staffMenuFunsMap !== undefined){
              that.$store.state.storeModule.staffMenuFunc = frameBaseInfo.staffMenuFunsMap[currentMenu.menuId]
            }
            if (that.$store.state.storeModule.staffMenuFunc !== undefined && that.$store.state.storeModule.staffMenuFunc.length <= 0){
              that.instance.post(that.authorization.getStaffMenuFunc, {
                menuId: currentMenu.menuId
              }).then(function (res) {
                if (res != null && res !== '') {
                  that.$store.state.storeModule.staffMenuFunc = res.data
                }
              })
            }
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
                sessionStorage.removeItem('frame-base-info')
                sessionStorage.clear()
                localStorage.remove('access_token')
                localStorage.remove('refresh_token')
                localStorage.remove('session_time')
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
                this.getbulletinListCb()
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
                    language = 'en-US'
                } else if (this.lang === 'ZH') {
                    language = 'zh-CN'
                }
                localStorage.set('aid-language', language)
                this.$i18n.locale = language
                this.instance.post(this.authorization.changeLangUri, {
                    language: this.lang
                }).then(res => {
                    window.location.reload()
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
                if (url.indexOf('?') > -1){
                  url = url + '&apMenu=1'
                } else {
                  url = url + '?apMenu=1'
                }
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
                if (url === '' || url === undefined ){
                  return;
                }
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
              let frameBaseInfo = JSON.parse(sessionStorage.getItem('frame-base-info'))
              if (frameBaseInfo != null && frameBaseInfo != ''){
                let menuListInfo = frameBaseInfo.staffMenue
                that.translateMenuInfo(menuListInfo);
              }else{
                that.getBaseInfo()
              }

            },
            translateMenuInfo(res){
              if (res === null || res === undefined){
                this.makeAlert(this.$t('frame.warning'));
                return;
              }
              /**
               * 先找出这一条数据，并将其 menuName 组成一个数组
               */
              this.translateMenu = transData(res, 'menuId', 'menuPid', 'children', 'menuOrder')
              this.translateMpMenuMap = translateMpMenuData(res, 'menuId', 'menuPid', 'children', 'menuOrder')
              let menuId = this.$route.query.menuId
              this.staffMpMenu.menulist = this.translateMpMenuMap[menuId ]
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
              /**
               * 将所有的菜单权限信息保存到sessionStorage当中
               */
               let authorMenuArray = new Array();
              authorMenuArray = JSON.parse(sessionStorage.getItem("authorMenuArray"))
              if (authorMenuArray == null || authorMenuArray.length < 0){
                authorMenuArray = new Array();
                for (let i = 0; i < res.length; i++){
                  let menu = res[i];
                  if(menu != null && menu.menuUrl !== null
                    && menu.menuUrl !== undefined && menu.menuUrl !== ''){
                    authorMenuArray.push(menu.menuUrl)
                  }
                }
                sessionStorage.setItem("authorMenuArray",JSON.stringify((authorMenuArray)))
              }
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
          //禁止页面右键点击
          document.oncontextmenu = function(){
            return false;
          }
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

            // 设置语言信息
            let fetchLang = await this.instance.get(this.authorization.langUri)
            console.log(' ====================  loginLanguage ==================')
            console.log(JSON.stringify(fetchLang))
          console.log(' ====================  loginLanguage  END ==================')
            if (fetchLang.data.toLowerCase() === 'zh' || fetchLang.data.toLowerCase() === 'zh-cn') {
                this.lang = 'EN'
                localStorage.set('aid-language', 'zh-CN')
                this.$i18n.locale = 'zh-CN'
            } else {
                this.lang = 'ZH'
                localStorage.set('aid-language', 'en-US')
                this.$i18n.locale = 'en-US'
            }
            console.log('lang: ' + this.lang)
            // this.$i18n.locale = language
            // this.lang = language === 'en-US' ?  'ZH' : 'EN'
            // 获取基础信息
          if (this.showMenuHead && this.showMenuHead !== '5'){
            let baseInfo = JSON.parse(sessionStorage.getItem('frame-base-info'))
            if (baseInfo != null ){
              this.translateBaseInfo(baseInfo)
            } else {
              this.getBaseInfo();
            }
          }
          let routeQuery = this.$route.query
          if (routeQuery.mpType && routeQuery.mpType !== ''){
              this.mpType = routeQuery.mpType
          }

          this.authMenuList = sessionStorage.getItem('musterMenuList')
          this.getMusterMenu()
        },
        beforeMount(){
            this.getParentMenu()
            console.log('showMenuHead:' + this.showMenuHead)
            if (this.showMenuHead === '4'){
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
            let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            that.clientWidth = clientWidth
            if (this.clientWidth < 1200) {
                this.openPosition = 'down'
            }
            if (that.clientWidth >= 1200 && !that.isOpen) {
                that.showMenu = false
            } else {
                that.showMenu = true
            }
            if (this.showMenuHead === '4'){
              this.staffMpMenuUrl = this.$router.history.current.path
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