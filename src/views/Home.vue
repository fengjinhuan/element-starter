<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="4" class="logo">
                能源吃货
            </el-col>
            <el-col :span="6" :offset="13">
                <el-dropdown @command="handleCommand">
                    <el-button type="primary" >
                        {{name}}
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
    
            </el-col>
        </el-col>
        <el-col class="main" :span="24">
            <el-col :span="4">
                <el-menu default-active="/home/admin" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>管理店铺</template>
                        <el-menu-item-group>
                            <el-menu-item index="/home/admin">商品管理</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>导航二</el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>导航三</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" class="main-con">
                <router-view></router-view>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
	export default {
		data() {
			return {
                name:''
            }
				
		},
         methods: {
             handleCommand() {
             this.$message('退出登录');
             localStorage.clear();
             this.$router.push({ path: '/' })
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
        this.name=localStorage.getItem("name");
        
    }

		
	}

</script>

<style scoped>
.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
}

.header {
    height: 60px;
    line-height: 60px;
    background: #20A0FF;
    color: #fff;
}

.logo {
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
}

.me {
    border: 1px solid red;
}

.main {
    position: absolute;
    top: 60px;
    left: 0;
    background: red;
    height: 100%;
    background: #EEF1F6;
}

.el-menu-vertical-demo {
    height: 100%;
}

.main-con {
    height: 100%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
}
</style>