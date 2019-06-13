<template>
  <div>
    <!-- <h1>我的任务</h1> -->
    <page-msg />
    <el-row class="ipt-search">
      <el-col :span="4">
        <el-input v-model="input" placeholder="昵称模糊搜索"></el-input>
      </el-col>
      <el-col :span="3">
        <el-input v-model="input" placeholder="uid搜索"></el-input>
      </el-col>
      <el-col :span="5" align="left">
        <area-input :area_phone="areaphone" />
      </el-col>
      <el-col :span="3">
        <el-input v-model="input" placeholder="uuid搜索"></el-input>
      </el-col>
      
      <el-col :span="4">
        <el-input v-model="input" placeholder="artId搜索"></el-input>
      </el-col>
      
      <el-col :span="6">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
      </el-col>
      <el-col :span="18" align="right">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="success" icon="el-icon-refresh">刷新</el-button>
      </el-col>
    </el-row>
    <hr>
    <el-row>
      <div class="el_radio_wrap">
        <label class="el_radio_title" for="">推荐筛选:</label>
        <el-radio-group v-model="radio">
          <el-radio :label="3">默认</el-radio>
          <el-radio :label="6">推荐</el-radio>
          <el-radio :label="9">不推荐</el-radio>
        </el-radio-group>
      </div>
      <div class="el_radio_wrap">
        <label class="el_radio_title" for="">是否进仓库:</label>
        <el-radio-group v-model="radio">
          <el-radio :label="3">默认</el-radio>
          <el-radio :label="6">是</el-radio>
          <el-radio :label="9">否</el-radio>
        </el-radio-group>
      </div>
      <div class="el_radio_wrap">
        <label class="el_radio_title" for="">号码筛选:</label>
        <el-radio-group v-model="radio">
          <el-radio :label="3">默认</el-radio>
          <el-radio :label="6">单号</el-radio>
          <el-radio :label="9">双号</el-radio>
        </el-radio-group>
      </div>
      <div class="el_radio_wrap">
        <label class="el_radio_title" for="">排序筛选:</label>
        <el-radio-group v-model="radio">
          <el-radio :label="3">默认</el-radio>
          <el-radio :label="6">正序</el-radio>
          <el-radio :label="9">倒序</el-radio>
        </el-radio-group>
      </div>
      <div class="el_radio_wrap">
        <label class="el_radio_title" for="">文章类型:</label>
        <el-radio-group v-model="radio">
          <el-radio :label="3">全部</el-radio>
          <el-radio :label="6">文字文章</el-radio>
          <el-radio :label="9">照片文章</el-radio>
          <el-radio :label="10">视频文章</el-radio>
        </el-radio-group>
      </div>
      <div class="el_radio_wrap">
        <label class="el_radio_title" for="">状态筛选:</label>
        <el-radio-group v-model="radio">
          <el-radio :label="3">默认</el-radio>
          <el-radio :label="6">审核通过</el-radio>
          <el-radio :label="9">主人删除</el-radio>
          <el-radio :label="10">鉴黄删除</el-radio>
          <el-radio :label="11">管理员删除</el-radio>
          <el-radio :label="12">未审核</el-radio>
          <el-radio :label="10">进社区</el-radio>
        </el-radio-group>
      </div>
    </el-row>
    <hr>
    <el-row>
      <el-col :span="11">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </el-col>
      <el-col :span="3">
        <!-- <el-button type="primary">分配新任务</el-button> -->
      </el-col>
      <el-col :span="10" class="right">
        <el-button type="danger" @click="handleBatchShield()">批量屏蔽</el-button>
        <el-button type="success" @click="handleBatchReleive()">批量解封</el-button>
        <el-button type="danger" @click="handleBatchSink()">批量沉底</el-button>
        <el-button type="success" @click="handleBatchReleive()">批量捞起</el-button>
        <el-button type="primary">批量备注</el-button>
      </el-col>
    </el-row>

    <el-table
      :data="userList"
      border
      @selection-change="changeFun"
      style="width: 100%">

      <el-table-column type="selection">
      </el-table-column>
      <el-table-column
        align="center"
        label="artId">
        <template slot-scope="scope">
          <a
            :href="'http://custom.gmugmu.com/view/index-index#/qiNiuUnited?slectVideoId='+scope.row.artId"
            target="_blank"
            style="color: #46A3FF;"
          >
            {{scope.row.artId}}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="images"
        label="头像">
        <template slot-scope="scope"> 
          <img 
            :src="item" 
            v-for="item in scope.row.images" 
            :key="item"
            preview="1" 
            alt="" 
            style="width:60px;float:left;" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="性别">
        <template slot-scope="scope">
          {{genderStatus[scope.row.gender]?genderStatus[scope.row.gender]:'未知'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="sign"
        label="签名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="labelTag"
        label="个性标签">
      </el-table-column>
      <el-table-column
        align="center"
        label="手机及归属地">
        <template slot-scope="scope">
          <span>{{scope.row.phoneNum}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="IP及归属地">
        <template slot-scope="scope">
          <span>{{scope.row.ip}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="GPS位置">
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="GPS位置">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="endTime"
        label="最后登录时间">
      </el-table-column>
      <el-table-column
        align="center"
        label="状态">
        <template slot-scope="scope">
          <p style="color:red">{{userStaus[scope.row.status]?userStaus[scope.row.status]:'未知'}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="机型">
        <template slot-scope="scope">
          {{osStatus[scope.row.os]?osStatus[scope.row.os]:'未知'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="tagIds"
        label="标签">
        <template slot-scope="scope">
          <el-button @click="handleTag(scope.$index,scope.row.artId,item.id)" v-for="item in labelList" :key="item.id" :class="{active:(scope.row.tagIds).includes(String(item.id))}">{{item.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="indent"
        label="用户目的">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="管理员备注">
      </el-table-column>
      <el-table-column
        align="center"
        
        label="操作">
        <template class="testbtn" slot-scope="scope">
          <el-button size="small" type="primary">通过</el-button>
          <el-button size="small" @click="handleShield(scope.$index, scope.row.artId)" type="danger" v-if="scope.row.status == '1'">屏蔽</el-button>
          <el-button size="small" @click="handleSink(scope.$index, scope.row.artId)" type="danger" v-if="scope.row.status == '1'">沉底</el-button>
          <el-button size="small" @click="handleReleive(scope.$index, scope.row.artId)" type="success" v-if="scope.row.status == '0'">解封</el-button>
          <el-button size="small" @click="handleSink(scope.$index, scope.row.artId)" type="danger" v-if="scope.row.status == '0'">沉底</el-button>
          <el-button size="small" @click="handleReleive(scope.$index, scope.row.artId)" type="success" v-if="scope.row.status == '2'">海捞</el-button>
          <!-- <status-btn
            :status="scope.row.status"
            handleShield="handleShield"
            handleReleive="handleReleive"
            handleSink="handleSink"
            /> -->
          <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
            <el-button type="primary" size="small">日志</el-button>
          </a>
          <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
            <el-button type="warning" size="small">修改记录</el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
      
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import PageMsg from '@/components/Page/PageMsg'
import AreaInput from '@/components/Tool/AreaInput'
// import StatusBtn from '@/components/Tool/StatusBtn'
// import DatePicker from '@/components/Tool/DatePicker'
import { userStaus, genderStatus, osStatus, pickerOptions } from "@/utils/gmu/gmuCommon";
import { userBatchShield, userBatchReleive, userBatchSink } from "@/utils/gmu/handleUser"
import { trim } from '@/utils/validate'
export default {
  name:'ugcExamine',
  components:{
    PageMsg,
    AreaInput
  },
  computed: {
   
  },
  data() {
    return {
      factorScreen:{
        nickname_like:'',
        nickname:''
      },
      lastMobile:'',
      areacode:'86',
      areaphone:{
        area:'86',
        phone:''
      },
      radio:3,
      input1:'',
      input:'',
      currentPage3: 5,
      checkBoxData:[],//多选选中的项
      option:'',
      options:[
        {id:1,name:'灵魂社交'},
        {id:2,name:'怪癖'},
        {id:3,name:'释放'},
        {id:4,name:'字母'}
      ],
      labelList:[
        {id:1,name:'推荐'},
        {id:17,name:'男孩'},
        {id:18,name:'女孩'},
        {id:14,name:'晒物'},
        {id:15,name:'打卡'},
        {id:2,name:'活动'}
      ],
      userStaus:userStaus,
      genderStatus:genderStatus,
      osStatus:osStatus,
      tags:['追星','唱歌','跳舞','happy','哈哈哈'],
      userList:[{
        artId:11111,
        tagIds:["18"],
        values:10000,
        gender:1,
        nickname:'哈哈哈',
        sign:'哈哈哈哈哈哈哈哈哈哈',
        labelTag:'隔壁老王',
        phoneNum:18811122233,
        ip:'202.102.22.11',
        address:'北京',
        createTime:'2018-06-30 11:11:11',
        endTime:'2019-06-03 00:00:00',
        status:1,
        os:1,
        riskGrade:80,
        indent:'旅游',
        remark:'这是dasb',
        img:'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//6435286/0595a57ecb7bd36f8c3cf7fd7588f7a9_video'
      },{
        artId:2222,
        tagIds:["14"],
        values:10000,
        gender:2,
        nickname:'哈哈哈',
        sign:'哈哈哈哈哈哈哈哈哈哈',
        labelTag:'隔壁老王',
        phoneNum:18811122233,
        ip:'202.102.22.11',
        address:'北京',
        createTime:'2018-06-30 11:11:11',
        endTime:'2019-06-03 00:00:00',
        status:2,
        os:1,
        riskGrade:80,
        indent:'旅游',
        remark:'这是dasb',
        img:'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//6464315/a63cfc4c37242e61b883bb9b85b2774a_0'
      },{
        artId:333333,
        tagIds:["17"],
        values:10000,
        gender:1,
        nickname:'哈哈哈',
        sign:'哈哈哈哈哈哈哈哈哈哈',
        labelTag:'隔壁老王',
        phoneNum:18811122233,
        ip:'202.102.22.11',
        address:'北京',
        createTime:'2018-06-30 11:11:11',
        endTime:'2019-06-03 00:00:00',
        status:0,
        os:1,
        riskGrade:80,
        indent:'旅游',
        remark:'这是dasb',
        img:'http://jimu-cover-new.cdn.bcebos.com/6450627_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//5707188/13dd10b606c414e11a531918a35ce25a_video'
      },{
        artId:44444,
        tagIds:["1","2"],
        values:10000,
        gender:2,
        nickname:'哈哈哈',
        sign:'哈哈哈哈哈哈哈哈哈哈',
        labelTag:'隔壁老王',
        phoneNum:18811122233,
        ip:'202.102.22.11',
        address:'北京',
        createTime:'2018-06-30 11:11:11',
        endTime:'2019-06-03 00:00:00',
        status:2,
        os:1,
        riskGrade:80,
        indent:'旅游',
        remark:'这是dasb',
        img:'http://jimu-cover-new.cdn.bcebos.com/6450621_iiiiii',
        images:[
          'http://jimu-cover-new.cdn.bcebos.com/6450629_iiiiii',
          'http://jimu-cover-new.cdn.bcebos.com/6450628_iiiiii'
        ],
        tags:['追星','唱歌','跳舞','happy','哈哈哈'],
        video:'http://images.gmugmu.com//1486114/da4050b35c4bacc25295a537cfe7eb26_0'
      }],
       pickerOptions: pickerOptions,
      value2: ''
    }
  },
  methods: {
    mobile() {
      if(trim(this.areaphone.phone) != ''){
        this.lastMobile = trim(this.areaphone.area)+trim(this.areaphone.phone)
      }else{
        this.lastMobile = ''
      }
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeFun(val) {
      this.checkBoxData = []
        val.filter((item,index) => {
          this.checkBoxData.push(item.uid)
        })
        console.log(this.checkBoxData.join())
    },
    handleBatchShield() {//批量用户屏蔽
      userBatchShield(this.checkBoxData,this.userList);
    },
    handleBatchReleive(){//批量用户解封
      userBatchReleive(this.checkBoxData,this.userList)
    },
    handleBatchSink() { //批量用户沉底
      userBatchSink(this.checkBoxData,this.userList)
    },
    checkNum() {
      console.log(this.option)
      console.log(this.options)
    },
    handleShield(index,uid) {
      this.userList[index].status = 0;
      console.log('屏蔽')
      console.log(index,uid)
    },
    handleReleive(index,uid) {
      this.userList[index].status = 1;
      console.log(index,uid)
      console.log('解封');
    },
    handleSink(index,uid) {
      this.userList[index].status = 2;
      console.log(index,uid)
      console.log('沉底')
    },
    search() {//搜索
      this.mobile()
      console.log(this.lastMobile)
      // console.log(this.phone())
      // console.log(this.factorScreen)
    },
    phone() {
      // console.log(trim())
      // if(this.areaphone != ''){
      //   return trim(this.areacode)+trim(this.areaphone)
      // }else{
      //   return ''
      // }
    },
    handleTag(index, artId, tagId) {
      console.log(index, artId, tagId)
      this.userList[index].tagIds = []
      this.userList[index].tagIds.push(String(tagId))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar-top{
    display: none!important;
  }
  .area_input{
    width:100%;
    .area_code{
      width:18%;
      padding:0 5px;
      text-align: center;
    }
    .area_phone{
      width: 79%;
    }
    input{
      display: inline-block;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
    }
    input::-webkit-input-placeholder {

      /* WebKit browsers */

      color: #bbb;

    }
  }
  #area{
    padding:0;
  }
  .ipt-search{
    .el-col{
      margin-top: 5px;
      padding-left: 5px;
      padding-right: 5px;
      .el-input{
        width: 90%;
      }
      #area{
        padding: 0!important;
      }
      .area{
        #area{
          padding: 0;
        }
      }
    }
  }
  .el-row{
    margin-top:10px;
    .right{
      text-align: right;
    }
    .el-button{
      margin-left: 0;
    }
  }
  .el-table{
    margin-top: 10px;
    .el-button{
      margin-left: 0;
      margin-top: 3px;
    }
  }
  .active{
    background: #FF4040!important;
  }
</style>
