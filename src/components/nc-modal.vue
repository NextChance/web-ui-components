<template>
    <div class="nc-modal" :style="{visibility, display}">
        <div class="nc-modal__wrapper">
            <div class="nc-modal__container">
                <i></i>
                <div class="nc_modal__header">
                    <slot name="header">
                        header
                    </slot>
                </div>
                <div class="nc_modal__content">
                    <slot name="content">
                        <p>Content</p>
                    </slot>
                </div>
                <div class="nc_modal__footer">
                    <slot name="footer">
                        <div @click="close">
                            OK
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const closed = 'closed'
const opened = 'opened'

export default {
    name: 'nc-modal',
    props: {
        opened: {
            type: Boolean,
            default: false
        },
        showCloseIcon: {
            type: Boolean,
            default: false
        },
        showFooter: {
            type: Boolean,
            defeault: false
        }
    },
    methods: {
        close() {
            this.$emit(opened, false)
        }
    },
     computed:{
         visibility() {
             return this.opened? 'visible' : 'hidden'
         },
         display() {
             return this.opened? 'none' : 'block'
         }
     }
}
</script>

<style lang="scss" scoped>
    .nc-modal {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
        &__wrapper {
            display: table-cell;
            vertical-align: middle;
        }
        &__container{
            width: 300px;
            margin: 0px auto;
            padding: 20px 30px;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
            transition: all .3s ease;
            font-family: Helvetica, Arial, sans-serif;
        }
        &__content {
            margin: 20px 0;
        }
    }

</style>
