<template>
    <div>
        {{msg}}
        <childB v-model="msg"></childB>
    </div>
</template>

<script>
    import a from './../../assets/js/a.js'
    import childB from './b.vue';
    export default {
        name: "zujian",
        data() {
            return {
                msg: '是生生世世',
            }
        },
        components: {
            childB,
        },
        methods: {
            
        },
        created(){
            console.log(a.c())
        }
    }
</script>