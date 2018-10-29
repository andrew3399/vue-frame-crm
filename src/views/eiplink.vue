<template>
</template>
<script>
import Storage from '../utils/localstorage.js'
import { mapState } from 'vuex'
let storage = new Storage()
export default {
    data() {
        return {
            sysMenuList:[],
            musterMenuList:[],
            authmenulist:[],
            canjumpList:[]
        }
    },
    mounted() {
        let that = this
        that.init()
    },
    methods: {
        init() {
            let that = this
//            that.sysMenuList = sessionStorage.getItem('frame-base-info')
            that.authmenulist = sessionStorage.getItem('musterMenuList')
//            let menulist = that.sysMenuList.staffMenue
            console.log("that.sysMenuList======="+JSON.stringify(that.authmenulist))


            this.$nextTick(() => {
                this.aid_language = storage.get('aid-language');
                // console.log(that.$parent.authorization)
                if (that.$parent.authorization != undefined && that.$parent.authorization.getMusterMenu != undefined) {
                    that.$parent.instance.post(that.$parent.authorization.getMusterMenu).then(function (ret) {
                        let resData = ret.data.result;
                        that.musterMenuList = resData
                        console.log("that.musterMenuList=======" + JSON.stringify(that.musterMenuList))
                        that.musterMenuList.filter(item => {
                            item.childMenu.filter(trunk => {
                                if (that.authmenulist.length > 0) {
                                    if (that.authmenulist.indexOf(trunk.menuId) > -1) {
                                        that.canjumpList.push(trunk)
                                    }
                                }
                            })
                        })
                        that.$router.push({path: that.canjumpList[0].url})

//                        alert(JSON.stringify(that.canjumpList))

                    })

                }

            })

        }
    }
}
</script>


