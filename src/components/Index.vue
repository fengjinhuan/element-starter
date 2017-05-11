<template>
  <div id="app">
    <el-row>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-col :span="3">
          <el-menu-item index="1">山能吃货</el-menu-item>
        </el-col>
        <el-col :span="5">
          <el-submenu index="2">
            <template slot="title">我的店铺</template>
            <el-menu-item index="2-1"></el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-col>
        <el-col :span="5">
          <el-submenu index="3">
            <template slot="title">我的店铺</template>
            <el-menu-item index="3-1"></el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-submenu>
        </el-col>
        <el-col :span="5">
          <el-submenu index="4">
            <template slot="title">我的店铺</template>
            <el-menu-item index="4-1"></el-menu-item>
            <el-menu-item index="4-2">选项2</el-menu-item>
            <el-menu-item index="4-3">选项3</el-menu-item>
          </el-submenu>
        </el-col>
        <el-col :span="3">
          <el-menu-item index="5">
            <el-button type="text" @click="userLogin">登录</el-button>
          </el-menu-item>
        </el-col>
        <!--注册-->
        <el-col :span="3">
          <el-menu-item index="6">
            <el-button type="text" @click="userRegister">注册</el-button>
  
          </el-menu-item>
        </el-col>
      </el-menu>
    </el-row>
    <router-view></router-view>
    <!--申请账号-->
    <el-dialog title="申请账号" :visible.sync="dialogFormVisible" v-if="registerFlag"  :before-close="closeRegister">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="age">
          <el-input v-model="ruleForm2.age"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--登录-->
    <el-dialog title="请登录你的账号" :visible.sync="dialogFormVisible"  v-if="loginFlag" :before-close="closeLogin">
      <el-form :model="login" :rules="rouesLogin" ref="login" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="login.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPass">
          <el-input type="password" v-model="login.userPass" auto-complete="off"></el-input>
          <span class="loginErr" v-if="loginErr">账号与密码不匹配,请重新输入</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginBtn()" :loading="loginHidden" >登录</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
 export default{   
  //  注册、

    data() {
        
      var checkAge = (rule, value, callback) => {
        value=value.toString();
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (/[\x00-\x2F]|[\x3A-\x40]|[\x5B-\x60]|[\x7B-\xFF]/.test(value)) {
            callback(new Error('不得包含特殊符号'));
          } else {
            if (value.length<6||value.length>21) {
              callback(new Error('请输入6-20位账号'));
            } else {
              callback();
            }
          }
        }, 500);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      
      return {
        id:'',
        loginHidden:false,
        dialogFormVisible:false,
        loginFlag:false,
        registerFlag: false,
        activeIndex: '1',
        activeIndex2: '1',
        dialogFormVisible: false,
        loginErr:false,
        login: {
          userName: '',
          userPass: '',
        },
        formLabelWidth: '120px',
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        rouesLogin:{
          loginErr:[
            {validator: validatePass, trigger: 'blur'}
          ],
          userName:[
            { required: true,message: '请输入账号',trigger: 'blur'}
          ],
          userPass:[
            { required: true, message: '请输入密码',trigger: 'blur'}
          ]
        }



      };
    },
      methods: {
        loginBtn:function(formName){
          var that=this;
          var userName=this.login.userName;
          var userPass=this.login.userPass;
          if(userName!=''&&userPass!=''){
            that.loginHidden=false;
            $.ajax({
              data:{
                userName:userName,
                userPass:userPass
              },
              type:'GET',
              dataType:'json',
              url:'http://127.0.0.1:3000/login',
              success:function(data){
                  
                  if(data.tips==false){
                    that.loginErr=true;
                    that.loginFlag=true;
                      that.$notify.error({
                      title: '请重新登录',
                      message: '账号与密码不匹配',
                      duration:3000,
                      offset:300
                    });
                    
                    return
                };
                  var userName=data.tips[0].userName;
                  if(userName!=undefined){
                    that.loginFlag=false;
                    that.loginErr=false;
                    that.$notify.success({
                      title: '登录成功',
                      message: '亲爱的'+userName+',你好',
                      type:'success',
                      duration:3000,
                      offset:300
                    });
                  }
                that.login.userName="";
                that.login.userPass="";
                that.dialogFormVisible=false;
                that.id=data.tips[0]._id;
                localStorage.setItem("id",that.id);
              },
              error:function(){
                console.log('err')
              }
            })
          }
        },
        closeRegister:function(){
            this.registerFlag=!this.registerFlag
        },
        closeLogin:function(){
            this.login.userName="";
                this.login.userPass="";
            this.loginHidden=false;
            this.loginFlag=!this.loginFlag;
            this.loginErr=false;
        },
        userRegister:function(){
            this.registerFlag=!this.registerFlag
            this.dialogFormVisible = true
        },
        userLogin:function(){
            this.loginFlag=!this.loginFlag;
            this.dialogFormVisible = true;
            this.loginErr=false;
        },
        handleSelect(key, keyPath) {
          // console.log(key, keyPath);
        },
        // 注册提交
        submitForm(formName) {
          
          var that=this;  
          this.$refs[formName].validate((valid) => {
            if (valid) {               
                var userName=this.ruleForm2.age;
                var userPass=this.ruleForm2.pass; 
                        
                  // 申请账号
                  $.ajax({
                    type:'GET',
                    url:'http://127.0.0.1:3000/register',
                    dataType:'json',
                    data:{userName:userName,userPass:userPass},
                    success:function(data){
                      that.ruleForm2.age="";
                      that.ruleForm2.checkPass="";
                      that.ruleForm2.pass="";
                      that.registerFlag=!that.registerFlag
                    },
                    error:function(){
                      console.log('err')
                    }
                  })
                  
                  
              this.dialogFormVisible=false;
              this.$notify.success({
              title: '注册成功',
              message: '欢迎加入能吃平台',
              type:'success',
              duration:2500,
              offset:300
            });
            
            } else {
              this.$notify({
            title: '失败',
            message: '账号或密码不规范',
            type: 'warning'
            
          });
              return false;
            }
          });
        },
        

      }
  }    
</script>

<style>

.aa{
  height: 50px;width: 50px;
  background: red;
}
.loginErr{
  color: #ff4949;
  font-size: 12px;
}
</style>