<template>
    <div>
        <div class="login">
            <p @click='add'>增加</p>
            {{count}}
        </div>

        <br>
        <br>

        <div class="login">
            <p @click='mutation(count)'>mutation</p>
            {{mutation_a}}
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import { mapMutations } from 'vuex'
    // import axios from '../../api/index';

    export default {
        name: 'login',
        components: {},
        created() { },
        mounted() { },
        methods: {
            ...mapActions({
                add: 'increment'
            }),
            ...mapMutations({
                mutation: 'mutation'
            })
        },
        computed: {
            ...mapState({
                count: 'count',
                mutation_a: 'mutation_a',
            }),
        }
    }
</script>

<style lang="less">
    .login {
        width: 100px;
        overflow: hidden;
        background: red;
        text-align: center;
        margin-left: 40%;

        p {
            width: 40px;
            height: 20px;
            background: blue;
            margin-left: 20px;
            color: #fff;
            text-align: center;
        }
    }
</style>