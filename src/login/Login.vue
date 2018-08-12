<template>
  <div id="login">
    <div class="center-wrapper">
      <div class="w-header">welcome to Russell's Home!</div>
      <div class="w-body clearfix">
        <div class="left-bar">
          <p class="">I don't have a account</p>
          <a href="/" class="login-btn" title="I am just a tourist.">tourist</a>
          <a href="/signup" class="login-btn">Sign up</a>
        </div>
        <div class="right-bar">
          <p class="">I have a account</p>
          <div class="acount login-item">
            <i class="fa fa-user"></i>
            <input type="text" class="" v-model='username'>
          </div>
          <div class="password login-item">
            <i class="fa fa-key"></i>
            <input type="password" class="" v-model='password'>
          </div>
          <div class="btn-bar login-item">
            <a class="login-btn cursor-hand" title="login" @click='login'>login</a>
          </div>
        </div>
      </div>

      <div class="btn-bar">

      </div>
    </div>
  </div>
</template>

<script>
// import "@/styles/login.scss";

export default {
  name: 'login',
  components: {},
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // var _this = this
      // var data = {
      //   username: _this.username,
      //   password: _this.password
      // }
      console.log('login')
      this.$http
        // .post('/api/login', { data: JSON.stringify(data) })
        .get('/api/auth/provider')
        .then(res => {
          console.log(res.data)
          window.location.href = '/'
        }, err => {
          if (err.response.data) {
            if (err.response.data.empty) {
              alert('用户名密码不可为空')
            }
            else if (err.response.data.validFailed) {
              alert('用户名或密码不正确')
            }
          }
          console.log('login', err.response)
        })
    }
  }
}
</script>

<style>
html {
  font-size: 16px;
}
body {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}
.cursor-hand {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
#login {
  height: 100%;
  background-color: #6c6c6c; /*#f6f1e8*/
  background-attachment: fixed;
  background-image: url('/static/img/giraffe03.jpg');
  background-position: 0 0;
  background-size: cover;
  background-repeat: space;
}
.center-wrapper {
  position: fixed;
  left: calc(50vw - 17rem);
  top: calc(50vh - 10rem);
  width: 34rem;
  height: 20rem;
  padding: 1rem;
  background-color: rgba(49,176,213,.5);
  box-shadow: 0 0 17px #dadada;
  border-radius: 4px 4px;
  color: #fff;
  box-sizing: border-box;
}
.center-wrapper input {
  border: 0;
  padding: 0.3rem;
  font-size: 1rem;
  font-family: inherit;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
}
.w-header {
  padding: 0 .5rem 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}
.w-body {
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: #fff;
  }
}
.left-bar {
  float: left;
  width: 50%;
  // min-height: 200px;
}
.right-bar {
  float: right;
  width: 50%;
}
.login-item {
  margin: 0 .5rem 1rem .5rem;
  text-align: center;
}
.login-item .fa {
  margin-right: .1rem;
  min-width: 16px;
}

.center-wrapper .btn-bar {
  text-align: center;
}

.center-wrapper .login-btn {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  // margin: 0 1.2rem;
  padding: 4px 10px;
  color: #fff;
  text-decoration: none;
  background-color: transparent;
  transition: color, background-color, transform 0.5s;
}

.center-wrapper .login-btn:hover {
  transform: scale3d(1.4, 1.4, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(49, 176, 213, 1);
  background-color: #fff;
}
</style>
