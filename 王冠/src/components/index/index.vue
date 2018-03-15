<template>
  <div class="index">

    <div class="banner_wrapper">
      <img src="./banner.jpg">
    </div>

    <div class="index_content">
    <div class="index_content_wrapper">
        <Row :gutter="20">
          <Col span="16">
           <div class="index_ticket_card">
            <div class="index_searchwrapper">
              <div class="index_filter">
              <span>筛选：</span>
               <Dropdown  @on-click="indextypefilter">
                <Button type="primary" style="max-width:102px;">
                  {{q1}}
                  <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list" style="text-align:center;">
                <Dropdown-item name="全部类型">全部类型</Dropdown-item>
                  <Dropdown-item name="讲座">讲座</Dropdown-item>
                  <Dropdown-item name="车票">车票</Dropdown-item>
                  <Dropdown-item name="晚会">晚会</Dropdown-item>
                  <!-- <Dropdown-item name="其他">其他</Dropdown-item> -->
                </Dropdown-menu>
              </Dropdown>
               <Dropdown @on-click="indexorderfilter">
                <Button type="primary" style="min-width:102px;">
                 {{q2}}
                  <Icon type="arrow-down-b"></Icon>
                </Button>
                <Dropdown-menu slot="list" style="text-align:center;">
                <Dropdown-item name="1">截止时间从早到晚</Dropdown-item>
                  <Dropdown-item name="2">截止时间从晚到早</Dropdown-item>
                  <Dropdown-item name="3">票剩余量从少到多</Dropdown-item>
                  <Dropdown-item name="4">票剩余量从多到少</Dropdown-item>
                </Dropdown-menu>
              </Dropdown>
            </div>
              <div class="index_search">
                <Input v-model="searchinput" icon="ios-search-strong" placeholder="请输入活动名称" style="max-width: 200px;"  @on-click="search" @on-enter="search"></Input>
              </div>
            </div>
          </div>
          <transition-group name="fade" tag="p">
            <div class="index_ticket_card"
            v-for="(ticket, index) in computedList"
            v-bind:key="ticket.id"
            v-bind:data-index="index">
            <span class="twt--decorator-primary"></span>
              <p class="ticket_name">{{ticket.name}}</p>
              <p class="ticket_type">类型：{{ticket.type}}</p>
              <p class="ticket_place">地点：{{ticket.place}}</p>
              <p class="ticket_totalnum">总票数：{{ticket.number}}</p>
              <p class="ticket_deadline">抢票截止时间：{{ticket.cutofftime}}</p>
              <p class="ticket_addword_sign" @click="addword_togger(ticket)">补充说明<a><Icon type="arrow-right-b" v-if="!ticket.addwordactive"></Icon><Icon type="arrow-down-b" v-if="ticket.addwordactive"></Icon></a></p>
               <!-- <div :class="{ticket_addword_open:isaddwordactive,ticket_addword:!isaddwordactive}"> -->
               <transition name="fade">
               <div v-show="ticket.addwordactive" class="ticket_addword_open" v-html="ticket.detail">
              </div>
              </transition>
              <div class="ticket_pic_wrapper">
                <img v-if="ticket.rest > 5" src="static/blue_ticket.png">
                <img v-else-if="ticket.rest == 0" src="static/grey_ticket.png">
                <img v-else src="static/red_ticket.png">
                <span class="ticket_num">{{ticket.rest}}</span>
                <Button v-if="ticket.rest > 5" @click="show_chooseticket(ticket)" type="primary" style="position:absolute;
                  top: 95px; right:22px; background-color:rgba(22, 155, 213, 1); display:block;">立即抢票</Button>
                  <Button v-else-if="ticket.rest == 0" @click="show_chooseticket(ticket)" style="position:absolute;
                  top: 95px; right:22px; background-color:rgb(153, 153, 153);border-color:#999;color:#fff; display:block;" disabled>立即抢票</Button>
                   <Button v-else @click="show_chooseticket(ticket)" style="position:absolute;
                  top: 95px; right:22px; background-color:rgba(255, 77, 77, 0.48); border-color: rgba(255, 51, 0, 0.6);; color:#fff;display:block;">立即抢票</Button>
                </div>
              
            </div>
            </transition-group>

          </Col>
          <Col span="8">
            <div class="index_ticket_card  index_ticket_notice">
              <p class="ticket_notice_topic">
                抢票须知
              </p>
              <div class="ticket_notice_detailwrapper"><p
              class="ticket_notice_detail" v-for="notice in notices">{{notice}}</p></div>
            </div>
            <div class="index_ticket_card">
              <div class="ticket_notice_adwrapper">
                <a href="http://mobile.twt.edu.cn">
                  <p class="notice_ad_topic">微北洋3.0</p>
                  <p class="notice_ad_detail">新功能，新体验</p>
                  <img src="./ad.png">
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <Back-top :height="500" :bottom="200">
      <div class="top">返回顶端</div>
    </Back-top>

  <chooseticket :ischooseticketshow="ischooseticketshow" @chooseticket-close="close_chooseticket" :chooseticketid="chooseticketid"></chooseticket>
  </div>
</template>

