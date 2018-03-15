<template>
<div class="user">
  <div class="user_nav_card">
    <div class="user_nav">
      <ul class="user_nav">
      <router-link :to="{ path: '/user/personinfo'}">
        <li><Icon type="person" style="padding-right:5px;"></Icon><span>个人资料</span></li>
      </router-link>
      <router-link :to="{ path: '/user/ticketsinfo'}">
        <li><Icon type="navicon" style="padding-right:5px;"></Icon><span>票务信息</span></li>
      </router-link>
     <!--  <router-link :to="{ path: '/user/notice'}">
        <li><Icon type="android-notifications-none" size="20" style="padding-right:5px;"></Icon>
        <span>通知</span></li>
      </router-link> -->
      </ul>
    </div>
  </div>

  <div class="user_content">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
};

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.user_nav_card
    display: block
    margin 10px auto
    height 80px
    max-width 1000px
    background-color: #fff
    border-radius: 3px
    box-shadow: 0 1px 2px 0 rgba(8,1,3,.15)
.user_nav
  white-space nowrap
.user_nav li
    cursor: pointer
    display: inline-block
    vertical-align middle
    font-size 18px
    color #333
    line-height 72px
    margin-left 120px
    padding 4px 2px 0 2px
    border-bottom: 4px solid transparent
    overflow hidden
.user_nav li:hover
    border-bottom 4px solid #00a1e9
.user_nav .router-link-active li
   border-bottom 4px solid #00a1e9
</style>
