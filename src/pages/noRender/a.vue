<template>
    <div>
        非渲染模式
        <BBBB v-slot='{name,add}'>
            <div @click="add">{{name}}</div>
        </BBBB>
    </div>
</template>

<script>
    import BBBB from './b.vue';
    export default {
        name: "aaa",
        data() {
            return {

            }
        },
        components: {
            BBBB,
        },
    }
</script>