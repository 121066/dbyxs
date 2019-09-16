<template>
  <div class="goods_modify-container">
    <!-- 添加商品 -->
    <breadcrumb style="  width: 100%; "></breadcrumb>
    <img src="../../img/return_icon.png" alt @click="$router.go(-1)" />

    <div class="goodsmodify_con">
      <el-header style="height: 275px;">
        <h3 class="title">修改商品</h3>
      </el-header>
      <el-main>
        <el-header>
          <span :class="selectCard == 1 ? 'active': ''">商品信息</span>
          <span :class="selectCard == 2 ? 'active': ''">商品图片</span>
          <span :class="selectCard == 3 ? 'active': ''">商品详情</span>
          <span :class="selectCard == 4 ? 'active': ''">商品标签</span>
          <span :class="selectCard == 5 ? 'active': ''">商品描述</span>
          <span v-if="form.positionId == 1" :class="selectCard == 6 ? 'active': ''">拼单设置</span>
          <span v-if="form.positionId == 1" :class="selectCard == 7 ? 'active': ''">砍价设置</span>
        </el-header>
        <el-main>
          <!-- 商品信息 -->
          <div class="message_left" v-show="selectCard == 1">
            <div>
              <el-radio v-model="radio" :label="1">实体商品</el-radio>
              <el-radio v-model="radio" :label="2">虚拟商品</el-radio>
            </div>
            <el-form :model="form" label-width="85px">
              <el-form-item label="商品名称">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="商品长名称" style="width:700px;" v-show="radio == 1">
                <el-input v-model="form.longName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="规格">
                <el-input v-model="form.specification" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="是否自营" v-show="radio == 1">
                <el-select v-model="form.proprietary" placeholder="请选择">
                  <el-option label="否" value="0"></el-option>
                  <el-option label="是" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属类型">
                <el-select v-model="form.type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button type="primary" style="padding: 10px" @click=" show = true">选择标签</el-button>
              </el-form-item>
              <el-form-item label="库存">
                <el-input :value="store" placeholder="请输入" v-if="tags.length != 0 ? true : false"></el-input>
                <el-input v-model="store1" placeholder="请输入" v-else></el-input>
              </el-form-item>
              <el-form-item label="是否包邮" v-show="radio == 1" class="express">
                <el-select v-model="form.expressfree" placeholder="请选择">
                  <el-option label="否" value="0"></el-option>
                  <el-option label="是" value="1"></el-option>
                </el-select>
                <div class="price" v-if="form.expressfree == 0 && form.expressfree !== ''">
                  <span>邮</span>
                  <span>费</span>&nbsp;
                  <el-input v-model="postage"></el-input>&nbsp;
                  <span>元</span>
                </div>
              </el-form-item>
              <el-form-item label="成本价" class="cost">
                <el-input v-model="form.cost" placeholder="请输入" style="width: 100px"></el-input>&nbsp;
                <span>元</span>
                <div class="price" style="margin-left:15px">
                  <span>零售价</span>
                  <el-input v-model="form.price" style="width: 100px;"></el-input>&nbsp;
                  <span>元</span>
                </div>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="form.sellStatus" placeholder="请选择">
                  <el-option label="下架" value="0"></el-option>
                  <el-option label="在售" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品标语">
                <el-input v-model="form.slogan" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="代理价格">
                <el-input v-model="form.agentPrice" placeholder="请输入" style="width: 280px;"></el-input>&nbsp;
                <span style="color: #666">元</span>
              </el-form-item>

              <!-- <el-form-item label="发货地点">
                <el-input v-model="form.address" placeholder="请输入"></el-input>
              </el-form-item>-->

              <el-form-item label="活动类型">
                <el-select v-model="form.positionId" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in position"
                    :key="index"
                    :label="item.position"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="积分价格" v-if="form.positionId == 5">
                <el-input v-model="form.pointsPrice" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="虚拟类型" v-if="radio == 2">
                <el-select v-model="form.goodsKind" placeholder="请选择" @change="virtual_type">
                  <el-option
                    v-for="(item, index) in goodsKind"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>&nbsp;
                <span
                  style="color:#409EFF;cursor:pointer"
                  @click="show1 = true"
                  v-if="form.goodsKind == 1 || form.goodsKind == 2"
                >点击选择</span>
              </el-form-item>
              <el-form-item
                label="商品价值"
                v-show="radio == 2 && form.goodsKind == 1 || form.goodsKind == 2 || form.goodsKind == 3"
              >
                <el-input
                  v-model="form.virtualValue"
                  placeholder="请输入"
                  @change="virtual_price"
                  :disabled="form.goodsKind != 3 ? true : false"
                ></el-input>
              </el-form-item>
              <el-form-item label="发货地点" style="width: 840px;" class="address" v-if="radio == 1">
                <addressDetail></addressDetail>
              </el-form-item>
              <el-form-item label="详细地址" style="width: 700px;" v-if="radio == 1">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入详细地址"
                  v-model="form.address"
                  style="width: 750px;"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>

          <!-- 商品图片 -->
          <div class="message_right" v-show="selectCard == 2">
            <div class="mian_pic">
              <div class="pic_title">图片（主图）</div>

              <el-upload
                class="avatar-uploader"
                :action="''"
                :on-change="changepic1"
                :auto-upload="false"
                :auto-false="false"
              >
                <i class="el-icon-delete" @click.stop="handleRemove_pic()" v-if="urlImg1"></i>
                <div ref="capture" class="image-content" v-if="isSelPic">
                  <img :src="urlImg1" alt v-show="urlImg1" />

                  <i v-if="!urlImg1" class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <div ref="capture" class="image-content" v-if="form.goodsKind == 1 && !isSelPic ">
                  <img src="@/img/coupon.png" alt v-if="form.goodsKind == 1  " />
                  <p>{{form.virtualValue}}￥</p>
                  <p>{{virtualType}}</p>
                  <p>{{time}}</p>
                  <i
                    v-if="form.goodsKind != 1 && form.goodsKind !=2 && !urlImg1"
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </div>
                <div ref="capture" class="image-content" v-if="form.goodsKind == 2 && !isSelPic">
                  <p>{{form.virtualValue}}</p>
                  <p style="color:#fff;margin-top:30px">{{virtualType}}</p>
                  <p style="color:#fff; margin-top:20px">{{time}}</p>
                  <img src="@/img/red_packet.png" alt />
                  <i
                    v-if="form.goodsKind != 1 && form.goodsKind !=2 && !urlImg1"
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </div>
                <div ref="capture" class="image-content" v-if="form.goodsKind == 3 && !isSelPic">
                  <span>{{form.virtualValue}}￥</span>
                  <span style="font-size: 18px;margin-top: 40px;">购物券</span>
                  <img src="@/img/card.png" alt />
                  <i
                    v-if="form.goodsKind != 1 && form.goodsKind !=2 && !urlImg1"
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </div>
                <div ref="capture" class="image-content" v-if="form.goodsKind == 4 && !isSelPic">
                  <img src="@/img/free_2.png" alt />
                  <i
                    v-if="form.goodsKind != 1 && form.goodsKind !=2 && !urlImg1"
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </div>
                <div ref="capture" class="image-content" v-if="form.goodsKind == 5 && !isSelPic">
                  <img src="@/img/free_1.png" alt />
                  <i
                    v-if="form.goodsKind != 1 && form.goodsKind !=2 && !urlImg1"
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </div>
              </el-upload>
            </div>
            <div class="secondary_pic">
              <div class="pic_title">图片（附图）</div>
              <div class="img">
                <el-upload
                  class="avatar-uploader"
                  :action="''"
                  :on-change="changepic2"
                  :auto-upload="false"
                  :auto-false="false"
                >
                  <i
                    class="el-icon-delete"
                    v-show="goodsPictures[0].urlImg"
                    @click.stop="handleRemove(goodsPictures[0].flag)"
                  ></i>
                  <img v-if="goodsPictures[0].urlImg" :src="goodsPictures[0].urlImg" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  class="avatar-uploader"
                  :action="''"
                  :on-change="changepic3"
                  :auto-upload="false"
                  :auto-false="false"
                >
                  <i
                    class="el-icon-delete"
                    v-show="goodsPictures[1].urlImg"
                    @click.stop="handleRemove(goodsPictures[1].flag)"
                  ></i>

                  <img v-if="goodsPictures[1].urlImg" :src="goodsPictures[1].urlImg" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  class="avatar-uploader"
                  :action="''"
                  :on-change="changepic4"
                  :auto-upload="false"
                  :auto-false="false"
                >
                  <i
                    class="el-icon-delete"
                    v-show="goodsPictures[2].urlImg"
                    @click.stop="handleRemove(goodsPictures[2].flag)"
                  ></i>
                  <img v-if="goodsPictures[2].urlImg" :src="goodsPictures[2].urlImg" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  class="avatar-uploader"
                  :action="''"
                  :on-change="changepic5"
                  :auto-upload="false"
                  :auto-false="false"
                >
                  <i
                    class="el-icon-delete"
                    v-show="goodsPictures[3].urlImg"
                    @click.stop="handleRemove(goodsPictures[3].flag)"
                  ></i>
                  <img v-if="goodsPictures[3].urlImg" :src="goodsPictures[3].urlImg" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload
                  class="avatar-uploader"
                  :action="''"
                  :on-change="changepic6"
                  :auto-upload="false"
                  :auto-false="false"
                >
                  <i
                    class="el-icon-delete"
                    v-show="goodsPictures[4].urlImg"
                    @click.stop="handleRemove(goodsPictures[4].flag)"
                  ></i>
                  <img v-if="goodsPictures[4].urlImg" :src="goodsPictures[4].urlImg" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </div>

          <!-- 商品详情 -->
          <div class="goods_detail" v-show="selectCard == 3">
            <el-header>
              <span>商品详情</span>
              <el-button icon="el-icon-plus" @click="dialog">添加详情</el-button>
            </el-header>
            <el-main>
              <ul>
                <li v-for="item in goodsDetail" :key="item.id">
                  <el-input v-model="item.name" placeholder="请输入内容"></el-input>
                  <span style="margin: 0 5px;">:</span>
                  <el-input v-model="item.value" placeholder="请输入内容"></el-input>
                  <i class="el-tag__close el-icon-close" @click="delMsg(item.id)"></i>
                </li>
              </ul>
            </el-main>
            <el-dialog title="添加详情" :visible.sync="dialogVisible2">
              <el-form :model="form" label-width="120px">
                <el-form-item>
                  <el-input v-model="name" placeholder="请输入标签名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input :rows="2" placeholder="请输入标签属性" v-model="value"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <div class="btn">
                  <el-button type="primary" @click="addDetail">确 定</el-button>
                  <el-button style="color: #409eff" @click="dialogVisible2 = false">取 消</el-button>
                </div>
              </div>
            </el-dialog>
          </div>

          <!-- 商品属性 -->
          <div class="goods_size" v-show="selectCard == 4">
            <el-header>
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @click="modifyLabel(tag)"
                @close="handleClose(tag)"
                style="position:relative"
              >{{tag}}</el-tag>
              <el-button icon="el-icon-plus" @click="addLabelData">添加标签</el-button>
            </el-header>
            <el-main>
              <div class="table">
                <el-table :data="labelList" height="204">
                  <el-table-column
                    v-for="item of tags"
                    :label="item.label"
                    :key="item.id"
                    :prop="item.prop"
                  ></el-table-column>
                  <el-table-column label="库存" v-if="tags.length != 0 ? true : false ">
                    <template slot="header"></template>
                    <template slot-scope="{row}">
                      <el-input v-model="row.stock" style="width: 50px;"></el-input>
                    </template>
                  </el-table-column>
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
                  style="display: inline-block;cursor:pointer"
                ></el-pagination>
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="5"
                  layout="slot,jumper"
                  :total="total"
                  style="display: inline-block"
                >
                  <span style="color: #666;" ref="pageAndTotal">[共0页]</span>
                </el-pagination>
              </div>
            </el-footer>
            <el-dialog title="添加标签" :visible.sync="dialogVisible1">
              <el-form :model="form" label-width="120px">
                <el-form-item label="标签名称" label-width="100px">
                  <el-input v-model="labelName" placeholder="请输入标签名称"></el-input>
                </el-form-item>
                <el-form-item label="标签属性" label-width="100px">
                  <el-input type="textarea" :rows="2" placeholder="请输入标签属性" v-model="textarea"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <div class="btn">
                  <el-button type="primary" @click="addLabel">确 定</el-button>
                  <el-button style="color: #409eff" @click="dialogVisible1 = false">取 消</el-button>
                </div>
              </div>
            </el-dialog>
          </div>

          <!-- 商品图片详情 -->

          <div class="detail_imgs" v-if="selectCard == 5">
            <el-upload
              :action="''"
              list-type="picture-card"
              :on-change="handleChange7"
              :on-remove="handleRemove7"
              :file-list="fileList"
              :auto-upload="false"
              :auto-false="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>

          <!-- 拼单设置 -->
          <div class="setting" v-show="selectCard == 6">
            <div class="set_list" v-for="(item, index) in setting" :key="index">
              <div class="people">
                <span>拼单人数:</span>
                <el-input v-model="item.num" type="number" @change="check_num(index)"></el-input>
                <span>人</span>
              </div>
              <div class="price">
                <span>拼单价格:</span>
                <el-input v-model="item.price" type="number"></el-input>
                <span>元</span>
              </div>

              <i class="el-icon-error" @click="del_rule(index)"></i>
            </div>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="add_rules"
              v-if="setting.length != 4"
            >添加</el-button>
          </div>

          <!-- 砍价设置 -->
          <div class="bar" v-show="selectCard == 7">
            <div class="bar_area">
              <span>砍价区域:</span>
              <el-input v-model="f_price"></el-input>
              <span>~</span>
              <el-input v-model="u_price" @change="compare_price"></el-input>
              <span>元</span>
            </div>
          </div>
          <el-footer>
            <el-button @click="$router.go(-1)" v-if="selectCard == 1">取消</el-button>
            <el-button v-if="selectCard != 1" @click="before_card">上一步</el-button>
            <el-button type="primary" v-if="selectCard != form.selectL" @click="next_card">下一步</el-button>
            <el-button type="primary" @click="updateGoods" v-if="selectCard == form.selectL">确定</el-button>
          </el-footer>
        </el-main>
      </el-main>
    </div>

    <transition name="el-zoom-in-center">
      <label-container
        class="transition-box"
        v-if="show"
        :show="show"
        @changeShow="changeShow"
        :ids="ids"
        :typeId="typeId"
        @addLabel="goodsLabel"
        style="position:absolute;z-index:999"
      ></label-container>
    </transition>

    <transition name="el-zoom-in-center">
      <card-list
        class="transition-box"
        v-if="show1"
        :type="form.goodsKind"
        :show="show1"
        @changeShow="changeShow1"
        @addCardType="addCardType"
        style="position:absolute;z-index:999"
      ></card-list>
    </transition>
  </div>
