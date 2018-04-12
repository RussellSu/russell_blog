<template>
  <div id="signup">
    <div class="center-wrapper">
      <div class="w-header">person information</div>
      <div class="w-body clearfix">
        <div class="acount signup-item">
          <span class="item-name">email</span>
          <input type="text" class="item-input" v-model='email'>
        </div>
        <div class="acount signup-item">
          <span class="item-name">phoneNumber</span>
          <input type="text" class="item-input" v-model='phoneNumber'>
          <span class="item-desc">11位数字</span>
        </div>
        <div class="acount signup-item">
          <span class="item-name">username</span>
          <input type="text" class="item-input" v-model='username'>
          <span class="item-desc">6-16位 字母 数字 英文点号 下划线 中划线</span>
        </div>
        <div class="password signup-item">
          <span class="item-name">password</span>
          <input type="password" class="item-input" v-model='password'>
          <span class="item-desc">8-20位 字母 数字 特殊符号（!@$） 组成的强密码</span>
        </div>
        <div class="password signup-item">
          <span class="item-name">password again</span>
          <input type="password" class="item-input" v-model='password2'>
        </div>
        <div class="btn-bar signup-item">
          <a class="signup-btn cursor-hand" title="signup" @click='signup'>Sign up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import "@/styles/signup.scss";

export default {
  name: 'signup',
  components: {},
  data() {
    return {
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      password2: ''
    }
  },
  methods: {
    signup() {
      var _this = this
      var data = {
        email: _this.email,
        phoneNumber: _this.phoneNumber,
        username: _this.username,
        password: _this.password,
        password2: _this.password2
      }
      this.$http
        .post('/api/users/register', { data: JSON.stringify(data) })
        .then(res => {
          console.log(res.data)
          window.location.href = '/login'
        })
        .catch(err => {
          if (err.response.data.emailEmpty) {
            alert('email不可为空')
          }
          else if (err.response.data.phoneNumberEmpty) {
            alert('电话号码不可为空')
          }
          else if (err.response.data.usernameEmpty) {
            alert('用户名不可为空')
          }
          else if (err.response.data.passwordEmpty) {
            alert('密码不可为空')
          }
          else if (err.response.data.passwordNotSame) {
            alert('两次密码不一致')
          }
          else if (err.response.data.invalidEmail) {
            alert('无效的email')
          }
          else if (err.response.data.invalidPhoneNumber) {
            alert('无效的电话号码')
          }
          else if (err.response.data.invalidfullname) {
            alert('无效的用户名')
          }
          else if (err.response.data.invalidPassword) {
            alert('无效的密码')
          }
          else if (err.response.data.emailRepeated) {
            alert('email已存在')
          }
          else if (err.response.data.phoneRepeated) {
            alert('电话号码已存在')
          }
          else {
            alert(JSON.stringify(err.response))
          }
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
#signup {
  height: 100%;
  background-color: #6c6c6c;
  /*#f6f1e8*/
  background-attachment: fixed;
  background-image: url('/static/img/giraffe03.jpg');
  background-position: 0 0;
  background-size: cover;
  background-repeat: space;
}

.center-wrapper {
  position: fixed;
  left: calc(50% - 250px);
  top: calc(50% - 150px);
  width: 500px;
  height: 300px;
  padding: 10px;
  background-color: rgba(49, 176, 213, 0.5);
  box-shadow: 0px 0px 17px #dadada;
  border-radius: 4px 4px;
  color: #fff;
}

.w-header {
  padding: 0.5rem;
  font-size: 20px;
  line-height: 1.2;
  font-weight: bold;
  text-align: center;
}

.w-body {
  position: relative;
  top: 0;
  left: 0;
  text-align: left;
}

.signup-item {
  margin: 0 0.5rem 1rem 0.5rem;
}

.item-name {
  display: inline-block;
  min-width: 150px;
  text-align: center;
}

.item-input {
  border: 0;
  padding: 0.3rem;
  font-family: inherit;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
}

.item-desc {
  display: inline-block;
  font-size: 12px;
  width: 150px;
  vertical-align: middle;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.6);
}

.signup-item .fa {
  margin-right: 0.1rem;
  min-width: 16px;
}

.center-wrapper .btn-bar {
  text-align: center;
}

.center-wrapper .signup-btn {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px; // margin: 0 1.2rem;
  padding: 4px 10px;
  color: #fff;
  text-decoration: none;
  background-color: transparent;
  transition: color, background-color, transform 0.5s;
}

.center-wrapper .signup-btn:hover {
  transform: scale3d(1.4, 1.4, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(49, 176, 213, 1);
  background-color: #fff;
}
</style>
