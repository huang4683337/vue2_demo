<template>
    <div>
        {{msg}}
        <childB v-model="msg"></childB>
    </div>
</template>

<script>
    import { data, setData } from './a.js'
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
        created() {
            console.log(data);	// data

            setData(18);
            console.log(data);	// 18
        }
    }
</script>