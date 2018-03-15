<template>
  <div class="chooseticket">
  <div class="chooseticket_wrapper">
    <div class="chooseticket_cover" v-if="ischooseticketshow" @click="closemyself"></div>
    <transition name="drop">
    <div class="chooseticket_content" v-if="ischooseticketshow">
      <div class="chooseticket_close"  @click="closemyself">
      <Icon type="ios-close-empty"></Icon>
      </div>
      <p class="choose_ticket_name">
      {{ticket.name}}</p>
      <p class="choose_ticket_time">总票数：{{ticket.number}}</p>
      <p class="choose_ticket_place">地点：{{ticket.place}}</p>
      <p class="choose_ticket_deadline">抢票截止时间：{{ticket.cutofftime}}</p>
      <div class="choose_helpline"></div>
      <p class="choose_ticket_type">票务种类<span>(剩余：{{ticket.rest}}张)</span></p>
      <div  class="choose_tickets_buttonwrapper">
        <div v-for="item in items"><Button type="primary" style="width:100%;"  v-if="item.number>0" @click="gettickettypeid(item.id, item.typename)">{{item.typename}}</Button></div>
    <!--     <div><Button type="primary" style="width:100%;" disabled>一等票</Button></div>-->
        <div v-for="item in items"><Button type="primary" style="width:100%;" disabled v-if="item.number===0"  @click="gettickettypeid(item.id, item.typename)">{{item.typename}}</Button></div>
        <!-- <div><Button type="primary" style="width:100%;">普通票</Button></div> -->
      </div>
       <p style="padding-left:20px;">您选中的是票种是：{{choosed}}</p>
      <div class="choose_helpline" style="margin-top:20px;"></div>
      <div class="choose_addwords_topic">补充说明 :</div>
      <div class="choose_addwords_detail">
        <p v-html="ticket.detail"></p>
      </div>
      <div class="choose_button_height"></div>
      <div class="choose_button_input" style="text-align:center;">
        <!-- <Button type="primary" style="width:100%; height:100%;border-radius:0;"  @click="instance('success')"><span>立即抢票</span></Button> -->
        <Button type="primary" style="width:100%; height:100%;border-radius:0;"  @click="book"><span>立即抢票</span></Button>
       <!-- @click="instance('状态') 未登录或机构用户为info抢票成功为success,绑定手机号为warning,抢票失败为error -->
      </div>
    </div>
    </transition>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    ischooseticketshow: {
      type: Boolean,
      default: false
    },
    chooseticketid: {}
  },
  data () {
    return {
      tickets: {},
      ticket: {},
      items: [],
      tickettypeid: {},
      choosed: ''
    };
  },
  methods: {
    closemyself () {
      this.$emit('chooseticket-close');
    },
    showmyself () {
      this.fetchDate();
    },
    instance (type) {
      switch (type) {
         case 4:
         this.$Modal.info({
          title: '抢票未完成',
          content: '<p>机构和游客不能参与抢票哦</p><p>请用个人用户登录后再来参与抢票</p>'
        });
         break;
         case 3:
         this.$Modal.info({
          title: '抢票未完成',
          content: '<p>您未选中任何一张抢票</p><p>请选择后点击立即抢票</p>'
        });
         break;
        case 1:
        this.$Modal.success({
          title: '抢票成功',
          content: '<p>恭喜你抢到这张票</p><p>快去个人中心欢喜地查看这张抢票吧</p>'
        });
        break;
        case 'warning':
        this.$Modal.warning({
          title: '抢票未完成',
          content: '<p>抢票前要在个人中心绑定手机号哦</p><p>绑定完成再来参与抢票！</p>'
        });
        break;
        case 2:
        this.$Modal.error({
          title: '抢票失败',
          content: '<p>对不起</p><p>不能多次抢票</p><p>去看看其他抢票</p>'
        });
        break;
         case 11:
        this.$Modal.error({
          title: '抢票失败',
          content: '<p>请选中所需票种！</p>'
        });
        break;
        case 12:
        this.$Modal.error({
          title: '抢票失败',
          content: '<p>请先在个人中心绑定手机号！</p>'
        });
        break;
      }
    },
    gettickettypeid (id, choosed) {
       this.tickettypeid = id;
       this.choosed = choosed;
    },
    book () {
      if (this.choosed === '') {
         this.instance(11);
      } else {
        this.$http.post('Home/Book/book', {tickettypeid: this.tickettypeid}, {emulateJSON: true}).then((response) => {
        if (response.body.status === 1) {
           this.instance(1);
        }
        if (response.body.info === '不能多次抢票') {
           this.instance(2);
        }
        if (response.body.info === '用户未登录') {
           this.instance(4);
        }
        if (response.body.info === '余票不足') {
           this.instance(3);
        }
        if (response.body.info === '请先在个人中心输入手机号') {
           this.instance(12);
        }
      });
      }
    },
    fetchDate () {
      this.choosed = '';
      if (this.ischooseticketshow) {
        this.$http.get('Home/Index/index').then((response) => {
          this.tickets = response.body.info;
          var vm = this;
          this.ticket = this.tickets.filter(function (e) { return e.id === vm.chooseticketid; })[0];
        });
        // this.$http.post('Home/Ticket/read', {id: this.chooseticketid}, {emulateJSON: true}).then((response) => {
        //   this.items = response.body.info.tickettype;
        // });
        this.$http.post('Home/Index/read', {id: this.chooseticketid}, {emulateJSON: true}).then((response) => {
          this.items = response.body.info;
        });
      }
    }
  },
  watch: {
     ischooseticketshow: 'showmyself',
     $route: 'fetchDate'
  },
  created () {
      this.fetchDate();
    }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