</template>

<script>
//  引入html2canvas截图功能
import html2canvas from "html2canvas";
import breadcrumb from "../../components/breadcrumb";
import addressDetail from "../../components/address";
import labelContainer from "../../components/labelList";
import cardList from "../../components/selectCardList";
import {
  goodsType,
  province,
  citys,
  areas,
  positions,
  coupon_detail,
  coupon_type_detail,
  red_packet_detail,
  red_packet_type_detail
} from "../../api/getData.js";
import { mapActions } from "vuex";

export default {
  components: { breadcrumb, addressDetail, labelContainer, cardList },
  data() {
    return {
      id: this.$route.query.id,
      selectCard: 1, //   用于选择是那个选项卡
      radio: 1, //  用于标记是选择实体商品还是虚拟商品
      show: false,
      show1: false,
      typeId: 0,
      form: {
        cost: "", //  商品成本价
        selectL: 5,
        name: "",
        type: "",
        price: "",
        agentPrice: "",
        specification: "",
        sellStatus: "",
        address: "",
        proprietary: "",
        expressfree: "",
        slogan: "",
        longName: "",
        positionId: "",
        pointsPrice: "",
        goodsKind: "",
        virtualValue: "",
        virtualId: ""
      },
      postage: "",
      input: "",
      dialogVisible1: false,
      currentPage: 1,
      total: 1,
      urlImg1: "",
      labelListCount: [],
      labelList: [],
      dynamicTags: [],
      store1: "",
      tags: [
        // { prop: "1", label: "颜色" },
        // { prop: "2", label: "尺码" },
        // { prop: "3", label: "款式" }
      ],
      inputVisible: false,
      isFlag1: true,
      isFlag: true,
      input: "",
      flag: 2, // 用于标记是添加时，还是修改的时候 1：代表修改 2： 代表添加
      goodsDetail: [],
      labelName: "",
      textarea: "",
      labelData: [],
      tag: "",
      pageAndTotal: null,
      file1: "",
      // file2: "",
      // file3: "",
      // file4: "",
      // file5: "",
      // file6: "",
      // file3: "",F
      dialogVisible2: false,
      name: "",
      value: "",
      goodsPictures: [
        { flag: 1, urlImg: "", file: "", id: "" },
        { flag: 2, urlImg: "", file: "", id: "" },
        { flag: 3, urlImg: "", file: "", id: "" },
        { flag: 4, urlImg: "", file: "", id: "" },
        { flag: 5, urlImg: "", file: "", id: "" }
      ],
      virtualType: "",
      time: "",
      imgSrc: "",
      isSelPic: true, //   标记是否自动生成主图  false表示允许自动生成主图
      type: "",
      setting: [{ num: 0, price: 0, id: 1 }], //   商品拼单设置集合
      fileList: [], //   商品详情图片集合
      u_price: "", //   商品的拼单设置最高价
      f_price: "", //   商品拼单设置最低价
      ids: [],
    };
  },
  created() {
    this.get_goodDetail();
    this.sava_goods_type();
    // 获取商品所在位置
    this.save_address({ province: "", city: "", area: "" });
    this.sava_goods_position();
    this.sava_virtual();
  },
  methods: {
    ...mapActions([
      "save_address",
      "sava_goods_position",
      "sava_goods_type",
      "sava_virtual"
    ]),
    changeShow(show) {
      this.show = show;
    },
    changeShow1(show) {
      this.show1 = show;
    },
    addCardType(msg, show) {
      this.show1 = show;
      if (msg) {
        if (!this.form.name) {
          this.form.name = msg.name;
        }
        if (msg.limitKind == "无时间限制") {
          this.time = msg.limitKind;
        } else {
          this.time =
            msg.startTime
              .split(" ")[0]
              .split("-")
              .join(".") +
            "-" +
            msg.endTime
              .split(" ")[0]
              .split("-")
              .join(".");
        }
        this.form.virtualValue = msg.price;
        this.form.virtualId = msg.id;
        this.file1 = "";
        this.urlImg1 = "";
        this.isSelPic = false;
        this.get_couponDetail(msg.id);
      }
    },
    goodsLabel(ids, show) {
      this.show = show;
      this.ids = ids;

    },

    select_virtualGoods(type) {
      this.$router.push("/select_cardList?type=" + type);
    },
    //   上一个card
    before_card() {
      this.selectCard--;
    },
    virtual_type() {
      this.urlImg1 = "";
      this.file1 = "";
      this.form.virtualValue = "";
      this.form.virtualId = "";
      this.isSelPic = false;
    },
    virtual_price() {
      this.urlImg1 = "";
      this.file1 = "";
      this.isSelPic = false;
    },
    // 下一个card
    next_card() {
      this.selectCard++;

      if (this.selectCard == 2) {
        if (!this.file1 && this.form.goodsKind && !this.isSelPic) {
          if (
            this.form.goodsKind == 1 ||
            this.form.goodsKind == 2 ||
            this.form.goodsKind == 3
          ) {
            if (this.form.virtualValue) {
              new Promise(resolve => {
                this.get_canvasImg();
                resolve();
              }).then(() => {
                setTimeout(() => {
                  var blob = this.dataURLtoBlob(this.imgSrc);
                  var file = this.blobToFile(blob, "12231.png");
                  this.file1 = file;
                }, 1000);
              });
            }
          } else {
            new Promise(resolve => {
              this.get_canvasImg();
              resolve();
            }).then(() => {
              setTimeout(() => {
                var blob = this.dataURLtoBlob(this.imgSrc);
                var file = this.blobToFile(blob, "12231.png");
                this.file1 = file;
              }, 1000);
            });
          }
        }
      }
    },

    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    // 用于删除商品的详细信息
    delMsg(id) {
      this.goodsDetail = this.goodsDetail.filter(item => {
        if (item.id != id) {
          return item;
        }
      });
    },
    // 获取标签列表
    get_lableList(delTag = "") {
      // delTag 用于判断label标签是之前只有一个， 还是有两个变成一个
      if (this.labelData.length) {
        var data = [];
        var prop = [];
        // var length = 1;
        this.labelData.forEach(item1 => {
          this.tags.forEach(item2 => {
            if (item1.name == item2.label) {
              data.push(item1.value);
              prop.push(item2.prop);
            }
          });
        });
        if (this.tags.length != 1 || delTag) {
          this.labelListCount = [];
          var results = [];
          var result = [];
          doExchange(data, 0);
          // 进行排列组合
          function doExchange(arr, index) {
            for (var i = 0; i < arr[index].length; i++) {
              result[index] = arr[index][i];
              if (index != arr.length - 1) {
                doExchange(arr, index + 1);
              } else {
                results.push(result.join(","));
              }
            }
          }
          results.forEach(item => {
            var obj = {};
            item.split(",").forEach((item1, index) => {
              obj[prop[index]] = item1;
            });
            obj["stock"] = 0;
            this.labelListCount.push(obj);
          });
        } else {
          if (this.labelListCount.length == 0) {
            data[0].forEach((item, index) => {
              var obj = {};
              obj[prop[0]] = item;
              obj["stock"] = 0;
              this.labelListCount.push(obj);
            });
          } else {
            this.labelListCount = this.labelListCount.filter((item, index) => {
              let newObj = "";
              data[0].forEach(item1 => {
                if (item[prop[0]] == item1) {
                  newObj = item;
                }
              });
              return newObj;
            });
            if (data[0].length >= this.labelListCount.length) {
              data[0].forEach((item, index) => {
                var obj = {};
                let flag = true;
                this.labelListCount.forEach(item1 => {
                  if (item == item1[prop[0]]) {
                    flag = false;
                  }
                });
                if (flag) {
                  obj[prop[0]] = item;
                  obj["stock"] = 0;
                  this.labelListCount.push(obj);
                }
              });
            }
          }
        }
        this.total = this.labelListCount.length;
        var page = Math.ceil(this.total / 5);
        this.$refs.pageAndTotal.innerHTML = "[共" + page + "页]";
        this.labelList = this.labelListCount.slice(0, 5);
      } else {
        this.labelListCount = [];
      }
    },
    // 分页 获取当前页
    handleCurrentChange(val) {
      this.labelList = [];
      this.currentPage = val;
      let num = (this.currentPage - 1) * 5;
      this.labelList = this.labelListCount.slice(
        (this.currentPage - 1) * 5,
        this.currentPage * 5
      );
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.tags = this.tags.filter(item => {
        if (item.label !== tag) {
          return item;
        }
      });
      this.labelData = this.labelData.filter(item => {
        if (item.name !== tag) {
          return item;
        }
      });
      this.get_lableList(1);
    },
    changepic1(file, fileList) {
      // type : 用于判断是第几张图片
      fileList.shift();
      this.file1 = file.raw;
      if (this.isFlag1 == true) {
        var _this = this;
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = function(e) {
          _this.urlImg1 = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    changepic2(file, fileList) {
      fileList.shift();

      this.goodsPictures[0].file = file.raw;
      if (this.isFlag == true) {
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = e => {
          this.goodsPictures[0].urlImg = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }

      // type : 用于判断是第几张图片
    },
    changepic3(file, fileList) {
      fileList.shift();

      this.goodsPictures[1].file = file.raw;

      // type : 用于判断是第几张图片
      if (this.isFlag == true) {
        var _this = this;
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = e => {
          this.goodsPictures[1].urlImg = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    changepic4(file, fileList) {
      fileList.shift();

      this.goodsPictures[2].file = file.raw;

      // type : 用于判断是第几张图片
      if (this.isFlag == true) {
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = e => {
          this.goodsPictures[2].urlImg = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    changepic5(file, fileList) {
      fileList.shift();
      this.goodsPictures[3].file = file.raw;

      // type : 用于判断是第几张图片
      if (this.isFlag == true) {
        var _this = this;
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = e => {
          this.goodsPictures[3].urlImg = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    changepic6(file, fileList) {
      fileList.shift();

      this.goodsPictures[4].file = file.raw;

      // type : 用于判断是第几张图片
      if (this.isFlag == true) {
        var _this = this;
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = e => {
          this.goodsPictures[4].urlImg = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
    },
    handleRemove1(file) {
      this.file1 = "";
      this.urlImg1 = "";
    },
    handleRemove_pic() {
      this.handleRemove1();
    },
    handleRemove(id) {
      this.goodsPictures.filter(item => {
        if (item.flag == id) {
          item.id = "";
          item.urlImg = "";
        }
      });
    },

    addLabelData() {
      this.flag = 2;
      this.dialogVisible1 = true;
      this.labelName = "";
      this.textarea = "";
    },
    addLabel() {
      if (!this.labelName) {
        return this.$message({
          type: "warning",
          message: "请输入标签名"
        });
      }
      if (!this.textarea) {
        return this.$message({
          type: "warning",
          message: "请输入标签属性"
        });
      }
      this.dialogVisible1 = false;
      if (this.flag == 2) {
        this.dynamicTags.push(this.labelName);
        if (this.tags.length == 0) {
          this.tags.push({ prop: "1", label: this.labelName });
        } else {
          this.tags.push({
            prop: "" + (parseInt(this.tags[this.tags.length - 1]["prop"]) + 1),
            label: this.labelName
          });
        }

        this.labelData.push({
          name: this.labelName,
          value: this.textarea.trim().split(" ")
        });
      } else {
        this.dynamicTags.forEach((item, index) => {
          if (item == this.tag) {
            this.dynamicTags[index] = this.labelName;
          }
          this.labelData.forEach((item, index) => {
            if (item.name == this.tag) {
              this.labelData[index].name = this.labelName;
              this.labelData[index].value = this.textarea.trim().split(" ");
            }
          });
          this.tags.forEach((item, index) => {
            if (item.label == this.tag) {
              this.tags[index].label = this.labelName;
            }
          });
        });
      }
      this.currentPage = 1;
      this.get_lableList();
    },
    modifyLabel(tag) {
      this.flag = 1;
      this.labelName = "";
      this.textarea = "";
      this.dialogVisible1 = true;
      this.tag = tag;
      this.labelData.forEach(item => {
        if (item.name === tag) {
          this.labelName = item.name;
          this.textarea = item.value.join(" ");
          return true;
        }
      });
    },
    updateGoods() {
      if (this.form.name == "") {
        this.selectCard = 1;
        return this.$message({
          type: "warning",
          message: "请输入商品名称"
        });
      }
      if (this.form.type == "") {
        this.selectCard = 1;
        return this.$message({
          type: "warning",
          message: "请选择商品所属的类型"
        });
      }

      if (!this.store && !this.store1) {
        this.selectCard = 1;
        return this.$message({
          type: "warning",
          message: "请输入商品的库存"
        });
      }
      if (this.form.cost == "") {
        this.selectCard = 1;
        return this.$message({
          type: "warning",
          message: "请输入商品的成本价"
        });
      }
      if (this.form.price == "") {
        this.selectCard = 1;
        return this.$message({
          type: "warning",
          message: "请输入商品的零售价格"
        });
      }
      if (this.form.agentPrice == "") {
        this.selectCard = 1;
        return this.$message({
          type: "warning",
          message: "请输入商品的代理价格"
        });
      }
      if (this.form.sellStatus == "") {
        this.selectCard = 1;
        return this.$message({
          type: "warning",
          message: "请输入商品的销售状态"
        });
      }
      if (this.form.positionId == "") {
        this.selectCard = 1;
        return this.$messsage({
          type: "warning",
          message: "请选择商品的活动类型"
        });
      }
      if (this.radio == 1) {
        if (this.form.specification == "") {
          this.selectCard = 1;
          return this.$message({
            type: "warning",
            message: "请输入商品的规格"
          });
        }
        if (this.form.proprietary == "") {
          this.selectCard = 1;
          return this.$message({
            type: "warning",
            message: "请选择是否自营"
          });
        }
        if (this.form.expressfree == "") {
          this.selectCard = 1;
          return this.$message({
            type: "warning",
            message: "请选择是否包邮"
          });
        }
        if (
          this.addressDetail.province == "" ||
          this.addressDetail.city == ""
        ) {
          this.selectCard = 1;
          return this.$message({
            type: "warning",
            message: "请选择地址"
          });
        }
        if (this.form.address == "") {
          this.selectCard = 1;
          return this.$messsage({
            type: "warning",
            message: "请输入详细地址"
          });
        }
      }
      if (this.radio == 2) {
        if (this.goodsKind == 1 || this.goodsKind == 2) {
          if ((this.form.virtualId = "")) {
            this.selectCard = 1;
            return this.$message({
              type: "warning",
              message: "点击选择虚拟类型商品"
            });
          }
        }
        if (this.goodsKind == 3) {
          if (this.form.virtualValue == "") {
            this.selectCard = 1;
            return this.$message({
              type: "warning",
              message: "虚拟商品价值不能为空"
            });
          }
        }
      }
      if (this.urlImg1 == "") {
        if (!this.file1) {
          this.selectCard = 2;
          return this.$message({
            type: "warning",
            message: "请选择主图"
          });
        }
      }
      /**
       * 当positionId 为 1 时
       */
      if (this.form.positionId == 1) {
        if (this.u_price == 0 || this.f_price == 0 || !this.u_price || !this.f_price) {
          if (!this.u_price || this.f_price == 0) {
            this.selectCard = 7;
            return this.$message({
              type: "warning",
              message: "砍价设置中的最大值不能为空"
            });
          }
          if (!this.f_price || this.u_price == 0) {
            this.selectCard = 7;
            return this.$message({
              type: "warning",
              message: "砍价设置中的最小值不能为空"
            });
          }
        }
        if (this.setting.length !== 0) {
          var isValue = false
          this.setting.forEach(item => {
            if (!item.num || !item.price) {
              isValue = true
              this.selectCard = 6;
              return this.$message({
                type: "warning",
                message: "拼单设置中的人数或价格不能为空"
              });
            }
          });
          if(isValue) return 
        } else {
          this.selectCard = 6;
          return this.$message({
            type: "warning",
            message: "拼单设置中的人数或价格不能为空"
          });
        }
      }

      let goods = this.form;
      if (this.tags.length != 0) {
        goods.store = this.store;
      } else {
        goods.store = this.store1;
      }
      let positionName = "";
      this.position.forEach(item => {
        if (this.form.positionId == item.id) {
          return (positionName = item.position);
        }
      });

      goods["position"] = positionName;
      goods["province"] = this.addressDetail.province;
      goods["region"] = this.addressDetail.city;
      goods["town"] = this.addressDetail.area;
      let details = [];
      this.goodsDetail.forEach(item => {
        details.push({ key: item.name, value: item.value });
      });
      let attributes = [];
      this.labelData.forEach(item => {
        var subAttributes = [];
        item.value.forEach(item1 => {
          subAttributes.push({ attribute: item1 });
        });
        attributes.push({ attribute: { attribute: item.name }, subAttributes });
      });
      let inventory = [];

      this.labelListCount.forEach(item => {
        // inventory.push({attributes:[]})
        let attributes1 = [];
        for (var i in item) {
          // inventory.push({attributes:[]})
          attributes1.push(item[i]);
        }
        attributes1.pop();

        inventory.push({
          attributes: attributes1,
          inventory: item.stock
        });
      });
      let formData = new FormData();
      let goodsImgs = [];
      this.goodsPictures.forEach(item => {
        if (item.file) {
          formData.append("files", item.file);
        } else {
          if (item.id) {
            goodsImgs.push({ id: item.id, pictureUrl: item.urlImg });
          }
        }
      });
      var ggps = [];
      if (this.form.positionId == 1) {
        goods["lower"] = this.f_price;
        goods["upper"] = this.u_price;
        this.setting.forEach(item => {
          ggps.push({ number: item.num, price: item.price });
        });
      }

      goods["postage"] = this.postage;

      this.fileList.forEach(item => {
        if (!item.raw) {
          goodsImgs.push({ id: item.id, pictureUrl: item.pictureUrl });
        } else {
          formData.append("descFiles", item.raw);
        }
      });
      let htmlContainer = this.content;
      let goodsDetail = {
        goods,
        details,
        attributes,
        inventory,
        ids: this.ids,
        goodsPictures: goodsImgs
      };
      if (this.form.positionId == 1) {
        goodsDetail["ggps"] = ggps;
      }
      if (this.file1) {
        formData.append("mainFile", this.file1);
      }

      formData.append("goods", JSON.stringify(goodsDetail));

      this.$axios.post("/web_goods/update", formData).then(result => {
        if (result.data.status == 0) {
          if (result.data.data == 1) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.$router.push("/goodsManage");
          } else {
            this.$message({
              type: "warning",
              message: "修改失败"
            });
          }
        }
      });
    },
    //    用于查找购物券或者红包的类型
    get_couponDetail(id) {
      let typeId = "";
      let types = [
        { id: 1, value: "全场通用" },
        { id: 2, value: "部分活动通用" },
        { id: 3, value: "部分商品类型通用" },
        { id: 4, value: "部分活动商品类型通用" },
        { id: 5, value: "部分商品可用" }
      ];
      if (this.form.goodsKind == 1) {
        coupon_detail("id=" + id).then(result => {
          if (result.data.status == 0) {
            typeId = result.data.data.typeId;
            coupon_type_detail("id=" + typeId).then(result => {
              if (result.data.status == 0) {
                types.forEach(item => {
                  if (item.id == result.data.data.type) {
                    this.virtualType = item.value;
                  }
                });
              }
            });
          }
        });
      } else if (this.form.goodsKind == 2) {
        red_packet_detail("id=" + id).then(result => {
          if (result.data.status == 0) {
            typeId = result.data.data.typeId;
            red_packet_type_detail("id=" + typeId).then(result => {
              if (result.data.status == 0) {
                 types.forEach(item => {
                  if (item.id == result.data.data.type) {
                    this.virtualType = item.value;
                  }
                });
              }
            });
          }
        });
      }
    },
    
    addDetail() {
      if (this.goodsDetail.length == 0) {
        this.goodsDetail.push({ value: this.value, name: this.name, id: 1 });
      } else {
        this.goodsDetail.push({
          value: this.value,
          name: this.name,
          id: parseInt(this.goodsDetail[this.goodsDetail.length - 1]["id"]) + 1
        });
      }
      this.dialogVisible2 = false;
    },
    get_goodDetail() {
      this.$axios.post("/web_goods/get_one", "id=" + this.id).then(result => {
        if (result.data.status == 0) {
          // 获取大图

          let data = result.data.data;
          this.urlImg1 = data.goods.pictureUrl;
          delete data.goods.pictureUrl;
          data.details.forEach((item, index) => {
            this.goodsDetail.push({
              id: item.id,
              name: item.key,
              value: item.value
            });
          });
          data.attributes.forEach((item, index) => {
            this.dynamicTags.push(item.attribute.attribute);
            this.tags.push({
              prop: index + "",
              label: item.attribute.attribute
            });
            let value = [];
            item.subAttributes.forEach(item1 => {
              value.push(item1.attribute);
            });
            this.labelData.push({
              name: item.attribute.attribute,
              value: value
            });
          });

          data.inventorys.forEach(item => {
            // this.godosList.push({})
            let obj = {};
            item.attributes.forEach((item1, index) => {
              obj[index] = item1;
            });
            obj["stock"] = item.inventory;
            this.labelListCount.push(obj);
          });
          if (data.goodsPictures.length != 0) {
            data.goodsPictures = data.goodsPictures.splice(0, 5);
            data.goodsPictures.forEach((item, index) => {
              this.goodsPictures[index]["id"] = item.id;
              this.goodsPictures[index]["urlImg"] = item.pictureUrl;
            });
          }
          if (this.tags.length == 0) {
            this.store1 = data.goods.store;
            delete data.goods.store;
          } else {
            this.store == 0;
          }


          this.form = data.goods;
          this.typeId = data.goods.type
          this.postage = data.goods.postage == null ? 0 : data.goods.postage;
          this.form.cost = data.goods.cost == null ? 0 : data.goods.cost;
          //  商品的搜索标签
          this.ids = data.ids
          /**
           * 当商品为商城中的商品， 获取商品砍价和商品拼单的设置
           *
           */
          if (this.form.positionId == 1) {
            this.u_price = data.goods.upper;
            this.f_price = data.goods.lower;
            this.setting = [];
            if (data.ggps.length != 0) {
              data.ggps.forEach(item => {
                this.setting.push({
                  num: item.number,
                  price: item.price
                });
              });
            }
          }
          if (data.goods.goodsKind === null) {
            data.goods.goodsKind = "";
          }
          if (data.goods.virtualId === null) {
            data.goods.virtualId = "";
          }
          if (data.goods.virtualValue === null) {
            data.goods.virtualValue = "";
          }
          if (data.goods.goodsKind != 0) {
            this.radio = 2;
            this.form.goodsKind = data.goods.goodsKind;
          }
          this.save_address({
            province: data.goods.province,
            city: data.goods.region,
            area: data.goods.town
          });
          this.total = this.labelListCount.length;

          result.data.data.descPictures.forEach(item => {
            this.fileList.push({
              id: item.id,
              url: item.pictureUrl
            });
          });

          this.labelList = this.labelListCount.slice(0, 5);
          var page = Math.ceil(this.total / 5);
          this.$refs.pageAndTotal.innerHTML = "[共" + page + "页]";
        }
      });
    },
    dialog() {
      this.dialogVisible2 = true;
      this.name = "";
      this.value = "";
    },
    get_canvasImg() {
      html2canvas(this.$refs.capture, { useCORS: true }).then(canvas => {
        let src = canvas.toDataURL();
        this.imgSrc = src;
      });
    },
    //   添加拼单设置
    add_rules() {
      if (this.setting.length == 0) {
        var id = 1;
        this.setting.push({
          num: 0,
          price: 0,
          id: id
        });
      } else {
        this.setting.push({
          num: 0,
          price: 0,
          id: this.setting[this.setting.length - 1].id
        });
      }
    },
    //   删除拼单设置
    del_rule(index) {
      this.setting.splice(index, 1);
    },

    //   添加商品的详情
    handleChange7(file, fileList) {
      var file1 = file;
      // type : 用于判断是第几张图片
      if (this.isFlag == true) {
        var _this = this;
        var event = event || window.event;

        var file = event.target.files[0];

        var reader = new FileReader();
        //转base64
        reader.onload = function(e) {
          file1.url = e.target.result; //将图片路径赋值给src
        };
        reader.readAsDataURL(file);
      }
      this.fileList.push(file1);
    },
    handleRemove7(file, fileList) {
      this.fileList = fileList;
    },

    //   用于校验砍价的最大值不能小于最小值
    compare_price() {
      if (parseFloat(this.f_price) >= parseFloat(this.u_price)) {
        this.u_price = "";
        return this.$message({
          type: "warning",
          message: "砍价设置的最小值不能超过最大值"
        });
      }
    },
    //  拼单设置不能出现重复的拼单人数
    check_num(index) {
      for (var i = 0; i < this.setting.length; i++) {
        for (var j = i + 1; j < this.setting.length; j++) {
          if (this.setting[i].num && this.setting[j].num) {
            if (this.setting[i].num === this.setting[j].num) {
              this.setting.forEach((item, index1) => {
                if (index == index1) {
                  item.num = "";
                }
              });
              return this.$message({
                type: "warning",
                message: "不能出现重复的人数"
              });
            }
          }
        }
      }
    }
  },
  computed: {
    store: function() {
      var store = 0;
      if (this.labelListCount.length == 0) {
        store = 0;
      } else {
        store = 0;
        this.labelListCount.forEach(item => {
          store += parseInt(item.stock);
        });
      }
      return store;
    },

    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    addressDetail() {
      return this.$store.state.addressDetail;
    },
    position() {
      return this.$store.state.position;
    },
    options() {
      return this.$store.state.goodsType;
    },
    goodsKind() {
      return this.$store.state.virtualMsg;
    }
  },
 
  watch: {
    radio(val, oldVal) {
      if (val == 1) {
        this.form.goodsKind = "";
        this.isSelPic = true;
      } else if (val == 2) {
        this.addressDetail.province = "";
        this.addressDetail.city = "";
        this.addressDetail.area = "";
        this.form.proprietary = "";
        this.form.expressfree = "";
        this.form.longName = "";
      }
    },
    "form.positionId": function(val, oldVal) {
      if (val == 1) {
        this.form.selectL = 7;
      } else {
        this.form.selectL = 5;
      }
    }
  }
};
</script>


<style lang="less">
.goods_modify-container {
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

  .goodsmodify_con {
    .image-content {
      width: 130px;
      height: 134px;
    }
    .el-tag__close.el-icon-close:hover {
      background-color: #409eff;
      color: #fff;
    }
    .active {
      background-color: #5d70e9 !important;
      color: #fff !important;
    }
    .el-upload-list.el-upload-list--text {
      display: none;
    }
    .el-upload-list__item-name {
      width: 100px;
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
    .el-pager li.active {
      background-color: #409eff;
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
    .el-form-item__label {
      text-align: left;
      height: 30px;
    }
    .el-table td,
    .el-table th {
      height: 51px;
      padding: 0;
    }
    .el-upload-list__item-name {
      margin: 0;
    }
    .el-upload-list__item:first-child {
      margin-top: -5px;
    }
    .el-upload > .el-tag__close.el-icon-close {
      position: absolute;
      top: 5px;
      right: 5px;
      border-radius: 50%;
    }
    .el-tage > .el-tag__close {
      top: 2px;
      right: 2px;
    }
    padding: 0 30px;
    flex: 1;
    display: flex;
    flex-flow: column;
    > .el-header {
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
          div {
            height: 40px;
            line-height: 40px;
          }
          .el-form {
            display: flex;
            flex-wrap: wrap;
            height: 200px;
            .el-form-item {
              width: 450px;
              margin-top: 10px;
              margin-left: 20px;
              margin-bottom: 0;
              .el-input {
                .el-input__inner {
                  width: 280px;
                }
              }
              .el-select {
                .el-input__inner {
                  width: 150px;
                }
              }
              &:nth-of-type(2) {
                .el-input__inner {
                  width: 750px;
                }
              }
            }
          }
          .address-container {
            width: 100%;
            .el-select {
              width: 240px;
              .el-input {
                width: 240px;
                .el-input__inner {
                  width: 240px;
                }
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
            .el-upload {
              > i {
                &:first-of-type {
                  display: none;
                  position: absolute;
                  top: 0;
                  left: 0;
                  z-index: 9999999;

                  width: 100%;
                  height: 100%;
                  background: rgba(0, 0, 0, 0.6);
                  &::before {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                    color: #409eff;
                  }
                }
              }
              &:hover > i:first-of-type {
                display: block;
              }
              p {
                position: absolute;
                transform: translateX(-50%);
                top: 25px;
                left: 50%;
                z-index: 999;
                color: #ffd8b4;
                font-size: 24px;
                &:nth-of-type(2) {
                  top: 65px;
                  font-size: 12px;
                  width: 100%;
                }
                &:nth-of-type(3) {
                  top: 90px;
                  font-size: 12px;
                  width: 100%;
                  left: 0;
                  transform: scale(0.8);
                }
              }
              span {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 30px;
                color: #ffd8b4;
                font-size: 24px;
              }
            }
            .pic_title {
              margin-bottom: 30px;
              width: 185px;
            }
            .avatar-uploader .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
              border-color: #409eff;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 130px;
              height: 130px;
              line-height: 130px;
              text-align: center;
            }
            .avatar {
              width: 178px;
              height: 178px;
              display: block;
            }
            .avatar-uploader img {
              width: 130px;
              height: 130px;
            }
          }
          .secondary_pic {
            float: left;
            height: 100%;

            .pic_title {
              margin-bottom: 30px;
            }
            .img {
              display: flex;
              .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                margin-right: 20px;
              }
              .el-upload {
                > i {
                  &:first-of-type {
                    display: none;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 9999999;

                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    &::before {
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      font-size: 24px;
                      color: #409eff;
                    }
                  }
                }
                &:hover > i:first-of-type {
                  display: block;
                }
              }
              .avatar-uploader .el-upload:hover {
                border-color: #409eff;
              }
              .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 80px;
                height: 80px;
                line-height: 80px;
                text-align: center;
              }
              .avatar {
                width: 178px;
                height: 178px;
                display: block;
              }
              .avatar-uploader img {
                width: 80px;
                height: 80px;
              }
            }
          }
        }
        .goods_detail {
          height: 540px;
          background-color: #f6f6f6;
          padding: 0 20px;
          .el-header {
            line-height: 95px;
            height: 95px !important;
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
          > .el-main {
            margin: 0 auto;
            padding: 0;
            overflow: auto;
            height: 420px;
            ul {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              li {
                display: flex;
                position: relative;
                width: 330px;
                margin-bottom: 30px;
                margin-right: 120px;
                .el-input:first-of-type {
                  .el-input__inner {
                    width: 100px;
                    height: 30px;
                    border-radius: 5px;
                  }
                }
                .el-input:last-of-type {
                  .el-input__inner {
                    width: 220px;
                    height: 30px;
                    border-radius: 5px;
                  }
                }
                i {
                  position: absolute;
                  top: 50%;
                  // right: -20px;
                  right: 10px;
                  cursor: pointer;
                  transform: translateY(-50%);
                  border-radius: 50%;
                }
              }
            }
          }
          .el-dialog__wrapper {
            .el-dialog {
              width: 695px;
              height: 465px;
              margin-top: 0 !important;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
              .el-dialog__header {
                text-align: center;
                .el-dialog__title {
                  font-size: 14px;
                  color: #333;
                }
              }
              .el-dialog__body {
                margin-top: 50px;
                .el-form {
                  margin: 30px auto;
                  text-align: center;
                  width: 440px;
                  display: flex;
                  .el-form-item {
                    width: 210px;
                    margin: 0 10px;
                    .el-form-item__label {
                      line-height: 30px;
                    }
                    .el-form-item__content {
                      line-height: 30px;
                      margin-left: 0 !important;
                      display: flex;
                      .el-input {
                        width: 200px;
                        height: 30px;
                        .el-input__inner {
                          line-height: 30px;
                          height: 100%;
                        }
                      }
                    }
                    &:first-of-type {
                      width: 200px;
                      .el-input {
                        width: 200px;
                      }
                    }
                  }
                }
              }
              .el-dialog__footer {
                margin-top: 100px;
                .btn {
                  text-align: center;
                  button {
                    width: 60px;
                    height: 30px;
                    margin: 0 70px;
                    padding: 0;
                  }
                }
              }
            }
          }
        }
        .goods_size {
          margin-left: 1%;
          height: 540px;
          background-color: #f6f6f6;
          padding: 0 20px;
          .el-header {
            line-height: 95px;
            height: 95px !important;
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
            .el-tag + .el-tag {
              margin-left: 10px;
            }
          }
          > .el-main {
            padding: 0;
            .table {
              .el-table {
                padding: 15px 10px;
                background-color: #fff;
                box-sizing: border-box;
                height: 335px !important;
                thead {
                  font-weight: 500;
                }
                tr {
                  background-color: transparent;
                }
              }
            }
            .el-input__inner {
              width: 80px;
              padding-left: 20px;
              border: 0;
            }
          }
          .el-footer {
            margin-top: 25px;
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
          .el-dialog__wrapper {
            .el-dialog {
              width: 695px;
              height: 465px;
              margin-top: 0 !important;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
              .el-dialog__header {
                text-align: center;
                .el-dialog__title {
                  font-size: 14px;
                  color: #333;
                }
              }
              .el-dialog__body {
                margin-top: 50px;
                .el-form {
                  margin: 0 auto;
                  width: 335px;
                  .el-form-item:first-of-type {
                    .el-form-item__label {
                      line-height: 30px;
                    }
                    .el-form-item__content {
                      line-height: 30px;
                      .el-input {
                        width: 210px;
                        height: 30px;
                        .el-input__inner {
                          line-height: 30px;
                          height: 100%;
                        }
                      }
                    }
                  }
                  .el-form-item:last-of-type {
                    .el-form-item__label {
                      line-height: 130px;
                    }
                    .el-form-item__content {
                      line-height: 0;
                      .el-textarea {
                        width: 210px;
                        height: 130px;

                        .el-textarea__inner {
                          width: 100%;
                          height: 100%;
                        }
                      }
                    }
                  }
                }
              }
              .el-dialog__footer {
                .btn {
                  text-align: center;
                  button {
                    width: 60px;
                    height: 30px;
                    margin: 0 70px;
                    padding: 0;
                  }
                }
              }
            }
          }
        }

        > .el-footer {
          height: 110px !important;
          width: 100%;
          line-height: 110px;
          text-align: center;
          position: absolute;
          bottom: 50px;
          > button {
            height: 30px !important;
            line-height: 30px;
            padding: 0;
            width: 60px;
            margin: 0 80px;
            // box-sizing: content-box;
            &:first-of-type {
              color: #5d70e9;
              border: 1px solid #5d70e9;
            }
          }
        }
      }
    }
    .describe {
      margin-top: 20px;
      span {
        width: 120px;
      }
    }
    .detail_imgs {
      margin-top: 40px;
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
        .el-input {
          width: 100px;
          height: 30px;
          .el-input__inner {
            height: 30px;
          }
        }
        > i {
          font-size: 20px;
          display: none;
          color: #409eff;
          margin-top: 15px;
          margin-left: 10px;
          // right: -30px;
          // top: 50%;
          // transform: translateY(-50%);
        }
        &:hover > i {
          display: block;
        }
      }
    }
    .express {
      .el-form-item__content {
        display: flex;
        .price {
          display: flex;
          margin-left: 20px;
          color: #666;
          width: 100px;
          .el-input {
            width: 100px !important;
            input {
              width: 100px !important;
            }
          }
        }
      }
    }
    .bar_area {
      margin-top: 40px;
      .el-input {
        width: 100px;
        .el-input__inner {
          height: 30px;
        }
      }
    }
    .cost {
      .el-form-item__content {
        display: flex;
        color: #666;
      }
      .el-input {
        input {
          width: 100px !important;
        }
      }
    }
  }
}
</style>

