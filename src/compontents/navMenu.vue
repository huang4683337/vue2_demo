<template>
    <div class="navmenu">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened router
                         @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item  index="user">用户账号管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <span>课程管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="seriesList">课程管理</el-menu-item>
                            <!--<el-menu-item index="addseries">新建系列</el-menu-item>-->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3" >
                        <template slot="title">
                            <span>讲师管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="teacherList">讲师管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4" >
                        <template slot="title">
                            <span>课管理</span>
                        </template>
                        <el-menu-item-group>
                            <!--<el-menu-item index="course">课管理</el-menu-item>-->
                            <el-menu-item index="courseUpload">课管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5" >
                        <template slot="title">
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                                <el-menu-item index="orderList">订单管理</el-menu-item>
                                <el-menu-item index="orderTourist">游客购买订单</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6" >
                        <template slot="title">
                            <span>App设置</span>
                        </template>
                        <el-menu-item-group>
                                <el-menu-item index="setApp">App设置</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--<el-submenu index="7" >-->
                        <!--<template slot="title">-->
                            <!--<span>首页轮播管理</span>-->
                        <!--</template>-->
                        <!--<el-menu-item-group>-->
                            <!--<el-menu-item index="homeround">首页轮播管理</el-menu-item>-->

                        <!--</el-menu-item-group>-->
                    <!--</el-submenu>-->
                    <el-submenu index="8" >
                        <template slot="title">
                            <span>版本更新管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="edition">版本更新管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="9" >
                        <template slot="title">
                            <span>分类管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="classification">分类管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="10" >
                        <template slot="title">
                            <span>定价管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="pricing">定价管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="11" >
                        <template slot="title">
                            <span>推荐管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="classificationpages">首页推荐管理</el-menu-item>
                            <el-menu-item index="classifiedrec">分类推荐管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="12" >
                        <template slot="title">
                            <span>埋码管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="buriedList">埋码管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import store from 'store'

    export default {
        name: 'navMenu',
        data() {
            return {

            }
        },

        computed: {
            defaultActive: function () {
                // let pathRoute = this.$route.path;
                // if (pathRoute == "/index") {
                //     return 'user'
                // }else if(pathRoute == "/addseries"){
                //     return 'seriesList'
                // }else{
                //     return this.$route.path.replace('/', '');
                // }
            }
        },
        beforeMount() {
           
        },
        mounted() {

        },
        methods: {
            handleOpen(key, keyPath) {
//				console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
//				console.log(key, keyPath);
            },
        }
    };
</script>

<style lang="less">
    .navmenu {
        /*background: #2FCF9C;*/
       	background: #f7f3f300;
        /*min-height: 700px;*/
        .tac {
            margin-left: 10px;
            margin-right: 10px;
            /*padding-left:61px;*/
            .el-menu {
                border: none; 	
                width: 100%;
                background: -webkit-linear-gradient(left, #2FCF9C , #2BC49F); /* Safari 5.1 to 6.0 */
                background: -o-linear-gradient(right, #2FCF9C, #2BC49F); /* Opera 11.1 to 12.0 */
                background: -moz-linear-gradient(right, #2FCF9C, #2BC49F); /* Firefox 3.6 to 15 */
                background: linear-gradient(to right, #2FCF9C , #2BC49F); /* 标准语法 */
            }
            
            .el-submenu__title:hover{
            	background: #28B38E
            }
            .el-submenu__title:focus{
                background:transparent!important;
            }
            .el-col-12 {
                width: 100%;
            }
            .el-menu-item {
                text-align: left !important;
                font-size: 14px;
                min-width: auto !important;
                padding: 0 0 0 45px !important;
            }
            .el-submenu__title {
                font-size: 16px;
            }
            .el-menu-vertical-demo {
                .el-menu-item {
                    margin: 2px 0;
                    width: 100%;
                    text-align: center;
                    margin-left: -7px;
                    color: #444444;
                    /*background-color: #2FCF9C !important;*/
                    &:hover {
                        background-color: #28B38E !important;
                    }
                }
                .el-menu-item.is-active {
                    width: 100%;
                    border-left: 4px solid #000000;
                    color: white;
                    background-color: #28B38E !important;
                    /*margin-left: -10px !important;*/
                   box-sizing: border-box;
                }
            }
        }
    }
</style>