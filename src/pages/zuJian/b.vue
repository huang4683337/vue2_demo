<template>
    <div>
        <span @click='handleClick'>dianji</span>
    </div>
</template>

<script>
    import childB from './b.vue';
    export default {
        name: "bbb",
        model: {
            prop: 'info', // v-model 所绑定的属性，默认是 value
            event: 'changeModel',  // v-model 绑定的事件，默认是 input
        },
        props: ['info'],
        data() {
            return {

            }
        },
        components: {
            childB,
        },
        methods: {
            handleClick() {
                this.$emit("changeModel", this.info + "ss");
            }
        }
    }
</script>