<template>
<div class="organization_ticketsinfo">
  <div class="organization_ticketsinfo_card">
    <div class="organization_ticket_topic">
    <span class="twt--decorator-primary"></span>
      <p>活动进行中</p>
    </div>
    <hr>
    <div class="organization_ticketsinfo_detail">
      <Table border :context="self" :columns="organization_goodcolumns" :data="organization_goodticketsdata"></Table>
    </div>
  </div>
  <div class="organization_ticketsinfo_card">
    <div class="organization_ticket_topic">
      <span class="twt--decorator-primary"></span>
      <p>抢票已结束</p>
    </div>
    <hr>
    <div class="organization_ticketsinfo_detail">
      <Table border :context="self" :columns="organization_badcolumns" :data="organization_badticketsdata"></Table>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        self: this,
        organization_goodcolumns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '总票数',
          key: 'number'
        },
        {
          title: '剩余票数',
          key: 'rest'
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
            return `<i-button type="success" size="small" @click="geteditid(row.id)">点击进入编辑</i-button>`;
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render (row, column, index) {
            return `<i-button type="primary" size="small" @click="exData(row.id)">下载抢票名单</i-button>`;
          }
        }
        ],
        organization_badcolumns: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '总票数',
          key: 'number'
        },
        {
          title: '剩余票数',
          key: 'rest'
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
            return `<i-button type="primary" size="small"@click="exData(row.id)">下载抢票名单</i-button>`;
          }
        }
        ],
        organization_badticketsdata: [],
        organization_goodticketsdata: []
      };
    },
    methods: {
      success () {
        this.$Message.success('下载成功喽');
      },
      geteditid (id) {
         this.$router.push({path: 'edittickets', query: { id: id }});
      },
      remove (index) {
        this.organization_goodticketsdata.splice(index, 1);
      },
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      fetchDate () {
        this.$http.post('Home/Manage/organization').then((response) => {
      var ticketsdata = response.body.info.ticket;
      var nowtime = Date.parse(new Date());
      nowtime = Math.floor(nowtime / 1000);
      this.organization_badticketsdata = ticketsdata.filter(function (e) { return e.cutofftime <= nowtime; });
      this.organization_goodticketsdata = ticketsdata.filter(function (e) { return e.cutofftime > nowtime; });
      });
      },
      exData (id) {
        window.location.href = window.ticketRoot + '/Home/Ticket/down?id=' + id;
        // this.$http.get('Home/Ticket/down?id=' + id).then((response) => {
        //   this.success();
        //  });
      }
    },
    created () {
      this.fetchDate();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.organization_ticketsinfo_card
  display: block
  margin 10px auto
  max-width 1000px
  min-height 300px
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
.organization_ticket_topic
  margin-left 55px
  padding 20px 0
  
  position: relative
.organization_ticket_topic p
  font-size 18px
  padding-left 20px
.organization_ticketsinfo_detail
  width 90%
  margin 20px auto
.organization_ticketsinfo_card hr
  border: 0
  border-top: 1px solid #eee
</style>