<script type="text/ecmascript-6">
import chooseticket from '../chooseticket/chooseticket';
export default {
  components: { chooseticket },
   data () {
    return {
      q1: '票务类型',
      q2: '排序方式',
      searchinput: '',
      ischooseticketshow: false,
      chooseticketid: '',
      tickets: [],
      notices: ['1、请使用天外天账号进行抢票。', '2、抢票前请先在个人资料中正确填写您的手机，以便发票方能正确核对您的信息。', '3、每种类型的票只能抢一次，且退票后不得重复再抢该类型的票。', '4、活动具体的入场方式由发票方决定，因此请详细阅读每种票的补充说明以及继续发票方的动态。']
    };
  },
  computed: {
    computedList: function () {
      var vm = this;
      return this.tickets.filter(function (ticket) {
        return ticket.name.toLowerCase().indexOf(vm.searchinput.toLowerCase()) !== -1;
      });
    }
  },
   methods: {
    addword_togger (ticket) {
      ticket.addwordactive = !ticket.addwordactive;
    },
    show_chooseticket (ticket) {
      this.ischooseticketshow = !this.ischooseticketshow;
      this.chooseticketid = ticket.id;
    },
    close_chooseticket () {
      this.ischooseticketshow = !this.ischooseticketshow;
    },
    search () {
      var vm = this;
      this.tickets = this.tickets.filter(function (ticket) {
        return ticket.name.indexOf(vm.searchinput) !== -1;
      });
    },
    indextypefilter (e) {
      switch (e) {
         case '全部类型':
         this.$http.get('Home/Index/index').then((response) => {
          this.tickets = response.body.info;
          this.q1 = e;
         });
         break;
         case '讲座':
         this.$http.get('Home/Index/index?type=讲座').then((response) => {
          this.tickets = response.body.info;
           this.q1 = e;
         });
         break;
         case '车票':
         this.$http.get('Home/Index/index?type=车票').then((response) => {
          this.tickets = response.body.info;
          this.q1 = e;
         });
         break;
         case '晚会':
         this.$http.get('Home/Index/index?type=晚会').then((response) => {
          this.tickets = response.body.info;
          this.q1 = e;
         });
         break;
         case '其他':
         this.$http.get('Home/Index/index?type=其他').then((response) => {
          this.tickets = response.body.info;
          this.q1 = e;
         });
         break;
      }
    },
    indexorderfilter (e) {
      switch (e) {
         case '1':
         this.$http.get('Home/Index/index?order=1').then((response) => {
          this.tickets = response.body.info;
          this.q2 = '截止时间从早到晚';
         });
         break;
         case '2':
         this.$http.get('Home/Index/index?order=2').then((response) => {
          this.tickets = response.body.info;
          this.q2 = '截止时间从晚到早';
         });
         break;
         case '3':
         this.$http.get('Home/Index/index?order=3').then((response) => {
          this.tickets = response.body.info;
          this.q2 = '票剩余量从少到多';
         });
         break;
         case '4':
         this.$http.get('Home/Index/index?order=4').then((response) => {
          this.tickets = response.body.info;
          this.q2 = '票剩余量从多到少';
         });
         break;
      }
    },
    fetchDate () {
      this.$http.get('Home/Index/index').then((response) => {
      this.tickets = response.body.info;
    });
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
  .banner_wrapper
    width 100%
    text-align center
    padding 10px 0
  .banner_wrapper img
    max-width 1200px
  .index_searchwrapper
    display flex
    justify-content space-between
    margin 10px 10px
    white-space nowrap
    overflow hidden
  .index_filter>span
    font-size 18px
    vertical-align middle
  // .index_filter
  //   background-color blue
  // .index_search
  //   background-color red
  .index_content
    width 100% 
  .index_content_wrapper
    max-width 1000px
    margin 0 auto
  .index_ticket_card
    position relative
    display: block
    // height 200px
    margin-top 10px
    background-color: #fff
    border-radius: 2px
    border: 1px solid transparent
    box-shadow: 0 1px 2px 0 rgba(8,1,3,.15)
  .twt--decorator-primary 
    width: 5px
    height: 35px
    background-color: rgb(0, 183, 238)
    position: absolute
    top: 10px
    left: -3px
  .ticket_name
    font-size 23px
    padding 12px 0 8px 20px
    color #5a5959
    width 350px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .ticket_type,.ticket_place,
  .ticket_totalnum,.ticket_deadline
    color #5a5959
    font-size 15px
    padding 5px 20px
  .index_ticket_card .ticket_pic_wrapper
    position absolute
    top 20px
    right 20px
  .ticket_pic_wrapper img
    width 130px
  // .ticket_pic_wrapper 
  .ticket_num
     position absolute
     top 20px
     right 0
     width 130px
     text-align center
     font-size 50px
     font-family KaiTi
  .ticket_addword_sign
     padding 5px 20px
     font-size 15px
     color: #00a1e9   
  .ticket_addword_sign a
    padding-left:10px
  .ticket_addword
    display none
  .ticket_addword_open
    display block
    padding 5px 20px
    font-size 14px
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-active
      opacity: 0
  
   .index_ticket_notice
     background-color: rgb(22, 155, 213)
     height 350px
     color #fff
   .ticket_notice_topic
     font-size 20px
     text-align center
     padding-top 30px
   .ticket_notice_detailwrapper
     width 85%
     margin 0 auto
     padding-top 5px
     height 80%
     overflow hidden
     text-overflow ellipsis
   .ticket_notice_detail
     font-size 14px
     padding-bottom 10px
   .ticket_notice_adwrapper img
     width 85%
   .ticket_notice_adwrapper
     text-align center
     height 320px
   .notice_ad_topic
     font-size 21px
     padding-top 20px
   .notice_ad_detail
     font-size 20px
     padding-top 10px
     padding-bottom 20px
    .fade-enter-active, .fade-leave-active
      transition: opacity .5s
    .fade-enter, .fade-leave-active
      opacity: 0
    .top
      padding: 10px
      margin-right 30px
      background: rgba(0, 153, 229, .7)
      color: #fff
      text-align: center
      border-radius: 2px  
</style>

