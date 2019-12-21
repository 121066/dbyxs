<template>
  <div class="goodsDetail-container">
    <!-- 添加商品 -->
    <breadcrumb style="  width: 100%; "></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />

    <div class="content">
      <el-header>
        <h3 class="title">商品详情</h3>
      </el-header>
      <el-main>
        <el-header>
          <span :class="selectCard == 1 ? 'active': ''" @click="select_card(1)">商品信息</span>
          <span :class="selectCard == 2 ? 'active': ''" @click="select_card(2)">商品图片</span>
          <span :class="selectCard == 3 ? 'active': ''" @click="select_card(3)">商品详情</span>
          <span :class="selectCard == 4 ? 'active': ''" @click="select_card(4)">商品标签</span>
          <span :class="selectCard == 5 ? 'active': ''" @click="select_card(5)">商品描述</span>
          <span
            :class="selectCard == 6 ? 'active': ''"
            @click="select_card(6)"
            v-if="positionId == 1"
          >拼单设置</span>
          <span
            :class="selectCard == 7 ? 'active': ''"
            @click="select_card(7)"
            v-if="positionId == 1"
          >砍价设置</span>
        </el-header>
        <el-main>
          <div class="message_left" v-show="selectCard == 1">
            <div>
              <el-radio v-model="radio" :label="1" disabled>实体商品</el-radio>
              <el-radio v-model="radio" :label="2" disabled>虚拟商品</el-radio>
            </div>
            <ul>
              <li v-for="item in goods" :key="item.name" class="ellipsis">
                <span>{{item.name}}</span>: &nbsp;
                <span>{{item.value}}</span>
              </li>
              <li class="ellipsis" v-if="!goodstype">
                <span>{{'地址'}}</span>:&nbsp;
                <span>{{address}}</span>
              </li>
              <li class="ellipsis" v-if="goodstype">
                <span>{{'虚拟商品'}}</span>:&nbsp;
                <span>{{virtualId}}</span>
              </li>
              <li class="ellipsis" v-if="goodstype">
                <span>{{'商品价值'}}</span>:&nbsp;
                <span>{{virtualValue}}</span>元
              </li>
            </ul>
            <el-button
              type="primary"
              style="width: 80px;margin-left: 100px;"
              @click=" show = true"
            >查看标签</el-button>
          </div>
          <div class="message_right" v-show="selectCard == 2">
            <div class="mian_pic">
              <div class="pic_title">图片（主图）</div>
              <img :src="pictureUrl" alt style="width: 130px;height: 130px;" />
            </div>
            <div class="secondary_pic">
              <div class="pic_title">图片（附图）</div>
              <div class="img">
                <img v-for="item in goodsPictures" :key="item.id" :src="item.pictureUrl" alt />
              </div>
            </div>
          </div>
          <div class="goods_detail" v-show="selectCard == 3">
            <el-header>
              <span>商品详情</span>
            </el-header>
            <el-main>
              <ul>
                <li
                  v-for="item in goodsDetail"
                  :key="item.id"
                  class="ellipsis"
                >{{item.key}}：{{item.value}}</li>
              </ul>
            </el-main>
          </div>
          <div class="goods_size" v-show="selectCard == 4">
            <el-header>
              <span>商品标签</span>
            </el-header>
            <el-main>
              <div class="table">
                <el-table :data="goodsList" style="width: 100%">
                  <el-table-column
                    v-for="item of tags"
                    :prop="item.prop"
                    :label="item.label"
                    :key="item.label"
                  ></el-table-column>
                  <!-- <el-table-column prop="" label="大小"></el-table-column>
                  <el-table-column prop="" label="款式"></el-table-column>-->
                  <el-table-column prop="stock" label="库存"></el-table-column>
                </el-table>
              </div>
            </el-main>
            <el-footer>
              <div class="block" style="text-align:center;">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="5"
                  layout="prev,pager,next"
                  :total="total"
                  style="display: inline-block"
                ></el-pagination>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="5"
                  layout="slot,jumper"
                  :total="total"
                  style="display: inline-block"
                >
                  <span style="color: #666;" ref="pageAndTotal"></span>
                </el-pagination>
              </div>
            </el-footer>
          </div>
          <div class="describe" v-show="selectCard == 5">
            <ul>
              <li v-for="item in fileList" :key="item.id">
                <img :src="item.pictureUrl" alt />
              </li>
            </ul>
          </div>
          <!-- 拼单设置 -->
          <div class="setting" v-show="selectCard == 6">
            <div class="set_list" v-for="(item, index) in setting" :key="index">
              <div class="people">
                <span>拼单人数:</span>
                <span>{{item.number}}</span>
                <!-- <el-input v-model="item.num" type="number" @change="check_num(index)"></el-input> -->
                <span>人</span>
              </div>
              <div class="price">
                <span>拼单价格:</span>
                <span>{{item.price}}</span>
                <!-- <el-input v-model="item.price" type="number"></el-input> -->
                <span>元</span>
              </div>
              <!-- <div class="price">
                <span>时间限制:</span>
                <el-input v-model="item.time" type="number"></el-input>
                <span>分钟</span>
              </div>-->
            </div>
          </div>

          <!-- 砍价设置 -->
          <div class="bar" v-show="selectCard == 7">
            <div class="bar_area">
              <span>砍价区域:</span>
              <!-- <el-input v-model="f_price"></el-input> -->
              <span>{{f_price}}</span>
              <span>~</span>
              <span>{{u_price}}</span>
              <!-- <el-input v-model="u_price" @change="compare_price"></el-input> -->
              <span>元</span>
            </div>
          </div>
        </el-main>
      </el-main>

      <!-- <el-footer>
          <el-button type="primary">确定</el-button>
          <el-button >取消</el-button>
      </el-footer>-->
    </div>

    <transition name="el-zoom-in-center">
      <label-container
        class="transition-box"
        v-if="show"
        :show="show"
        @changeShow="changeShow"
        :ids="ids"
        :typeId = "typeId"
        :isModify="isModify"
        @addLabel = "addLabel"
        style="position:absolute;z-index:999"
      ></label-container>
    </transition>
  </div>
