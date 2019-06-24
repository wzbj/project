<template>
  <div>
    <page-msg />
    <el-row>
      <el-col :span="11" style="height:10px">
        
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="getMyTask">分配新任务</el-button>
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
        label="ArtID">
        <template slot-scope="scope">
          <a
            :href="'http://custom.gmugmu.com/view/index-index#/qiNiuUnited?slectVideoId='+scope.row.ArtID"
            target="_blank"
            style="color: #46A3FF;"
          >
            {{scope.row.ArtID}}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="images"
        label="视频/图片">
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
        prop="content"
        label="文字内容">
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        align="center"
        label="uid">
        <template slot-scope="scope">
          <a
            :href="'http://custom.gmugmu.com/view/index-index#/qiNiuUnited?slectVideoId='+scope.row.uid"
            target="_blank"
            style="color: #46A3FF;"
          >
            {{scope.row.uid}}
          </a>
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
        prop="createTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="发布地点">
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
        prop="riskGrade"
        label="风控得分">
      </el-table-column>
      <el-table-column
        align="center"
        prop="thumb"
        label="点赞数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="commentNum"
        label="评论数">
      </el-table-column>
      
      <el-table-column
        align="center"
        label="文章状态">
        <template slot-scope="scope">
          <p style="color:red">{{userStaus[scope.row.status]?userStaus[scope.row.status]:'未知'}}</p>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="tagIds"
        label="标签">
        <template slot-scope="scope">
          <el-button @click="handleTag(scope.$index,scope.row.ArtID,item.id)" v-for="item in labelList" :key="item.id" :class="{active:(scope.row.tagIds).includes(String(item.id))}">{{item.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        
        label="操作">
        <template class="testbtn" slot-scope="scope">
          <el-button size="small" @click="handleShield(scope.$index, scope.row.uid)" type="danger" v-if="scope.row.status == '1'">屏蔽</el-button>
          <el-button size="small" @click="handleSink(scope.$index, scope.row.uid)" type="danger" v-if="scope.row.status == '1'">沉底</el-button>
          <el-button size="small" @click="handleReleive(scope.$index, scope.row.uid)" type="success" v-if="scope.row.status == '0'">解封</el-button>
          <el-button size="small" @click="handleSink(scope.$index, scope.row.uid)" type="danger" v-if="scope.row.status == '0'">沉底</el-button>
          <el-button size="small" @click="handleReleive(scope.$index, scope.row.uid)" type="success" v-if="scope.row.status == '2'">海捞</el-button>
          <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
            <el-button type="primary" size="small">日志</el-button>
          </a>
          <a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
            <el-button type="warning" size="small">修改记录</el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
      
  </div>
</template>

<script>
import PageMsg from '@/components/Page/PageMsg'
import { userStaus, genderStatus, osStatus } from "@/utils/gmu/gmuCommon";
import { userBatchShield, userBatchReleive, userBatchSink } from "@/utils/gmu/handleUser"
export default {
  name:'MyTask',
  components:{
    PageMsg
  },
  data() {
    return {
      currentPage3: 5,
      userStaus:userStaus,
      genderStatus:genderStatus,
      flgTime:0,
      osStatus:osStatus,
      checkBoxData:[],
      tags:['追星','唱歌','跳舞','happy','哈哈哈'],
      labelList:[
        {id:1,name:'推荐'},
        {id:17,name:'男孩'},
        {id:18,name:'女孩'},
        {id:14,name:'晒物'},
        {id:15,name:'打卡'},
        {id:2,name:'活动'}
      ],
      userList:[{
        ArtID:11111,
        uid:101,
        thumb:11,
        commentNum:20,
        tagIds:["18"],
        content:'哈哈哈哈',
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
        ArtID:2222,
        uid:102,
        thumb:11,
        commentNum:20,
        tagIds:["18"],
        content:'哈哈哈哈',
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
        ArtID:333333,
        uid:103,
        thumb:11,
        commentNum:20,
        tagIds:["18"],
        content:'哈哈哈哈',
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
        ArtID:44444,
        uid:104,
        thumb:11,
        commentNum:20,
        tagIds:["18"],
        content:'哈哈哈哈',
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
      }]
    }
  },
  methods: {
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
    getMyTask() {
      let nowTime = new Date();
      let flg = nowTime - this.flgTime > 60 * 1000
      console.log(flg)
      if(flg){
        this.flgTime = nowTime
        this.$message({
          type: 'success',
          message: '获取任务成功'
        })
      }else{
        this.$message({
          type: 'warning',
          message: '不要连续点击吆！！！'
        })
      }
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
