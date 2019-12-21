<template>
  <div class="cmt-container">
    <h1>发表评论</h1>
    <hr>
    <textarea placeholder="你想表达什么(不想跟你说话)" maxlength="110" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time }}</div>
        <div class="cmt-body">{{item.content==='undefined'?'没有输入':item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      comments: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("/api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          console.log(result, 1111);
          if (result.data.status === 0) {
            this.comments = this.comments.concat(result.data.message);
            console.log(this.comments, 121);
          } else {
            return Toast("失败");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("不能为空");
      }
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(result => {
          console.log(this);
          if (result.data.status === 0) {
            var cmt = {
              user_name: "今晚月色真美",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            console.log(cmt);
            this.comments.unshift(cmt);
            this.msg = "";
          }
        });
    }
  },

  props: ["id"]
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
