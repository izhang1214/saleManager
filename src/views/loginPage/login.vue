<template>
  <div class="login-div">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h2 class="login-h2">销售管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" type="text"></el-input>
      </el-form-item>
      <el-form-item label="密  码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {login,getUserMessage} from '../../api/login';
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      userInfo:{
        page:1,
        pageRow:5
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if(valid){
          const loginInfo = this.$store.dispatch('Login',this.form);
          loginInfo.then(res=>{
            if(res.data.code=='0000' &&res.data.status==='0000'){
              this.$router.push('/home')
            }else{
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          })
        }
        // if(valid){
        //   const {data} = await login(this.form.username,this.form.password);
        //   if(data.code==='0000' && data.status==='0000'){
        //     getUserMessage(this.userInfo).then(res=>{
        //       console.log(res);
        //     })
        //     localStorage.setItem('user-info',JSON.stringify(data.data));
        //     this.$router.push('/home')
        //   }else{
        //     this.$message({
        //       message: data.msg,
        //       type: "warning"
        //     });
        //   }
        // }else{
        //    this.$message({
        //       showClose: true,
        //       message: '用户名密码不能为空',
        //       type: 'warning'
        //     });
        // }
      });
    }
  }
};
</script>
<style scoped>
.login-div {
  width: 100%;
  height: 100%;
  /* background: url("./bj.jpg") no-repeat; */
  background-size: 100% 100%;
}
.login-div form {
  width: 350px;
  padding: 30px;
  position: absolute;
  left: 50%;
  top: 25%;
  margin-left: -175px;
  border-radius: 15px;
  background: #afc8c0cc;
}
.login-h2 {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.login-btn{
  width:50%;
}
</style>