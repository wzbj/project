<template>
  <div>
    <page-msg />
    <el-row>
      <el-col :span="11" style="height:10px">
        
      </el-col>
      <el-col :span="3">
        <el-button type="primary">分配新任务</el-button>
      </el-col>
      <el-col :span="10" class="right">
        <el-button type="danger">批量屏蔽</el-button>
        <el-button type="success">批量解封</el-button>
        <el-button type="danger">批量沉底</el-button>
        <el-button type="success">批量捞起</el-button>
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
        label="UID">
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
        prop="riskGrade"
        label="风控得分">
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
          <el-button size="small" type="danger" v-if="scope.row.status == '1'">屏蔽</el-button>
          <el-button size="small" type="danger" v-if="scope.row.status == '1'">沉底</el-button>
          <el-button size="small" type="success" v-if="scope.row.status == '0'">解封</el-button>
          <el-button size="small" type="danger" v-if="scope.row.status == '0'">沉底</el-button>
          <el-button size="small" type="success" v-if="scope.row.status == '2'">海捞</el-button>
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
export default {
  name:'MyTask',
  components:{
    PageMsg
  },
  data() {
    return {
      currentPage3: 5,
      userStaus:{
        '1':'正常',
        '0':'屏蔽',
        '2':'沉底'
      },
      genderStatus:{
        '1':'男',
        '2':'女'
      },
      osStatus:{
        '1':'IOS',
        '2':'安卓'
      },
      tags:['追星','唱歌','跳舞','happy','哈哈哈'],
      userList:[{
        uid:11111,
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
        uid:2222,
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
        uid:333333,
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
        uid:44444,
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
</style>
