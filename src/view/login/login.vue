<template>
    <div class="page_back">
      <div></div>
      <div class="container_box">
        <div class="title">登陆</div>
        <el-input class="user_input"
          placeholder="请输入账号"
          v-model="username"
          suffix-icon="el-icon-s-custom"
          clearable>
        </el-input>
        <el-input class="user_input"
          placeholder="请输入密码"
          v-model="password"
          show-password>
        </el-input>
        <el-button class="user_input" type="primary" @click="loginSubmit">登陆</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return {
            username:null,
            password:null
          }
      },
      methods:{
        loginSubmit(){
          let that=this;
          const h = this.$createElement;
          if(this.username!=null&&this.password!=null){
            let url='/user/login/';
            let data={
              account:this.username,
              password:this.password,
              login_type:'password',
              client:'PC'
            };
            let callback=function (res) {
              if(res.code!=0){
                that.$notify({
                  title: '登陆提示',
                  message: h('i', { style: 'color: teal'}, res.message)
                });
              }else {
                localStorage.setItem('token',res.data.token);
                that.$router.push('/')
              }
            };
            this.httpPost(url,data,callback);
            // localStorage.setItem('token','111');
            // this.$router.push('/home')
          }else {
            this.$notify({
              title: '登陆提示',
              message: h('i', { style: 'color: teal'}, '请输入账号密码')
            });
          }
        }
      },
      mounted() {
      }
    }
</script>

<style scoped>
  .title{
    width: 100%;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    line-height: 40px;
    border-bottom: 1px solid #304156;
    color: #304156;
  }
  .user_input{
    margin: 15px auto;
    width: 260px;
  }
  .container_box{
    position: absolute;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -250px;
    width: 500px;
    height: 300px;
    background-color: white;
    border-radius: 10px;
    /*top:50%;*/
  }
  .page_back{
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #304156;
  }

</style>
