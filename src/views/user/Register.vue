<template>
    <div class="register">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="register-container">
            <h3 class="title">注册账号</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" @change="nameChange(ruleForm2.account)"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">注册</el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default{
    data() {
    var validateName=(rule,value,callback)=>{
        if(value==''){
            callback(new Error('账号不能为空！'));
        }else if(/[\x00-\x2F]|[\x3A-\x40]|[\x5B-\x60]|[\x7B-\xFF]/.test(value)){
            callback(new Error('账号不得含有特殊符号！'))
        }else if(value.length<6){
            callback(new Error('账号不得少于6位！'))
        }else if(this.changeNameFlag==false){
            callback(new Error('账号已存在！'))
        }else{
            callback()
        }
    }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.pass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        logining: false,
        changeNameFlag:false,
        ruleForm2: {
          account: '',
          checkPass:'',
          pass:''
        },
        rules2: {
          account: [
            { validator: validateName, trigger: 'blur' },
            //{ validator: validaePass }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
      };
    },
    methods: {
        nameChange(value){
            var that=this;
            if(value.length>5){
                var userName={
                    userName:value
                };
                    $.ajax({
                        type:'GET',
                        url:'http://127.0.0.1:3000/registerFlag',
                        data:userName,
                        dataType:'json',
                        success:function(data){
                            that.changeNameFlag=data.tips;
                            console.log(that.changeNameFlag)
                        },
                        error:function(){
                            console.log('err')
                        }
                    })
            }
           
            
       
            
        },
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
            var registerParams = { userName: this.ruleForm2.account, userPass: this.ruleForm2.checkPass };
            console.log(registerParams)
            $.ajax({
                type:'GET',
                url:'http://127.0.0.1:3000/register',
                data:registerParams,
                dataType:'json',
                success:function(data){
                    console.log(data.tips)
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
.register {
    height: 100%;
    width: 100%;
    overflow: hidden;
    /*background: url(../../assets/banner.png);*/
}

.register-container {
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