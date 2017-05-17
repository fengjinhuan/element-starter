<template>
    <div class="login">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="login-container">
            <h3 class="title">登录</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass:''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { userName: this.ruleForm2.account, userPass: this.ruleForm2.checkPass };
            $.ajax({
                type:'GET',
                url:'http://127.0.0.1:3000/user/login',
                data:loginParams,
                dataType:'json',
                success:function(data){
                    if(data.tips==false){
                        _this.logining = false;
                        _this.$message({
                        message: "账号密码错误,请重新登录",
                        type: 'error'
                        });
                    }else{
                    localStorage.setItem("id",data.tips.id);
                    localStorage.setItem("name",data.tips.name);
                    _this.$router.push({ path: '/home/admin' })
                    _this.$notify.success({
                      title: data.tips.name+'，你好',
                      message: '能源吃货欢迎你的到来',
                      type:'success',
                      duration:3000,
                      offset:300
                    });
                    }
                },
                error:function(){
                    console.log('err')
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>
<style scoped>
.login {
    height: 100%;
    width: 100%;
    overflow: hidden;
    /*background: url(../../assets/banner.png);*/
}

.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}

.remember {
    margin: 0px 0px 35px 0px;
}
</style>