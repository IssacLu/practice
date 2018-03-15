<template>
  <div class="user_notice">
    <div class="user_notice_card">
      <div class="notice_topic">
        <span class="twt--decorator-primary"></span>
        <p>通知来啦</p>
      </div>
      <hr>
      <div class="notice-nav">
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <Menu-item name="1">
          系统消息
        </Menu-item>
        <Menu-item name="2">
          我的私信
        </Menu-item>
        <Menu-item name="3">
          票务提醒
        </Menu-item>
      </Menu>
      </div>
      <div class="notice-content">
        <div class="layout_content_main">
          <div class="notice_lists">
            <div class="notice_everylist">
              <div class="notice_box clearfix">
                <p class="notice_type already_read">系统消息</p>
                <div class="notice_detail_box">
                  <p class="notice_detail already_read_p">你的一个解答，可以帮助别人少走很多弯路，慕无忌1559429</p>
                  <p class="notice_time already_read_p">2017-04-21 15:09:16</p>
                </div>
              </div>
            </div>
            <div class="notice_everylist">
              <div class="notice_box clearfix">
                <p class="notice_type already_read">我的私信</p>
                <div class="notice_detail_box">
                  <p class="notice_detail already_read_p">你的一个解答，可以帮助别人少走很多弯路，慕无忌1559429</p>
                  <p class="notice_time already_read_p">2017-04-21 15:09:16</p>
                </div>
              </div>
            </div>
            <div class="notice_everylist">
              <div class="notice_box clearfix">
                <p class="notice_type already_read">票务提醒</p>
                <div class="notice_detail_box">
                  <p class="notice_detail already_read_p">你的一个解答，可以帮助别人少走很多弯路，慕无忌1559429</p>
                  <p class="notice_time already_read_p">2017-04-21 15:09:16</p>
                </div>
              </div>
            </div>
            <div class="notice_everylist">
              <div class="notice_box clearfix">
                <p class="notice_type">系统消息</p>
                <div class="notice_detail_box">
                  <p class="notice_detail">你的一个解答，可以帮助别人少走很多弯路，慕无忌1559429</p>
                  <p class="notice_time">2017-04-21 15:09:16</p>
                </div>
              </div>
            </div>
            <div class="notice_everylist">
              <div class="notice_box clearfix">
                <p class="notice_type">我的私信</p>
                <div class="notice_detail_box">
                  <p class="notice_detail">你的一个解答，可以帮助别人少走很多弯路，慕无忌1559429</p>
                  <p class="notice_time">2017-04-21 15:09:16</p>
                </div>
              </div>
            </div>
            <div class="notice_everylist">
              <div class="notice_box clearfix">
                <p class="notice_type">票务提醒</p>
                <div class="notice_detail_box">
                  <p class="notice_detail">你的一个解答，可以帮助别人少走很多弯路，慕无忌1559429</p>
                  <p class="notice_time">2017-04-21 15:09:16</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.user_notice_card
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
.notice_topic
  margin-left 60px
  padding-top 20px
  padding-bottom 20px
  position: relative
.notice_topic p
  font-size 18px
  padding-left 20px
.notice_datailwrapper
  padding-top 50px
  width 60%
  margin-left 8%
.user_notice_card hr
  border: 0
  border-top: 1px solid #eee
.notice-content
  width 80%
  margin 0 auto
.notice-nav
  width 85%
  padding-top 20px
  margin 0 auto
.notice_lists
  width: 100%
.notice_everylist
  position: relative
  width: 100%
  box-sizing: border-box
  border-bottom: 1px solid #d9dde1
  overflow: hidden
.notice_box
  padding: 20px 10px
.clearfix
  overflow: auto
.notice_type
  width: 80px
  height: 30px
  border: 1px solid #f01414
  background: #fde7e5
  color: #f01414
  line-height: 30px
  text-align: center
  margin-right: 20px
  font-size: 14px
  float: left
.already_read
  border: 1px solid #d9dde1
  background: #fff
  color: #93999f
.notice_detail_box
  width: 80%
  float: left
  font-family: "微软雅黑"
.notice_detail
  color: #4d555d
  font-size: 16px
  font-family: "微软雅黑"
.already_read_p
  color: #93999f
  
</style>
