<template>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
    <div class="goods-list">
      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
        <img
          src="https://res0.vmallres.com/pimages//frontLocation/content/jydOBP0RiOlY6SDFCygr.png"
          alt
        >
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{item.sell_price}}</span>
            <span class="old">￥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩余{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div>
      <mt-button type="danger" size="large" @click="getMore">出来吧皮卡丘</mt-button>
    </div>
  </mt-loadmore>
</template>
<script>
export default {
  data() {
    return {
      goodslist: [],
      pageindex: 1
    };
  },
  created() {
    this.getGoodslist();
  },
  methods: {
    getGoodslist() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (result.data.status === 0) {
            if (this.pageindex == 1) {
              // 重置下拉状态
              this.$refs.loadmore.onTopLoaded();
              // 直接赋值第一页的数据
              this.goodslist = result.data.message;
            } else {
              // 重置上拉状态
              if (result.data.message.length == 0) {
                this.allLoaded = true;
              } else {
              }
              // 重置上拉状态
              this.$refs.loadmore.onBottomLoaded();
              this.goodslist = this.goodslist.concat(result.data.message);
            }
            // this.goodslist = this.goodslist.concat(result.data.message);
            console.log(this.goodslist);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodslist();
    },
    goDetail(id) {
      //:bottom-all-loaded="allLoaded"
      //   this.$router.push("/home/goodsinfo/" + id);
      this.$router.push({ name: "goodsinfo", params: { id } });
    },
    loadTop() {
      this.pageindex = 1;
      this.getGoodslist();
      //this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.pageindex++;
      this.getGoodslist();
      //this.allLoaded = true;
      //this.$refs.loadmore.onBottomLoaded();
    }
    // allLoaded() {
    //   if (result.data.message.length == 0) {
    //     this.allLoaded = true;
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8xp #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
