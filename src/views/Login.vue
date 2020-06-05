<template>
  <div id="login">
    <div class="login-wrap">
      <div class="login-wrap-left">
        <img src="../assets/images/login-left.jpg" alt="login">
      </div>
      <div class="login-wrap-right">
        <img class="login-logo" src="../assets/images/logo.png" alt="">
        <!-- <h3>Hotel Admin</h3> -->
        <div class="login-wrap-form">
          <el-form :model="loginRulesForm" :rules="loginRules" ref="loginForm"  class="demo-loginRules">
            <el-form-item class="login-name"  prop="name">
              <el-input v-model="loginRulesForm.username" name="name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item class="login-password" prop="password">
              <el-input type="password" v-model="loginRulesForm.password" name="password" placeholder="请输入密码" @keyup.enter.native="userLogin"></el-input>
            </el-form-item>
            <div class="login-btn-div" @click="userLogin">
              <el-button class="login-btn" type="primary" >登录</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <!-- <div class="forget-password-wrap" :class="[bForgetPassowrd===true?'forget':'']">
        <h3>找回密码</h3>
        <div class="login-wrap-form">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
            <el-form-item  prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="validate-code">
              <el-input v-model.number="ruleForm.code" placeholder="请输入验证码" @keyup.enter.native="login('ruleForm')" class="code-input"></el-input>
              <el-button type="default" class="code-btn" :disabled="bModifyBtnStatus" @click="sendMail">{{sModifyBtnText}}</el-button>
            </el-form-item>
            <el-form-item  prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword" placeholder="请输入新登录密码"></el-input>
            </el-form-item>
            <div class="forget-btn-div" >
              <el-button class="login-btn" type="defalut"  @click="forgetPassowrd" >返回登录</el-button>
              <el-button class="login-btn" type="primary" :loading="bBtnLoginStatus" @click="modify('ruleForm')">立即修改</el-button>
            </div>
          </el-form>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { userLoginApi } from '@/api/user.js'
export default {
  name:'login',
  data(){
    return{
      loginRulesForm:{
        username: 'admin',
        password: '123456',
      },
      loginRules:{
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      },
      // bBtnLoginStatus:false,   //点击登录时按钮的等待状态
      nSendTime:60,    //
      bModifyBtnStatus:false,
      bSendTime:null
    }
  },
  mounted(){   
    this.$notify({
      title: '登录账号',
      message: '账号:admin; 密码:123456;',
      duration: 6000,
      position:'top-left'
    });
  },
  methods:{
    userLogin(){
      this.$refs['loginForm'].validate(valid=>{   //表单验证
        if(valid){ 
          // this.bBtnLoginStatus=true; //改变登陆按钮状态
          userLoginApi(this.loginRulesForm).then(({data})=>{
            if(data.code == 200) {
              this.$message({
                showClose: true,
                message: data.message,
                type: 'sucess'
              })
              localStorage.setItem('loginToken',data.token)
              this.$router.push({path:'/'})
            }
          }).catch(err=>{})
        }else{
          this.$message({
            showClose: true,
            message: '请正确填写登录表单',
            type: 'error'
          });
        }
      })
    },
  },
  
}
</script>


<style>
  #login {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F1F2F7;
  }
  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* display: flex;
    justify-content: space-between; */
    width: 800px;
    height: 400px;
    background: #fff;
    overflow: hidden;
    /* border: 1px  solid #cfcfcf; */
  }
  .login-wrap-left {
    position: absolute;
    left: 0;
    width: 60%;
    height: 100%;
  }
  .login-wrap-left img {
    width: 100%;
    height: 100%;
  }
  .login-wrap-right {
    position: absolute;
    right: 0;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    width: 40%;
    height: 100%;
    /* border-left: 1px solid #cfcfcf; */
    box-sizing: border-box;
    transition: .5s;
    background: #fff;
  }
  .login-wrap-right h3 {
    text-align: center;
    font-size: 20px;
    
  }
  .login-wrap-form {
    margin-top: 15px;
    text-align: center;
  }
  .login-btn-div {
    width: 100%;
  }
  .login-logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
  }
  .forget-password {
    color: #606266;
    cursor: pointer;
  }
  .login-operation {
    width: 100%;
    margin-top: 50px;
  }
  .login-operation>div {
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .forget-password-wrap {
    position: absolute;
    right: 0;
    width: 40%;
    height: 100%;
    /* background: #000; */
    transform: translateX(100%);
    transition: .5s;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    opacity: 0;
  }
  .forget-password-wrap h3 {
    text-align: center;
    color: #59A8F4;
    line-height: 80px;
  }
  .login-trans {
    transform: translateX(-100%);
    opacity: 0;
  }
  .forget {
    transform: translateX(0%);
    opacity: 1;
  }
  .forget-btn-div {
    width: 100%;
    display: flex;
  }
</style>
