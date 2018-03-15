<template>
<div class="user_personinfo">
  <div class="user_personinfo_card">
    <div class="personinfo_topic">
      <span class="twt--decorator-primary"></span>
      <p>抢票人信息</p>
    </div>
    <hr>
    <div class="personinfo_datailwrapper">
      <Form :model="formRight" label-position="right" :rules="ruleCustom" :label-width="100">
        <Form-item label="天外天账号">
          <Input v-model="formRight.users_nickname" disabled></Input>
        </Form-item>
        <Form-item label="学号">
          <Input v-model="formRight.users_usersnum" disabled></Input>
        </Form-item>
        <Form-item label="学院">
          <Input v-model="formRight.users_academy" disabled></Input>
        </Form-item>
        <Form-item label="专业">
          <Input v-model="formRight.users_major" disabled></Input>
        </Form-item>
        <Form-item label="姓名">
          <Input v-model="formRight.users_realname" disabled></Input>
        </Form-item>
        <Form-item label="邮箱"  prop="users_mail">
          <Input v-model="formRight.users_mail"></Input>
        </Form-item>
        <Form-item label="手机号" prop="users_phonenum">
          <Input v-model="formRight.users_phonenum" number></Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formRight')">提交修改</Button>
        </Form-item>
      </Form>
    </div>
    <div>

      
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      const validateMailCheck = (rule, value, callback) => {
        setTimeout(() => {
          var regmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          var flagmail = regmail.test(value);
          if (flagmail) {
            callback();
          } else {
            callback(new Error('邮箱格式错误'));
          }
        }, 1000);
      };
      const validatePhoneNum = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请确认输入为数字'));
          } else {
            if (value > 9999999999 && value < 100000000000) {
              callback();
            } else {
             callback(new Error('请输入11位手机号'));
           }
         }
       }, 1000);
      };
      return {
       formRight: {
        users_nickname: '',
        users_usersnum: '',
        users_academy: '',
        users_major: '',
        users_realname: '',
        users_mail: '',
        users_phonenum: ''
      },
      ruleCustom: {
        users_mail: [
        { validator: validateMailCheck, trigger: 'blur' }
        ],
        users_phonenum: [
        { validator: validatePhoneNum, trigger: 'blur' }
        ]
      }
    };
  },
  created () {
    this.fetchDate();
  },
  watch: {
     $route: 'fetchDate'
  },
  methods: {
    fetchDate () {
      this.$http.post('Home/Manage/user').then((response) => {
        var usersdata = response.body.info.user;
        this.formRight.users_nickname = usersdata.username;
        this.formRight.users_usersnum = usersdata.studentno;
        this.formRight.users_academy = usersdata.school;
        this.formRight.users_major = usersdata.major;
        this.formRight.users_realname = usersdata.name;
        this.formRight.users_mail = usersdata.email;
        this.formRight.users_phonenum = usersdata.phone;
        console.log(response);
    });
    },
    handleSubmit (name) {
      this.$http.post('Home/User/update', {email: this.formRight.users_mail, phone: this.formRight.users_phonenum}).then((response) => {
      console.log(response);
    });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.user_personinfo_card
  display: block
  margin 10px auto
  height 1000px
  max-width 1000px
  background-color: #fff
  border-radius: 3px
  box-shadow: 0 1px 2px 0 rgba(8,1,3,.15)
  color #5a5959
.twt--decorator-primary 
  width: 3px
  height: 25px
  background-color: rgb(0, 183, 238)
  position: absolute
  top: 21px
  left: 0
.personinfo_topic
  margin-left 60px
  padding-top 20px
  padding-bottom 20px
  position: relative
.personinfo_topic p
  font-size 18px
  padding-left 20px
.personinfo_datailwrapper
  padding-top 50px
  width 60%
  margin-left 8%
.user_personinfo_card hr
  border: 0
  border-top: 1px solid #eee
  
</style>
