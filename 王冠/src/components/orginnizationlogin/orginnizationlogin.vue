<template>
<div class="orginnizationlogin">
 <div class="pagecover">
   <div class="ofromwrapper">
   <p>机构登陆</p>
   <div class="line"></div>
     <Form :model="formRight" label-position="right" :label-width="100" style="width:100%">
      <Form-item label="用户名">
        <Input v-model="formRight.input1"></Input>
      </Form-item>
      <Form-item label="密码">
        <Input type="password" v-model="formRight.input2"></Input>
      </Form-item>
      <div class="frombtnwrapper">
      <Form-item>
          <Button type="primary" style="width:100%" @click="handleSubmit('formRight')">登录</Button>
      </Form-item>
      </div>
    </Form>
     <div class="login_footer">
    <img src="./1.png">
      天外天工作室
    </div>
   </div>
 </div>
</div>
</template>

<script>
export default {
    data () {
      return {
        formRight: {
          input1: '',
          input2: '',
          input3: ''
        }
      };
    },
    methods: {
      handleSubmit (name) {
        this.$http.post('Home/Index/orgLogin', {username: this.formRight.input1, password: this.formRight.input2}).then((response) => {
          this.$store.commit('orgsuccesslogin', response.body);
          this.$router.push({ name: 'index' });
        });
      }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.pagecover
  position fixed
  height 100%
  width 100%
  background-color #fff
  z-index 1000
  background url(obackground.jpg)
  background-repeat no-repeat
  background-size 100% 100%
.ofromwrapper
  width 30%
  margin 0 auto
  position absolute
  top 40%
  left 33%
.line
  height 2px
  width 100%
  background-color #ccc
  position absolute
  left 35px
  top -50px
.ofromwrapper p
  color #ccc
  position absolute
  top -98px
  left 43%
  font-size 30px
// .frombtnwrapper
.login_footer
  position absolute
  top 300px
  width 100%
  font-size 14px
  color #fff
  max-height 40px
  overflow hidden
  text-align center
  display: inline-block
  padding: 8px 40px
  border-radius: 50px
  background: rgba(0,0,0,.25)
  img
    vertical-align: middle;
</style>
