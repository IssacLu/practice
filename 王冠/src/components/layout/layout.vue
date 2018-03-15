<template>
  <div class="layout">
  
    <div class="g_header">
      <div class="g_header_inner">
      <div class="g_header_logowrapper">
        <router-link :to="{path: '/index'}">
          <img src="./logo.png" width="">
        </router-link>
      </div>
        <div class="g_header_nav">
          <ul class="g_header_nav_list">
     <!--      在那一页加上open class -->
          <router-link :to="{path: '/index'}">
            <li>首页</li>
          </router-link>
          <router-link :to="{path: '/user'}" v-if="this.$store.state.stustate">
            <li>票务信息</li>
          </router-link>
          <router-link :to="{path: '/organization'}" v-if="this.$store.state.orgstate">
            <li>票务信息</li>
          </router-link>
          <li v-if="state=== 0" @click="info">票务信息</li>
          </ul>
        </div>
        <div class="g_header_menu">
          <ul class="g_header_menu_list">
            <!-- <router-link :to="{path: '/organization'}">
              <li v-if="username!== undefined">
                <Badge dot v-if="noticenum!==0" style="margin-right: 12px;">
                  <Icon type="ios-bell-outline" size="20"></Icon>
                </Badge>
                <Badge v-if="noticenum===0" style="margin-right: 12px;">
                  <Icon type="ios-bell-outline" size="20"></Icon>
                </Badge>
              </li>
            </router-link> -->
            <router-link :to="{path: '/user/personinfo'}" v-if="username!== undefined">
            <li > {{ username }}</li>
            </router-link>
            <router-link :to="{path: '/organization'}" v-if="orgname!== undefined">
            <li > {{ orgname }}</li>
            </router-link>
             <router-link :to="{path: '/user/personinfo'}" v-if="username!== undefined">
            <li v-if="state=== 1" >
              <img src="./defaultavatar.png">
            </li> 
            <!-- <li v-if="state=== 1" >
              <img :src="avatar">
            </li>  -->
            </router-link>
             <router-link :to="{path: '/organization/organizationinfo'}" v-if="orgname!== undefined">
            <li v-if="state=== 1" >
              <img src="./defaultavatar.png">
            </li>
            </router-link> 

            <li v-if="state=== 1" @click="Logout">登出</li>
              <!-- <li v-if="username=== ''">个人中心</li> -->

              <!-- <li v-if="username=== ''" class="g_header_nav_pile">|</li> -->
              <li @click="userlogin" v-if="state!== 1">学生登录</li>
              <li v-if="state!== 1" class="g_header_nav_pile">|</li>
               <router-link :to="{path: '/orginnizationlogin'}">
              <li v-if="state!== 1">机构登录</li>
              </router-link>
            </ul>
        </div> 
      </div>
    </div>
    
    <div class="g_header_height"></div>

    <div class="g_content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <div class="g_footer">
      <div class="g_footer_inner">
       <p> ♥&nbsp;天外天工作室 / © 2000-2016津ICP备000017号</p>
       <p><a href="http://coder.twtstudio.com">关于我们</a>
        &nbsp;/&nbsp;    
        <a href="http://coder.twtstudio.com/hr">加入我们</a>
      </p> 
    </div>   
  </div>
   </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
     return {
       users: '',
       noticenum: 2
     };
  },
  methods: {
    info () {
        this.$Message.info('要先登录哦！');
    },
    Logout () {
      this.$http.post('Home/Index/logout').then((response) => {
      this.$store.state.stustate = 0;
      this.$store.state.orgstate = 0;
      this.$store.state.user = {};
      this.$store.state.org = {};
      this.$router.push({ name: 'index' });
      this.$Message.success('登出成功！');
    });
    },
    userlogin () {
      window.location.href = window.ticketRoot + '/Home/Index/sso_jump';
    },
    fetchDate () {
       this.$http.post('Home/Index/get_user_info').then((response) => {
       this.$store.commit('stusuccesslogin', response.body);
    });
       this.$http.post('Home/Index/get_org_info').then((response) => {
       this.$store.commit('orgsuccesslogin', response.body);
    });
    }
   },
   computed: {
    avatar: function () {
      if (this.$store.state.user.avatar === 'https://i.twtstudio.com/uploads/') {
        console.log('made');
        return './defaultavatar';
      } else {
         console.log('hahH');
       return this.$store.state.user.avatar;
      }
    },
    username: function () {
      return this.$store.state.user.name;
    },
    orgname: function () {
      return this.$store.state.org.org_name;
    },
    state: function () {
      if (this.$store.state.stustate || this.$store.state.orgstate) {
         return 1;
      } else {
         return 0;
      }
    }
   },
   watch: {
     $route: 'fetchDate'
   },
   created () {
    this.fetchDate();
   }
};

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.g_header
  position: fixed
  top: 0
  left: 0
  border-bottom: 1px solid #e0e0e0
  z-index: 30
  background: #fff
  color: #b2b2b2
  height: 70px
  line-height: 70px
  width: 100%
  .g_header_inner
    width: 1000px
    margin: 0 auto
  .g_header_logowrapper
    float left
    margin 0 40px 0 0
    line-height 71px
  .g_header_logowrapper img
    width 180px
    height auto
    vertical-align middle
  .g_header_nav
     float left
  .g_header_nav li,.g_header_menu li
    cursor: pointer
    display: inline-block
    vertical-align middle
  .g_header_nav li
    color: #333
    font-size 18px
    margin-left 40px
    line-height 66px
    width 120px
    text-align center
    border-top: 4px solid transparent;
  .g_header_nav  .open
    color #00a1e9
  .g_header_nav li:hover
    box-shadow 0 0 2px rgba(0,0,0,.1)
    border-top 4px solid #00a1e9
  .g_header_nav .router-link-active li
    color #00a1e9
  .g_header_menu
     float right
  .g_header_menu li
     line-height 70px
     font-size 14px
     color: #333
  .g_header_menu img
    width 30px
    height 30px
    border-radius 50%
    margin 0 10px
    border 1px solid rgba(0,0,0,.1)
    vertical-align middle
  .g_header_menu img:hover
    border 1px solid #00a1e9
    transition: border .4s ease-in-out
  .g_header_menu li:hover
    transition: color .4s ease-in-out
    color: #00a1e9
  .g_header_nav_pile
    padding: 0 10px
  
.g_header_height
  height: 70px
 
 .g_footer
  // position: fixed
  // bottom: 0
  // left: 0
  margin-top 10px
  z-index: 3000
  background: #2c2d2f
  color: #b2b2b2
  height: 73px
  width: 100% 
  vertical-align middle
.g_footer_inner
    width: 1000px
    margin: 0 auto
    text-align center
    padding 20px 0
    font-size 11px  
</style>
