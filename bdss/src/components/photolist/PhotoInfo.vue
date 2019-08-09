<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr>
    <div class="thumbs">
      <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
    </div>
    <div class="content" v-html="photoinfo.content"></div>
    <cmmt :id="id"></cmmt>
  </div>
</template>
<script>
import commtt from "../listent/component.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: [],
      slide1: [
        {
          src:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
          msrc:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
          alt: "picture1",
          title: "Image Caption 1",
          w: 600,
          h: 400
        },
        {
          src:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg",
          msrc:
            "https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg",
          alt: "picture2",
          title: "Image Caption 2",
          w: 1200,
          h: 900
        }
      ]
    };
  },
  created() {
    this.getPhotoInfo();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.data.status === 0) {
          this.photoinfo = result.data.message[0];
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  getThumbs() {
    // 获取缩略图
    this.$http.get("api/getthumimages/" + this.id).then(result => {
      if (result.data.status === 0) {
        this.slide1 = result.data.message.map((item, index) => {
          return {
            src: item.src,
            msrc: item.src,
            alt: `picture ${index}`,
            title: `Image Caption ${index}`,
            w: 300,
            h: 300
          };
        });
      }
    });
  },
  components: {
    cmmt: commtt
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
