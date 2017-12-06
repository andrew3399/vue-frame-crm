<template>
	<div class="layout layout--one-screen bg-gray-lightest-5">
		<div :class="['menu-backdrop d-xl-none',{'show': isOpenOnMinWin === false}]" @click="closeMenuOnMinWin"></div>
		<div :class="['layout-sidebar',{'layout-sidebar--folded': isOpen === false},{'show': isOpenOnMinWin === false}]">
			<div class="layout-logo-left">
				<slot name="frame-header">
					<span v-if="logoRouter">
						<router-link :to="logoRouter">
			        <img :src="img" alt="" class="layout-logo-img"/>
			        <img :src="imgMin" alt="" class="layout-logo-min-img"/>
		        </router-link>
					</span>
					<span v-else>
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
										<t-icon :type="item1.iconType" v-if="item1.iconType"></t-icon>
										<t-avatar size="sm" bg-state="success" :text="item1.rightTag" :dot="false" v-else></t-avatar>
						        <router-link :to="{ path: item1.menuUrl }" v-if="item1.rightTag === tag">
				            	<span class="sub-text">{{item1.menuName}}</span>
						        </router-link>
						        <a :href="item1.systemUrl + item1.menuUrl" target="_self" v-else-if="item1.systemUrl && item1.menuUrl && item1.rightTag !== tag">
						        	<span class="sub-text">{{item1.menuName}}</span>
						        </a>
						        <span class="sub-text" v-else>{{item1.menuName}}</span>
				          </template>
									<template v-for="(item2, y) in item1.children">
										<t-submenu v-if="item2.children && item2.children.length" :name="item2.menuName" class="second-submenu">
											<template slot="title">
					            	<router-link :to="{ path: item2.menuUrl}" v-if="item2.rightTag === tag">
						            	<span class="sub-text">{{item2.menuName}}</span>
								        </router-link>
								        <a :href="item2.systemUrl + item2.menuUrl" target="_self" v-else-if="item2.systemUrl && item2.menuUrl && item2.rightTag !== tag">
								        	<span class="sub-text">{{item2.menuName}}</span>
								        </a>
								        <span class="sub-text" v-else>{{item2.menuName}}</span>
					            </template>
					            <template v-for="(item3, z) in item2.children">
					            	<t-submenu v-if="item3.children && item3.children.length" :name="item3.menuName" :id="x + '' +y" class="second-submenu">
					            		<t-menu-item v-for="(item4, w) in item3.children" :name="item4.menuName" :key="w" @click.native="getMenu(item4)" class="sec-item">
							            	<router-link :to="{ path: item4.menuUrl }" v-if="item4.rightTag === tag">
								            	<span class="sub-text">{{item4.menuName}}</span>
										        </router-link>
										        <a :href="item4.systemUrl + item4.menuUrl" target="_self" v-else-if="item4.systemUrl && item4.menuUrl && item4.rightTag !== tag">
										        	<span class="sub-text">{{item4.menuName}}</span>
										        </a>
										        <span class="sub-text" v-else>{{item4.menuName}}</span>
							            </t-menu-item>
					            	</t-submenu>
						            <t-menu-item :name="item3.menuName" :key="z" @click.native="getMenu(item3)" class="sec-item" v-else>
						            	<router-link :to="{ path: item3.menuUrl }" v-if="item3.rightTag === tag">
							            	<span class="sub-text">{{item3.menuName}}</span>
									        </router-link>
									        <a :href="item3.systemUrl + item3.menuUrl" target="_self" v-else-if="item3.systemUrl && item3.menuUrl && item3.rightTag !== tag">
									        	<span class="sub-text">{{item3.menuName}}</span>
									        </a>
									        <span class="sub-text" v-else>{{item3.menuName}}</span>
						            </t-menu-item>
					            </template>
										</t-submenu>
										<t-menu-item :name="item2.menuName" v-else>
											<router-link :to="{ path: item2.menuUrl }" v-if="item2.rightTag === tag">
					            	<span class="sub-text">{{item2.menuName}}</span>
							        </router-link>
							        <a :href="item2.systemUrl + item2.menuUrl" target="_self" v-else-if="item2.systemUrl && item2.menuUrl && item2.rightTag !== tag">
							        	<span class="sub-text">{{item2.menuName}}</span>
							        </a>
							        <span class="sub-text" v-else>{{item2.menuName}}</span>
										</t-menu-item>
									</template>
								</t-submenu>
								<t-menu-item :name="item1.menuName" v-else>
									<t-icon :type="item1.iconType" v-if="item1.iconType"></t-icon>
									<t-avatar size="sm" bg-state="success" :text="item1.rightTag" :dot="false" v-else></t-avatar>
					        <router-link :to="{ path: item1.menuUrl }" v-if="item1.rightTag === tag">
			            	<span class="sub-text">{{item1.menuName}}</span>
					        </router-link>
					        <a :href="item1.systemUrl + item1.menuUrl" target="_self" v-else-if="item1.systemUrl && item1.menuUrl && item1.rightTag !== tag">
					        	<span class="sub-text">{{item1.menuName}}</span>
					        </a>
					        <span class="sub-text" v-else>{{item1.menuName}}</span>
								</t-menu-item>
							</template>
			    </t-menu>
				</slot>
			</div>
    </div>
    <div class="layout-content">
    	<div class="layout-nav navbar navbar-expand-lg bg-white align-items-center layout-nav--top">
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
										<t-menu-item v-for="(item1, index) in item.children" :key="index + 'item'" :name="x + '' + index">
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
					        		<a href="javascript:;" target="_self" v-if="item.handleType && item.handleType === 'logout'" @click="handleLogout(item)">
						        		<t-icon :type="item.icon" v-if="item.icon"></t-icon>
								        <span class="sub-text" v-if="item.name">{{item.name}}</span>
								      </a>
								      <span v-else>
								      	<t-icon :type="item.icon" v-if="item.icon"></t-icon>
								        <span class="sub-text" v-if="item.name">{{item.name}}</span>
								      </span>
					        	</template>
		    					</t-menu-item>
		    				</template>
		    			</t-menu>
		    		</slot>
		    		<t-button type="outline-secondary" size="sm" class="btn-lang" @click="handleChangeLang">{{lang}}</t-button>
					</div>
				</div>
    	</div>
    	<div class="slipbox__container" v-clickout-side="handleClickoutSide">
	    	<div class="slipbox__content" :class="[{'close': hideSlip}]">
	    		<div class="slipbox__close" @click="hideSlipbox">
	    			<a href="javascript:;" target="_self"><t-icon type="close"></t-icon></a>
	    		</div>
	    		<div class="slipbox__body">
	    			<slot name="slipbox-body">
			    		<t-tabs>
					      <t-tab-panel :label="$t('frame.sysInform')" name="tab-1">
					      	<div class="notice-wrap" v-for="(item, index) in notices" :class="{'notice-active': isActive === index}" @click="handleNoticeClick(index, item)">
					      		<span class="nw-l"><t-tag state="info">info</t-tag></span>
									  <span class="nw-r">
										  <p class="nw-r-title">{{item.bulletinTitle}}</p>
										  <p class="nw-r-time">有效周期：{{item.activeTime | format}} 至 {{item.inactiveTime | format}}</p>
									  </span>
					      	</div>
								  <!-- <div class="notice-wrap" :class="{'notice-active': isActive === 0}" @click="handleNoticeClick(0)" style="margin-top:6px;">
									  <span class="nw-l"><t-tag state='danger'>hot</t-tag></span>
									  <span class="nw-r">
										  <p class="nw-r-title">缴纳0元租赁使用高清电视机顶盒一台缴纳0元租赁使用高清电视机顶盒一台</p>
										  <p class="nw-r-time">有效周期：2017-09-09 至 2020-09-09</p>
									  </span>
								  </div>
								  <div class="notice-wrap" :class="{'notice-active': isActive === 1}" @click="handleNoticeClick(1)">
									  <span class="nw-l"><t-tag state="info">info</t-tag></span>
									  <span class="nw-r">
										  <p class="nw-r-title">缴纳0元租赁使用高清电视机顶盒一台缴纳0元租赁使用高清电视机顶盒一台</p>
										  <p class="nw-r-time">有效周期：2017-09-09 至 2020-09-09</p>
									  </span>
								  </div>
								  <div class="notice-wrap" :class="{'notice-active': isActive === 2}" @click="handleNoticeClick(2)">
									  <span class="nw-l"><t-tag state='success'>new</t-tag></span>
									  <span class="nw-r">
										  <p class="nw-r-title">缴纳0元租赁使用高清电视机顶盒一台缴纳0元租赁使用高清电视机顶盒一台</p>
										  <p class="nw-r-time">有效周期：2017-09-09 至 2020-09-09</p>
									  </span>
								  </div> -->
								  <p class="notice__loading"><a href="javascript:;" target="_self"  @click="loadingMore">{{$t('frame.loadingMore')}}</a></p>
							  </t-tab-panel>
					    </t-tabs>
					  </slot>
	    		</div>
	    	</div>
    	</div>
    	<div class="layout-main">
    		<div class="layout-main--content">
        	<router-view></router-view>
	        <div class="pager-footer">
	        	<p>©️ 2017 China Mobile International Limited. All rights reserved.</p>
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
	import { transData, getQueryData } from '../utils/utils.js'
	import * as Constant from '../store/constant.js'
	import { mapMutations } from 'vuex'
	let sessionStorage = new SessionStorage ()
	let localStorage = new LocalStorage()
	export default {
		name: 'TFrame',
		props: {
			img: {
				type: String
			},
			imgMin: {
				type: String
			},
			// logo 路由
			logoRouter: {
				type: Object,
				default: () => {
					return {
						path: '/'
					}
				}
			},
			// 当前展开的menu
			activeMenu: {
				type: [ String, Number ]
			},
			openNames: {
				type: [ Array ]
			},
			/**
			 * 渲染menu菜单
			 * {
			 * 	iconType, 一级菜单的右侧icon的type，对应的是aidesign的图标库
			 * 	name, 当前菜单的名称
			 * 	path, 路由的path对象
			 * 	link  非本项目的链接
			 * }
			 */
			menuList: {
				type: Array,
				default: []
			},
			/**
			 * 渲染头部menu
			 * {
			 * 	type, 'icon'| 'dropdown' | 'avatar'
			 * 	icon, 图标icon的type，对应的是aidesign的图标库
			 * 	children, 如果是dropdown时需要提供dropdownitem
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
		data () {
			return {
				isOpen: true,
				isOpenOnMinWin: true,
				openPosition: 'down',
				clientWidth: 1200,
				showMenu: true,
				needBackDrop: false,
				hideSlip: true,
				hideSlideWrapSlip:true,
				accordion: true,
				isActive: 0,
        menu: [],
        count: 10,
        notices: [],
        queryActiveMenu: '',
        queryOpenName: [],
        lang: 'EN'
			}
		},
		computed: {
			treeData () {
				if (this.menuList && this.menuList.length) {
					return this.menuList
				} else if (this.menu && this.menu.length) {
					return this.menu
				}
				return []
			},
			ins () {
				this.setInstance(this.instance)
				return this.instance
			},
			auth () {
				this.setAuthorization(this.authorization)
				return this.authorization
			}
		},
		directives: {
			ClickoutSide
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

				return Format('yyyy/MM/dd')
			}
		},
		methods: {
			/* 消息点击触发 */
			handleNoticeClick (index, item) {
				this.isActive = index
				// this.hideSlideWrapSlip = false
				this.hideSlip = true
				this.$router.push({ path: `/notice/${item.bulletinId}` })
				// this.$router.push({ path: '/notice', query: { bulletinId: item.bulletinId } })
			},
			/* 加载更多 */
			loadingMore () {
				this.hideSlip = true
				this.$router.push({path: '/'})
			},
			handleClickClose(){
				this.hideSlideWrapSlip = true
			},
			/* 点击图标触发 */
			handleLogout (item) {
				if (item && item.handleType && item.handleType === 'logout') {
					/* 登出 */
					sessionStorage.remove('access_token')
					sessionStorage.remove('refresh_token')
					sessionStorage.remove('MVNO_KEY_TIMEOUT_MAP')
				}
				window.location.href = this.authorization.logout_uri
			},
			closeMenuOnMinWin () {
				this.isOpenOnMinWin = true
			},
			openOrClose () {
				this.isOpen = !this.isOpen
				this.isOpenOnMinWin = false
				if (this.clientWidth >= 1200 && !this.isOpen) {
					this.openPosition = 'right'
				} else {
					this.openPosition = 'down'
				}

				if (this.clientWidth >= 1200 && !this.isOpen) {
					this.showMenu = false
				} else {
					this.showMenu = true
				}
			},
			hdMenuClick (name) {
				this.$emit('menu-click', name)
			},
			handleNavSelect (name) {
				this.$emit('nav-menu-click', name)
			},
			getMenu (item) {
				this.$emit('on-click', item)
			},
			showSlipbox () {
				this.hideSlip = false
			},
			hideSlipbox () {
				this.hideSlip = true
			},
			_ischild (child) {
	      while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
	        if (child === this.$el) {
	          return true
	        }
	        child = child.parentNode
	      }
	      return false
	    },
	    _isChildNode (child, parent) {
	      while (child !== undefined && child !== null && child.tagName.toUpperCase() !== 'BODY') {
	        if (child === this.$el.getElementsByClassName(parent)[0]) {
	          return true
	        }
	        child = child.parentNode
	      }
	      return false
	    },
			handleClickoutSide (e) {
				if (this._ischild(e.target) && (!e.target.classList.contains('slipbox__content') || !this._isChildNode(e.target, 'slipbox__content')) && !this._isChildNode(e.target, 'slide-wrap-content')) {
					this.hideSlipbox()
					return true
				}
				return false
			},
			handleChangeLang () {
				if (this.lang === 'EN') {
					this.lang = 'CN'
					localStorage.set('aid-language', 'en-US')
					this.$i18n.locale = 'en-US'
				} else if (this.lang === 'CN') {
					this.lang = 'EN'
					localStorage.set('aid-language', 'zh-CN')
					this.$i18n.locale = 'zh-CN'
				}
				// 获取menu数据
				this.instance.get(this.authorization.menuUri, {
					params: {
						language: this.lang === 'CN' ? 'en' : 'cn'
					}
				}).then(res => {
					this.menu = transData(res.data, 'menuId', 'menuPid', 'children')
				}).catch(res => {
					/**
					 * 处理相关错误的问题
					 */
					if (res) {
				    switch (res.status) {
				      /**
				      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
				      */
				      case 401:
				      	let accessToken = sessionStorage.get('access_token')
					  		let refreshToken = sessionStorage.get('refresh_token')
					  		if (!accessToken || !refreshToken) return
				        let msg = {
				          client_id: this.authorization.client_id,
				          redirect_uri: encodeURIComponent(this.authorization.redirect_uri),
				          state: uuid(6, 16)
				        }
				        window.location.href = this.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
				        break
				    }
				  }
				})
			},
			...mapMutations([
				'setInstance',
				'setAuthorization'
			])
		},
		async created () {
			// let menu = [
			// 	{
			// 	    "menuId": 20,
			// 	    "menuName": "Accounting Manage",
			// 	    "menuDesc": null,
			// 	    "menuPid": -1,
			// 	    "menuPidName": null,
			// 	    "menuType": "0",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": null,
			// 	    "menuPic": null,
			// 	    "rightTag": "ACCT",
			// 	    "systemId": "11009",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48069"
			// 	},
			// 	{
			// 	    "menuId": 1703,
			// 	    "menuName": "Batch Query",
			// 	    "menuDesc": null,
			// 	    "menuPid": 17,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-inquery",
			// 	    "menuPic": null,
			// 	    "rightTag": "ORD",
			// 	    "systemId": "11006",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48067"
			// 	},
			// 	{
			// 	    "menuId": 1801,
			// 	    "menuName": "Physical Storage",
			// 	    "menuDesc": null,
			// 	    "menuPid": 18,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-storage-new",
			// 	    "menuPic": null,
			// 	    "rightTag": "RES",
			// 	    "systemId": "11007",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48068"
			// 	},
			// 	{
			// 	    "menuId": 19,
			// 	    "menuName": "Customer Manage",
			// 	    "menuDesc": null,
			// 	    "menuPid": -1,
			// 	    "menuPidName": null,
			// 	    "menuType": "0",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": null,
			// 	    "menuPic": null,
			// 	    "rightTag": "CRM",
			// 	    "systemId": "11008",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48066"
			// 	},
			// 	{
			// 	    "menuId": 1702,
			// 	    "menuName": "Cmi Batch",
			// 	    "menuDesc": null,
			// 	    "menuPid": 17,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-batch",
			// 	    "menuPic": null,
			// 	    "rightTag": "ORD",
			// 	    "systemId": "11006",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48067"
			// 	},
			// 	{
			// 	    "menuId": 1804,
			// 	    "menuName": "Resource query",
			// 	    "menuDesc": null,
			// 	    "menuPid": 18,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-Resource-information",
			// 	    "menuPic": null,
			// 	    "rightTag": "RES",
			// 	    "systemId": "11007",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48068"
			// 	},
			// 	{
			// 	    "menuId": 1802,
			// 	    "menuName": "Inquery Result",
			// 	    "menuDesc": null,
			// 	    "menuPid": 18,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-storage-info",
			// 	    "menuPic": null,
			// 	    "rightTag": "RES",
			// 	    "systemId": "11007",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48068"
			// 	},
			// 	{
			// 	    "menuId": 1701,
			// 	    "menuName": "Order Query",
			// 	    "menuDesc": null,
			// 	    "menuPid": 17,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-order",
			// 	    "menuPic": null,
			// 	    "rightTag": "ORD",
			// 	    "systemId": "11006",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48067"
			// 	},
			// 	{
			// 	    "menuId": 17,
			// 	    "menuName": "Order Manage",
			// 	    "menuDesc": null,
			// 	    "menuPid": -1,
			// 	    "menuPidName": null,
			// 	    "menuType": "0",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": null,
			// 	    "menuPic": null,
			// 	    "rightTag": "ORD",
			// 	    "systemId": "11006",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48067"
			// 	},
			// 	{
			// 	    "menuId": 2001,
			// 	    "menuName": "Bill Query",
			// 	    "menuDesc": null,
			// 	    "menuPid": 20,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-bill-manage",
			// 	    "menuPic": null,
			// 	    "rightTag": "ACCT",
			// 	    "systemId": "11009",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48069"
			// 	},
			// 	{
			// 	    "menuId": 1803,
			// 	    "menuName": "Inventory Query",
			// 	    "menuDesc": null,
			// 	    "menuPid": 18,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-storage-check",
			// 	    "menuPic": null,
			// 	    "rightTag": "RES",
			// 	    "systemId": "11007",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48068"
			// 	},
			// 	{
			// 	    "menuId": 1805,
			// 	    "menuName": "Product Binding",
			// 	    "menuDesc": null,
			// 	    "menuPid": 18,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-Product-binding",
			// 	    "menuPic": null,
			// 	    "rightTag": "RES",
			// 	    "systemId": "11007",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48068"
			// 	},
			// 	{
			// 	    "menuId": 18,
			// 	    "menuName": "Resource Manage",
			// 	    "menuDesc": null,
			// 	    "menuPid": -1,
			// 	    "menuPidName": null,
			// 	    "menuType": "0",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": null,
			// 	    "menuPic": null,
			// 	    "rightTag": "RES",
			// 	    "systemId": "11007",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48068"
			// 	},
			// 	{
			// 	    "menuId": 1901,
			// 	    "menuName": "Customer 360 Views",
			// 	    "menuDesc": null,
			// 	    "menuPid": 19,
			// 	    "menuPidName": null,
			// 	    "menuType": "1",
			// 	    "menuOrder": 0,
			// 	    "menuTarget": null,
			// 	    "menuUrl": "/cmi-Customer-View",
			// 	    "menuPic": null,
			// 	    "rightTag": "CRM",
			// 	    "systemId": "11008",
			// 	    "activeTime": null,
			// 	    "inactiveTime": null,
			// 	    "treeDisplay": null,
			// 	    "createTime": null,
			// 	    "createOperId": 0,
			// 	    "updateTime": null,
			// 	    "updateOperId": 0,
			// 	    "funcType": null,
			// 	    "systemUrl": "http://10.1.130.203:48066"
			// 	}]
			// this.$nextTick(() => {
			// 	let route = '/cmi-Customer-View' || this.$route.path
			// 	let queryName = getQueryData(menu, 'menuId', 'menuPid', route, 'menuName')
			// 	this.queryActiveMenu = queryName.name
			// 	this.queryOpenName = queryName.names
			// })
			let accessToken = sessionStorage.get('access_token')
  		let refreshToken = sessionStorage.get('refresh_token')
  		if (!accessToken || !refreshToken) return
  		if (this.menuList && this.menuList.length) return

  		// 获取login处设置的语言
  		let fetchLang = await this.instance.get(this.authorization.langUri)
  		if (fetchLang.data === 'zh') {
				this.lang = 'EN'
				localStorage.set('aid-language', 'zh-CN')
				this.$i18n.locale = 'zh-CN'
			} else if (fetchLang.data === 'en') {
				this.lang = 'CN'
				localStorage.set('aid-language', 'en-US')
				this.$i18n.locale = 'en-US'
			}

			// 获取menu数据
			this.instance.get(this.authorization.menuUri).then(res => {
				this.menu = transData(res.data, 'menuId', 'menuPid', 'children')
				/**
				 * 设置自动展开
				 */
				this.$nextTick(() => {
					let route = this.$route.path
					let queryName = getQueryData(res.data, 'menuId', 'menuPid', route, 'menuName')
					this.queryActiveMenu = queryName.name
					this.queryOpenName = queryName.names
				})
				/**
				 * 先找出这一条数据，并将其 menuName 组成一个数组
				 */
			}).catch(res => {
				/**
				 * 处理相关错误的问题
				 */
				if (res) {
			    switch (res.status) {
			      /**
			      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
			      */
			      case 401:
			      	let accessToken = sessionStorage.get('access_token')
				  		let refreshToken = sessionStorage.get('refresh_token')
				  		if (!accessToken || !refreshToken) return
			        let msg = {
			          client_id: this.authorization.client_id,
			          redirect_uri: encodeURIComponent(this.authorization.redirect_uri),
			          state: uuid(6, 16)
			        }
			        window.location.href = this.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
			        break
			    }
			  }
			})

			/* 获取10个最新的消息列表 */
			this.instance.get(this.authorization.bulletinListUri,
				{
					params: {
						pageNo: 1,
						pageSize: 10
					}
				}).then(res => {
				this.notices = res.data.result
			}).catch(res => {
				/**
				 * 处理相关错误的问题
				 */
				if (res) {
			    switch (res.status) {
			      /**
			      * 判断相关的错误，例如判断 token 失效， 或者没有登录的情况
			      */
			      case 401:
			      	let accessToken = sessionStorage.get('access_token')
				  		let refreshToken = sessionStorage.get('refresh_token')
				  		if (!accessToken || !refreshToken) return
			        let msg = {
			          client_id: this.authorization.client_id,
			          redirect_uri: encodeURIComponent(this.authorization.redirect_uri),
			          state: uuid(6, 16)
			        }
			        window.location.href = this.authorization.authorizeUri + '?client_id=' + msg.client_id + '&redirect_uri=' + msg.redirect_uri + '&response_type=code&scope=read&state=' + msg.state
			        break
			    }
			  }
			})
		},
		mounted () {
			/* 设置 */
			this.$nextTick(() => {
				this.setInstance(this.instance)
				this.setAuthorization(this.authorization)
			})
			let that = this
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
	@import './frame.scss'
</style>