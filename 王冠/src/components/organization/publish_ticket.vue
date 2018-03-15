<template>
<div class="organization_personinfo">

  <div class="organization_personinfo_card">
    <div class="organization_personinfo_topic">
      <span class="twt--decorator-primary"></span>
      <p>基本信息<span>(必填)</span></p>
    </div>
    <hr>
    <div class="organization_personinfo_datailwrapper">
      <Form :model="activity" label-position="right" :label-width="100">
        <Form-item label="活动名称">
          <Input v-model="activity.activity_name"></Input>
        </Form-item>
        <Form-item label="活动类型">
          <Radio-group v-model="activity.activity_type">
                <Radio label="讲座">讲座</Radio>
                <Radio label="车票">车票</Radio>
                <Radio label="晚会">晚会</Radio>
                <!-- <Radio label="other">其他</Radio> -->
          </Radio-group>
        </Form-item>
        <Form-item label="活动地点">
          <Input v-model="activity.activity_place"></Input>
        </Form-item>
        <Form-item label="抢票截止时间">
          <Row>
            <Col span="11">
            <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="activity.cutofftime"></Date-picker>
            </Col>
          </Row>
        </Form-item>
      </Form>
    </div>
    <div>   
    </div>
  </div>

  <div class="organization_personinfo_card">
    <div class="organization_personinfo_topic">
      <span class="twt--decorator-primary"></span>
      <p>票务属性<span>(必填)</span></p>
    </div>
    <hr>
    <div class="organization_personinfo_datailwrapper">
      <Form ref="activity" :model="activity" :label-width="80">
        <Form-item
        v-for="(item, index) in activity.items"
        :key="item"
        :label="'票种' + (index + 1)"
        :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
        <Row>
          <Col span="12">
            <Input type="text" v-model="item.typename" placeholder="请输入票的类型"></Input>
          </Col>
          <Col span="4" offset="1" >
             <Input v-model="item.number" placeholder="票数"></Input>
          </Col>
          <Col span="4" offset="2">
            <Button type="warning" @click="handleRemove(index)">删除</Button>
          </Col>
        </Row>
      </Form-item>
      <Form-item>
        <Row>
          <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
          </Col>
        </Row>
      </Form-item>
    </Form>
    </div>
    <div>   
    </div>
  </div>

  <div class="organization_personinfo_card">
    <div class="organization_personinfo_topic">
      <span class="twt--decorator-primary"></span>
      <p>补充说明<span>(选填)</span></p>
    </div>
    <hr>
    <div class="organization_personinfo_textareawrapper">
    <Form>
      <Form-item>
      <md-card style="width:100%;height:100%;">
      <md-card-actions v-md-ink-ripple>
      </md-card-actions>
      <md-card-media>
        <div class="quill-editor-example">
          <!-- quill-editor -->
          <quill-editor v-model="activity.textarea"
          :options="editorOption" style="height:200px">
          <div id="toolbar" slot="toolbar">
            <!-- Add a bold button -->
            <button class="ql-bold">Bold</button>
            <button class="ql-italic">Italic</button>
            <!-- Add font size dropdown -->
           <!--  <select class="ql-size">
              <option value="small"></option>
              Note a missing, thus falsy value, is used to reset to default
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select> -->
            <!-- Add subscript and superscript buttons -->
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
          </div>
        </quill-editor>
      </div>
    </md-card-media>
  </md-card>
        <!-- <Input v-model="activity.textarea" type="textarea" :rows="6" placeholder="请输入..." style="width:100%;height:100%;"></Input> -->
      </Form-item>
      <Form-item style="padding-top:40px">
         <Button type="primary" @click="handleSubmit" style="width:50%; margin-left:25%;">提交</Button>
      </Form-item>
    </Form>
    </div>
    <div>   
    </div>
  </div>

</div>
</template>

<script type="text/ecmascript-6">
import { quillEditor } from 'vue-quill-editor';
export default {
  components: {
    quillEditor
  },
  data () {
    return {
    activity: {
      activity_name: '',
      activity_type: '',
      activity_place: '',
      cutofftime: '',
      textarea: '',
      items: [
      {
        typename: '',
        number: ''
      }
      ]
    },
    name: 'custom-toolbar-example',
    content: '',
    editorOption: {
      modules: {
        toolbar: '#toolbar'
      }
    }
  };
  },
  methods: {
    handleSubmit () {
      this.$http.post('Home/Ticket/add', {
        name: this.activity.activity_name,
        type: this.activity.activity_type,
        place: this.activity.activity_place,
        cutofftime: Math.floor(this.activity.cutofftime.getTime() / 1000),
        detail: this.activity.textarea,
        tickettype: JSON.stringify(this.activity.items)
      }).then((response) => {
        console.log(this.activity.cutofftime.getTime());
        this.$Message.success('发布成功！');
    });
      // console.log(this.activity.cutofftime);
      // console.log(this.activity.items);
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    handleAdd () {
      this.activity.items.push({
        typename: '',
        number: ''
      });
      console.log(this.activity.textarea);
    },
    handleRemove (index) {
      this.activity.items.splice(index, 1);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.organization_personinfo_card
  display: block
  margin 10px auto
  max-width 1000px
  background-color: #fff
  border-radius: 3px
  box-shadow: 0 1px 2px 0 rgba(8,1,3,.15)
  color #5a5959
  padding-bottom 10px
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
.organization_personinfo_topic p span
  font-size 12px
  padding-left 5px
.organization_personinfo_datailwrapper
  padding-top 50px
  width 60%
  margin-left 8%
.organization_personinfo_textareawrapper
  width 80%
  margin-left 10%
  padding-top 40px
  height 450px
.organization_personinfo_card hr
  border: 0
  border-top: 1px solid #eee
.ql-container .ql-editor 
  min-height: 20em
  padding-bottom: 1em
  max-height: 25em
.html 
  height: 9em
  overflow-y: auto
  border: 1px solid #ccc
  border-top: none
  resize: vertical
.quill-editor-example
  width 90%
  margin 20px auto
  
</style>
