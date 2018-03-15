<template>
<div class="organization_personinfo">
  <div class="organization_personinfo_card">
    <div class="organization_personinfo_topic">
      <span class="twt--decorator-primary"></span>
      <p>机构资料</p>
    </div>
    <hr>
    <div class="organization_personinfo_datailwrapper">
      <Form :model="formRight" label-position="right" :label-width="100">
        <Form-item label="天外天账号">
          <Input v-model="formRight.organization_nickname" disabled></Input>
        </Form-item>
        <Form-item label="机构名称">
          <Input v-model="formRight.organization_name" disabled></Input>
        </Form-item>
        <Form-item label="机构编号">
          <Input v-model="formRight.organization_num" disabled></Input>
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
    return {
     formRight: {
      organization_nickname: 'tianjingongjiao',
      organization_name: '天津公交公司',
      organization_num: '90000001'
    }
    };
  },
    methods: {
      fetchDate () {
        this.$http.post('Home/Manage/organization').then((response) => {
          this.formRight.organization_nickname = response.body.info.organization.username;
          this.formRight.organization_name = response.body.info.organization.name;
          this.formRight.organization_num = response.body.info.organization.id;
      });
      }
    },
    created () {
      this.fetchDate();
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.organization_personinfo_card
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
.organization_personinfo_topic
  margin-left 60px
  padding-top 20px
  padding-bottom 20px
  position: relative
.organization_personinfo_topic p
  font-size 18px
  padding-left 20px
.organization_personinfo_datailwrapper
  padding-top 50px
  width 60%
  margin-left 8%
.organization_personinfo_card hr
  border: 0
  border-top: 1px solid #eee
  
</style>
