<template>
<div class="user_ticketsinfo">
  <Modal v-model="modal2" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="information-circled"></Icon>
      <span>退票确认</span>
    </p>
    <div style="text-align:center">
      <p>退票后，将无法再次抢到此活动的票</p>
      <p>是否继续退票？</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long :loading="modal_loading" @click="del(index)">确认</Button>
    </div>
  </Modal>

  <div class="user_ticketsinfo_card">
    <div class="user_ticket_topic">
    <span class="twt--decorator-primary"></span>
      <p>未使用</p>
    </div>
    <hr>
    <div class="ticketsinfo_detail">
      <Table border :context="self" :columns="goodcolumns" :data="goodticketsdata"></Table>
    </div>
  </div>
  <div class="user_ticketsinfo_card">
    <div class="user_ticket_topic">
      <span class="twt--decorator-primary"></span>
      <p>已过期</p>
    </div>
    <hr>
    <div class="ticketsinfo_detail">
      <Table border :context="self" :columns="badcolumns" :data="badticketsdata"></Table>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tickettypeid: '',
        userid: '',
        index: '',
        modal2: false,
        modal_loading: false,
        self: this,
        goodcolumns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '票种',
          key: 'typename'
        },
        {
          title: '活动地点',
          key: 'place'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render (row, column, index) {
            // return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="modal2 = true" @click="remove(${index})">退票</i-button>`;
            return `<i-button type="primary" size="small" @click="showa(${index})">查看</i-button> <i-button type="error" size="small" @click="modal2true(${index},row.id)">退票</i-button>`;
          }
        }
        ],
        badcolumns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '票种',
          key: 'typename'
        },
        {
          title: '活动地点',
          key: 'place'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render (row, column, index) {
            return `<i-button type="primary" size="small" @click="showb(${index})">查看</i-button>`;
          }
        }
        ],
        badticketsdata: [],
        goodticketsdata: []
      };
    },
    methods: {
      showa (index) {
        console.log(index);
        this.$Modal.info({
          title: '票务信息',
          content:
           `<p style="font-size:14px; overflow:hidden;">活动名称:${this.goodticketsdata[index].name}
           <br>票种: ${this.goodticketsdata[index].typename}
           <br>类型: ${this.goodticketsdata[index].type}
           <br>主办单位: ${this.goodticketsdata[index].organizationname}
           <br>活动地点: ${this.goodticketsdata[index].place}
           <br>补充说明： ${this.goodticketsdata[index].detail}
           </p>`
        });
      },
      showb (index) {
        console.log(index);
        this.$Modal.info({
          title: '票务信息',
          content:
           `<p style="font-size:14px; overflow:hidden;">活动名称:${this.badticketsdata[index].name}
           <br>票种: ${this.badticketsdata[index].typename}
           <br>类型: ${this.badticketsdata[index].type}
           <br>主办单位: ${this.badticketsdata[index].organizationname}
           <br>活动地点: ${this.badticketsdata[index].place}
           <br>补充说明： ${this.badticketsdata[index].detail}
           </p>`
        });
        // <br>活动时间: ${new Date(this.badticketsdata[index].cutofftime * 1000)}
      },
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      del (index) {
        this.modal_loading = true;
        this.$http.post('Home/Book/rebook', {id: this.tickettypeid}).then((response) => {
         this.modal_loading = false;
          this.modal2 = false;
          this.goodticketsdata.splice(index, 1);
          this.$Message.success('退票成功');
      });
      },
      modal2true (index, id) {
        this.modal2 = true;
        this.index = index;
        this.tickettypeid = id;
      },
      fetchDate () {
      this.$http.post('Home/Manage/user').then((response) => {
      this.userid = response.body.info.user.id;
      var ticketsdata = response.body.info.book;
      var nowtime = new Date();
      nowtime = Math.floor(nowtime.getTime() / 1000);
      this.badticketsdata = ticketsdata.filter(function (e) { return e.cutofftime <= nowtime; });
      this.goodticketsdata = ticketsdata.filter(function (e) { return e.cutofftime > nowtime; });
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
.user_ticketsinfo_card
  display: block
  margin 10px auto
  max-width 1000px
  background-color: #fff
  border-radius: 3px
  box-shadow: 0 1px 2px 0 rgba(8,1,3,.15)
  color #5a5959
  padding-bottom 20px
.twt--decorator-primary 
  width: 3px
  height: 25px
  background-color: rgb(0, 183, 238)
  position: absolute
  top: 21px
  left: 0
.user_ticket_topic
  margin-left 55px
  padding 20px 0
  
  position: relative
.user_ticket_topic p
  font-size 18px
  padding-left 20px
.ticketsinfo_detail
  width 90%
  margin 20px auto
  min-height 300px
.user_ticketsinfo_card hr
  border: 0
  border-top: 1px solid #eee
</style>