.drop-enter-active
  transition: all .5s ease
.drop-leave-active
  transition: all .5s ease
.drop-enter
  transform: translateY(-1000px)
.drop-leave-active
  transform: translateY(-1000px)
.chooseticket_wrapper
  position fixed
  width 100%
  height 100%
.chooseticket_cover
  background: #000
  opacity: .3
  position: fixed
  z-index: 40
  top: 0
  left: 0
  width: 100%
  height: 100%
.chooseticket_content
  color rgba(70,76,91,.9)
  position fixed
  width 38%
  top 15%
  left 50%
  margin-left -19%
  z-index 80
  display: block
  background-color: #fff
  border-radius: 2px
  border: 1px solid transparent
  box-shadow: 0 1px 2px 0 rgba(8,1,3,.15)
.chooseticket_close
  position:absolute
  top: 0
  right:18px
  cursor:pointer
  font-size:40px
.chooseticket_close:hover
  color red
.choose_ticket_name
  font-size 25px
  margin 40px 0 10px 20px
.choose_ticket_time,.choose_ticket_place,.choose_ticket_deadline
  font-size 15px
  margin 3px 0 5px 35px
.choose_ticket_deadline
  padding-bottom 20px
.choose_helpline
  margin 0 auto
  width 95%
  height 0
  position: relative
  &:after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid #dfe4e9
    content: ''
.choose_ticket_type
  font-size 17px
  margin 20px 0 10px 20px
  padding-top 10px
.choose_ticket_type span
  font-size 12px
  padding-left 10px
.choose_tickets_buttonwrapper
  display flex
  flex-wrap: wrap
  justify-content: space-around
  width 90%
  margin 10px auto
.choose_tickets_buttonwrapper div
  width 200px
  margin 10px
.choose_addwords_topic
  font-size 17px
  margin 40px 0 10px 20px
.choose_addwords_detail
  margin 0 20px
  font-size 14px
.choose_button_input
  width:100%
  height 45px
  position absolute
  bottom -1px
  left 0
  border-radius 0 !important
.choose_button_input span
   font-size 18px
   letter-spacing 5px
.choose_button_height
  height 80px
</style>