</template>

<script>
import breadcrumb from "../../components/breadcrumb";
import labelContainer from "../../components/labelList";

import { get_virtual_list } from "../../api/getData";
import { mapActions } from "vuex";
export default {
  components: { breadcrumb ,labelContainer},
  data() {
    return {
      selectCard: 1,
      radio: 1, //  用于标记是选择实体商品还是虚拟商品
      goods: [],
      currentPage: 1,
      total: 10,
      goodsList: [],
      goodsListCount: [],
      tags: [],
      inputVisible: false,
      input: "",
      id: this.$route.query.id,
      goodsDetail: [],
      options: [],
      pictureUrl: "",
      goodsPictures: [],
      address: "",
      content: "",
      position: [],
      goodstype: "",
      virtualValue: "",
      virtualId: "",
      fileList: [],
      setting: [], //  拼单设置
      u_price: "", // 砍价最低价
      f_price: "", // 砍价最高价
      positionId: 0,
      show: false,
      isModify: false,
      typeId: 1,
    };
  },
  created() {
    this.get_goodsType();
    this.get_goodsDetail();
    this.get_goodsPos();
    this.sava_virtual();
  },
  methods: {
    ...mapActions(["sava_virtual"]),
    select_card(type) {
      this.selectCard = type;
    },
    addLabel(msg,show) {
      this.show = show
    },
    changeShow(show) {
      this.show = show;
    },
    handleCurrentChange(val) {
      this.goodsList = [];
      this.currentPage = val;
      let num = (this.currentPage - 1) * 5;
      this.goodsList = this.goodsListCount.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
    },
    get_goodsDetail() {
      this.$axios.post("/web_goods/get_one", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          let goodsMsg = [];
          let data = result.data.data;
          //  砍价的最高价
          this.u_price = data.goods.upper;
          this.f_price = data.goods.lower;
          this.setting = data.ggps;
          let type = "";
          this.options.forEach(item => {
            if (item.value == data.goods.type) {
              type = item.label;
            }
          });
          let sellStatus = "";
          if (data.goods.sellStatus == 0) {
            sellStatus = "下架";
          } else {
            sellStatus = "在售";
          }
          let proprietary = ""; //是否自营
          if (data.goods.proprietary == 0) {
            proprietary = "不是";
          } else {
            proprietary = "是";
          }
          let expressfree = ""; // 是否免邮
          if (data.goods.expressfree == 0) {
            expressfree = "不包邮";
          } else {
            expressfree = "包邮";
          }
          this.virtualValue = data.goods.virtualValue;
          this.goodsKind.forEach(item => {
            if (item.id == data.goods.goodsKind) {
              this.virtualId = item.name;
            }
          });
          if (data.goods.town == null) {
            data.goods.town = "";
          }
          this.address =
            data.goods.province +
            data.goods.region +
            data.goods.town +
            data.goods.address;

          let position = "";
          this.position.forEach(item => {
            if (item.id == data.goods.positionId) {
              return (position = item.position);
            }
          });
          this.goodstype = parseInt(data.goods.goodsKind);
          if (this.goodstype) {
            this.radio = 2;
          }

          if (this.radio == 1) {
            this.goods = [
              { name: "商品名称", value: data.goods.name },
              { name: "商品长名称", value: data.goods.longName },
              { name: "规格", value: data.goods.specification },
              { name: "是否自营", value: proprietary },
              { name: "所属类型", value: type },
              { name: "库存", value: data.goods.store + "件" },
              {
                name: data.goods.expressfree == 1 ? "是否包邮" : "邮费",
                value:
                  data.goods.expressfree == 1
                    ? expressfree
                    : data.goods.postage + "元"
              },
              { name: "成本价", value: data.goods.cost + "元" },
              { name: "价格", value: data.goods.price + "元" },
              { name: "代理价格", value: data.goods.agentPrice + "元" },

              { name: "状态", value: sellStatus },
              { name: "商品标语", value: data.goods.slogan },
              { name: "活动类型", value: position }
            ];
            this.positionId = data.goods.positionId;
            if (data.goods.positionId == 5) {
              this.goods.push({
                name: "积分价格",
                value: data.goods.pointsPrice + "积分"
              });
            }
          }
          if (this.radio == 2) {
            this.goods = [
              { name: "商品名称", value: data.goods.name },
              { name: "规格", value: data.goods.specification },
              { name: "所属类型", value: type },
              { name: "库存", value: data.goods.store + "件" },
              { name: "成本价", value: data.goods.cost + "元" },
              { name: "价格", value: data.goods.price + "元" },
              { name: "代理价格", value: data.goods.agentPrice + "元" },
              { name: "状态", value: sellStatus },
              { name: "商品标语", value: data.goods.slogan },
              { name: "活动类型", value: position }
            ];
          }
          this.typeId = data.goods.type
          this.pictureUrl = data.goods.pictureUrl;
          this.goodsDetail = data.details;
          this.goodsPictures = data.goodsPictures;
          data.attributes.forEach((item, index) => {
            this.tags.push({
              prop: index + "",
              label: item.attribute.attribute
            });
          });
          data.inventorys.forEach(item => {
            // this.godosList.push({})
            let obj = {};
            item.attributes.forEach((item1, index) => {
              obj[index] = item1;
            });
            obj["stock"] = item.inventory;
            this.goodsListCount.push(obj);
          });

          this.ids = data.ids;
          this.total = this.goodsListCount.length;
          this.fileList = result.data.data.descPictures;

          this.goodsList = this.goodsListCount.slice(0, 5);
          var page = Math.ceil(this.total / 5);
          this.$refs.pageAndTotal.innerHTML = "[共" + page + "页]";
        }
      });
    },
    get_goodsType() {
      this.$axios.post("/web_goods_type/select_box").then(result => {
        if (result.data.status == 0) {
          result.data.data.forEach(item => {
            this.options.push({ value: item.id, label: item.name });
          });
        }
      });
    },
    get_goodsPos() {
      this.$axios.post("/web_goods_pos/list").then(result => {
        if (result.data.status == 0) {
          this.position = result.data.data;
          this.position.forEach(item => {
            if (this.positionId == item.id) {
              this.goods[this.goods.length - 1].value = item.position;
            }
          });
        }
      });
    }
  },
  computed: {
    goodsKind() {
      return this.$store.state.virtualMsg;
    }
  }
};
</script>


