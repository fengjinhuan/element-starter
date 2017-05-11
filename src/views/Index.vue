<template>
    <div class="con">
        <div class="fjh-con">
            <div class="fjh-nav">
                    <el-col :span="10" :offset="1">
                        <div class="fjh-icon-box">
                        <img class="fjh-icon" src="src/assets/logo.png"></img>
                        </div>
                    </el-col>
                    <el-col :span="6" :offset="10">
                        <el-breadcrumb separator="|">
                            <el-breadcrumb-item to="/login"><span class="login">登录</span></el-breadcrumb-item>
                            <el-breadcrumb-item to="/register"><span class="login">注册</span></el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>        
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {msg:'首页'}
    }
}
</script>
<style>
.con{
    height: 100%;
    width: 100%;
}
.fjh-con {
    height: 500px;
    background: url(../assets/banner.png)
}

.fjh-nav {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
}
.login{
    cursor: pointer;
    color:#fff;
    font-size: 18px;
}
</style>