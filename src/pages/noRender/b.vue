<script>
    export default {
        name: 'bbbb',
        data() {
            return {
                name: '我是b'
            }
        },
        methods: {
            add() {
                console.log('bbbbbbbbbbbbb');
            },
        },
        render() {
            return this.$scopedSlots.default({
                name: this.name,
                add: this.add
            });
        }
    }
</script>