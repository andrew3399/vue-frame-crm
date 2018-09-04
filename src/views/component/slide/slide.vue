<template>
    <div class="slide">
        <div class="d-flex justify-content-between slide-wrap">
            <div class="slide-text">
                {{title}}
            </div>
            <div class="slide-icon">
                <div>
                    <span class="mr-10" @click="handleJump"><i :class="aidIcon" ></i></span>
                    <span @click="handleMore">
                        <i v-show="moreDown" class="aid aid-arrow-down-drop-circle"></i>
                        <i v-show="moreUp" class="aid aid-arrow-up-drop-circle"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'title',
        'aidIcon',
        'handleIcon',
        'index'
    ],
    data(){
        return{
            moreDown:true,
            moreUp:false,
            slideDiv:false,
            slideTitle:''
        }
    },
    mounted(){
        this.moreUp = this.handleIcon
        this.moreDown = !this.handleIcon
    },
    methods:{
        handleMore(){
            if (!this.moreDown) {
                this.moreDown = true;
                this.moreUp = false;
                if (this.index>0 || this.index==0) {
                    this.slideDiv = {
                        flag: true,
                        index: this.index
                    }
                } else {
                    this.slideDiv = true;
                }
                // this.slideDiv = true;
                this.$emit('ievent',this.slideDiv);
            } else {
                this.moreDown = false;
                this.moreUp = true;
                if (this.index>0 || this.index==0) {
                    this.slideDiv = {
                        flag: false,
                        index: this.index
                    }
                } else {
                    this.slideDiv = false;
                }

                // this.slideDiv = false;
                this.$emit('ievent',this.slideDiv);
            }





        },
        handleJump(){
            this.$emit('jumpToList',this.jump);
        }
    }
}
</script>

<style lang="scss">
	@import './slide.scss'
</style>
