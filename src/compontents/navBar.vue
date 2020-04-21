<template>
	<div class="navbar" :style="navbgs">
		<div class="logos">
			 <!--<img src="../../static/img/logo.jpg" />-->
			<p>易懂后台管理系统</p>
		</div>

		<div class="right">
			<p>您好{{name}}</p>
			<button @click="outlogin()">退出系统</button>
		</div>
	</div>
</template>

<script>
	import store from 'store';
	import axios from '../api/index';
	export default {
        name: 'navMenu',
        data() {
            return {
                name: '',
				navbgs:{
					 backgroundImage: "url(" + require("../assets/img/navbg.png") + ")",
				}
            }
        },
        created() {
            eventBus.$on('islogin', () => { //获取传递的参数并进行操作
                this.islogin()
            })
        },
// 最好在组件销毁前
// 清除事件监听
        beforeDestroy () {
            eventBus.$off('islogin');
        },

		mounted() {
            this.getNmae();
			 this.islogin()
		},
		methods: {
			islogin() {
				axios.loginAPI.me({}).then((response) => {
					if(response.data.data== null) {
						store.remove("userInfor");
						this.$router.push({
							path: '/'
						});
					}else{
                        store.set("userInfor", response.data.data);
                        this.getNmae()
					}

				})
			},
			outlogin() {
				axios.loginAPI.loginout({}).then((response) => {
				    setTimeout( ()=> {
                        store.remove("userInfor");
                        this.$router.push({
                            path: '/'
                        })
                        },1000
					)


				})
			},
			getNmae(){
			    if(store.get("userInfor")){
                    this.name=store.get("userInfor").userName
				}
			}


		}

	}
</script>

<style lang="less" scoped>
	* {
		margin: 0 auto;
	}
	
	.navbar {
		height: 94px;
		width: 100%;
		/*background: #F0F0EE;*/
		/*background-image:url(/static/img/navbg.png);*/
		background-repeat:no-repeat ;
		background-size:cover;
		border-radius: 0px !important;
		margin: 0 auto;
		.logos {
			float: left;
			/*width: 245px;*/
			text-align: center;
			height: 94px;
			/*line-height: 100px;*/
			cursor: pointer;
			img {
				/*width: 240px;*/
				vertical-align: middle;
				height: 47px;
				width: 159px;
				margin-left: 70px;
				margin-top: 24px;
				float: left;
			}
			p{
				color: #333333;
				font-size: 36px;
				margin-left: 50px;
				height: 94px;
				line-height: 94px;
				float: left;
			}
		}
		.right {
			float: right;
			/* width: 215px; */
			/*line-height: 100px;*/
			font-size: 16px;
			/*color: #ffffff;*/
			/*height: 76px;*/
			overflow: hidden;
			margin-right: 50px;
			p {
				float: left;
				margin-top: 53px;
				height: 18px;
				color:white;
				margin-right: 70px;
			}
			button {
				background: none;
				margin-top: 45px;
				width: 88px;
				height: 30px;
				outline: none;
				margin-left: 20px;
				font-size: 14px;
				color: #FFFFFF;
				border: 1px solid #FFFFFF;
				border-radius: 10px;
				cursor: pointer;
			}
		}
	}
</style>