<style lang="less">
.goodsDetail-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column;
  > img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    right: 40px;
    z-index: 99;
    cursor: pointer;
  }
  thead tr {
    background-color: #e6e9f2 !important;
  }
  .el-table th {
    background-color: transparent;
  }
  th > .cell {
    text-align: center;
    color: #333;
  }
  .active {
    background-color: #5d70e9 !important;
    color: #fff !important;
  }
  .el-pager li.active {
    background-color: #8b98ed;
    position: relative;
  }
  td > .cell {
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-table tr {
    background-color: tansparent;
  }
  .el-table td,
  .el-table th {
    height: 51px;
  }
  .content {
    padding: 0 30px;
    flex: 1;
    display: flex;
    flex-flow: column;
    .el-header {
      padding: 0;
      height: 70px !important;
      box-sizing: border-box;
      padding-top: 25px;
      .el-input__inner {
        width: 180px;
        height: 30px;
        border-radius: 5px;
      }
      .title {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-weight: 400;
        color: blue;
        font-size: 16px;
        letter-spacing: 3px;
      }
    }
    .el-main {
      margin-top: 15px;
      flex: 1;
      display: flex;
      flex-flow: column;
      background-color: #f6f6f6;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      padding: 20px 70px 0;
      > .el-header {
        height: 35px !important;
        width: 100%;
        padding: 0;
        display: flex;
        border-bottom: 1px solid #dfe2eb;
        span {
          width: 140px;
          height: 35px;
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
          text-align: center;
          background-color: #dfe2eb;
          line-height: 35px;
          margin-right: 10px;
          color: #666;
          cursor: pointer;
        }
      }
      > .el-main {
        padding: 0;
        position: relative;
        .message_left {
          padding-top: 10px;
          ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 20px 100px;
            box-sizing: border-box;
            li {
              width: 50%;
              line-height: 40px;
              height: 40px;
              color: #333;
              font-size: 14px;
              span:first-of-type {
                display: inline-block;
                width: 72px;
              }
              span:nth-of-type(2) {
                color: #666;
              }

              &:nth-of-type(2) {
                width: 458px;
              }
            }
          }
        }
        .message_right {
          margin-left: 40px;
          padding-top: 20px;
          display: inline-block;
          .mian_pic {
            float: left;
            > img {
              width: 130px;
              height: 130px;
              margin-top: 20px;
            }
          }
          .secondary_pic {
            float: left;
            height: 100%;
            margin-left: 20px;
            .pic_title {
              margin-bottom: 20px;
            }
            .img {
              display: flex;
              img {
                width: 80px;
                height: 80px;
                margin-right: 20px;
                z-index: 10;
              }
            }
          }
        }
        .goods_detail {
          // width: 49.5%;
          height: 521px;
          background-color: #f6f6f6;
          padding: 0 20px;
          .el-header {
            line-height: 70px;
            height: 70px !important;
            button {
              margin-left: 50px;
              width: 110px;
              height: 30px;
              background-color: #5d70e9;
              border-radius: 8px;
              line-height: 30px;
              padding: 0;
              color: #fff;
            }
          }
          .el-main {
            padding: 0;
            height: 451px;
            overflow: auto;
            ul {
              padding: 0 120px;
              box-sizing: border-box;
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              overflow: auto;
              justify-content: space-between;
              li {
                width: 48%;
                font-size: 14px;
                color: #333;
                line-height: 35px;
                height: 35px;
              }
            }
          }
        }
        .goods_size {
          height: 521px;
          background-color: #f6f6f6;
          padding: 0 20px;
          .el-header {
            height: 70px !important;
            display: flex;
            span {
              line-height: 45px;
            }
          }
          .el-main {
            padding: 0;
            width: 80%;
            margin: 0 auto;

            .table {
              .el-table {
                padding: 15px 10px;
                background-color: #fff;
                box-sizing: border-box;
                height: 335px !important;
              }
            }
          }
          .el-footer {
            margin-top: 55px;
            button {
              width: 30px;
              height: 30px;
              border-radius: 5px;
              border: 1px solid #dadcde;
              color: #666;
              padding: 0;
            }
            .el-pager {
              margin-right: 10px;
              li {
                width: 30px;
                height: 30px;
                border: 1px solid #dadcde;
                color: #666;
                min-width: 0;
                margin-left: 10px;
              }
            }
          }
        }
        .setting {
          padding-top: 30px;
          .set_list {
            line-height: 50px;
            display: flex;
            font-size: 15px;
            .price {
              margin-left: 60px;
            }
          }
        }
        .bar_area {
          margin-top: 40px;
        }
        .describe {
          ul {
            display: flex;
            li {
              width: 150px;
              height: 150px;
              margin-top: 20px;
              margin-right: 20px;
              img {
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>

