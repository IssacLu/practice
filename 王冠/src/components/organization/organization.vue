<template>
<div class="organization">
 <div class="organization_nav_card">
    <div class="organization_nav">
      <ul class="organization_nav">
      <router-link :to="{ path: '/organization/organizationinfo'}">
        <li><Icon type="person" style="padding-right:5px;"></Icon><span>机构资料</span></li>
      </router-link>
      <router-link :to="{ path: '/organization/publishticket'}">
        <li><Icon type="edit"></Icon><span>发布抢票</span></li>
      </router-link>
      <router-link :to="{ path: '/organization/checktickets'}">
        <li><Icon type="navicon" style="padding-right:5px;"></Icon><span>票务信息</span></li>
      </router-link>
      <Poptip title="提示标题" content="请从票务信息内点击进入编辑" placement="right">
        <li><Icon type="compose"></Icon><span>编辑抢票</span></li>  
      </Poptip>
      </ul>
    </div>
 </div>

  <div class="organization_content">
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
.organization_nav_card
    display: block
    margin 10px auto
    height 80px
    max-width 1000px
    background-color: #fff
    border-radius: 3px
    box-shadow: 0 1px 2px 0 rgba(8,1,3,.15)
.organization_nav
  white-space nowrap
.organization_nav li
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
.organization_nav li:hover
    border-bottom 4px solid #00a1e9
.organization_nav .router-link-active li
   border-bottom 4px solid #00a1e9
</style>
