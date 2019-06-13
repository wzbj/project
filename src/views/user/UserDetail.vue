<template>
  <div>
    <h5>用户详情</h5>
    <hr>
    <el-row>
      <el-col :span="18" class="left">
        <!-- 左边详情 -->
        <el-row>
          <!-- <label for="">详情</label>
          <input type="text" placeholder="性情内容"> -->
          <el-col :span="6">
            <InputGroup label="账号" placeholder="账号" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6">
            <InputGroup label="昵称" placeholder="昵称" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6" style="padding-left:15px;padding-right:15px;">
            <label for="" style="display:block;line-height:20px;">性别:</label>
            <select v-model="value" name="" id="" style="display:block;width:100%;font-size:18px;">
              <option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"></option>
            </select>
          </el-col>
          <el-col :span="6">
            <InputGroup label="目的" placeholder="目的" v-model="value"></InputGroup>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <InputGroup label="星座" placeholder="星座" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6">
            <InputGroup label="年龄" placeholder="年龄" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6">
            <InputGroup label="管理员备注" placeholder="管理员备注" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6">
            <InputGroup label="ip" placeholder="ip" v-model="value"></InputGroup>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <InputGroup label="手机号" placeholder="手机号" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="18">
            <InputGroup label="个性签名" placeholder="个性签名" v-model="value"></InputGroup>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <InputGroup label="注册时间" placeholder="注册时间" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6">
            <InputGroup label="最后登录时间" placeholder="最后登录时间" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6">
            <InputGroup label="用户得分" placeholder="用户得分" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="6">
            <InputGroup label="标签" placeholder="标签" v-model="value"></InputGroup>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <InputGroup label="喜欢" placeholder="喜欢" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="4" style="color:red;line-height:60px;font-size:32px;">未认证</el-col>
          <el-col :span="24">
            <InputGroup label="讨厌" placeholder="讨厌" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="24">
            <InputGroup label="uuid" placeholder="uuid" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="12">
            <InputGroup label="设备" placeholder="设备" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="12">
            <InputGroup label="用户反馈问题类别" placeholder="用户反馈问题类别" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="8">
            <InputGroup label="用户版本" placeholder="用户版本" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="8">
            <InputGroup label="内部版本" placeholder="内部版本" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="8">
            <InputGroup label="用户系统版本" placeholder="用户系统版本" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="24">
            <label for="">封面图</label>
            <div class="covers">
              <a style="float:left;margin-left:4px;" v-for="(value,index) in covers" :key="index">
                <img :src="value" style="width:200px;" preview="1" alt="">
                <div class="join">
                  <el-button size="small" type="danger" style="display:inline-block;margin:0;">加入黑名单</el-button>
                  <el-button size="small" type="success" style="display:inline-block;margin:0;" @click="addWhite(value)">加入白名单</el-button>
                  <el-button size="small" type="danger" style="display:inline-block;margin:0;" @click="deletePhoto(coversId[index])">删除</el-button>
                </div>
                <!-- {{value}}--{{index}}--{{coversId[index]}} -->
              </a>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <!-- 右边栏 -->
        <el-row>
          <el-col :span="24">
            <img src="http://jimu-cover-new.cdn.bcebos.com/6870723_iiiiii@q_80?39" alt="">
          </el-col>
          <el-col :span="24">
            <InputGroup style="padding-left:0;" label="所在经纬度以及地理信息" placeholder="经纬度" v-model="value"></InputGroup>
          </el-col>
          <el-col :span="24">
            <div class="detail">{{detailAddress}}</div>
          </el-col>
          <el-col :span="24">
            <div class="detail">手机归属地:{{phoneOwnership}}</div>
          </el-col>
          <el-col :span="24">
            <div class="detail">IP归属地:{{ipOwnership}}</div>
          </el-col>
          <el-col :span="24">
            <div class="detail">沉底原因:{{sinkReason}}</div>
          </el-col>
          <el-col :span="24">
            <el-button class="rightBtn" type="primary">添加备注</el-button>
            <el-button class="rightBtn" type="warning">替换头像</el-button>
            <el-button class="rightBtn" type="primary">刘波回复</el-button>
            <el-button class="rightBtn" type="primary">给用户发送短信</el-button>
            <el-button class="rightBtn" type="danger" v-if="status == '1'">屏蔽</el-button>
            <el-button class="rightBtn" type="danger" v-if="status == '1'">沉底</el-button>
            <el-button class="rightBtn" type="success" v-if="status == '0'">解封</el-button>
            <el-button class="rightBtn" type="danger" v-if="status == '0'">沉底</el-button>
            <el-button class="rightBtn" type="success" v-if="status == '2'">海捞</el-button>
            <el-button class="rightBtn" type="primary">左滑<span style="color:red;">{{leftNum}}</span>次 | 右滑动<span style="color:red;">{{rightNum}}</span></el-button>
            <el-button class="rightBtn" type="warning">左滑清零</el-button>
            <el-button class="rightBtn" type="danger">右滑清零</el-button>
            <el-button class="rightBtn" type="primary">匿名滑动<span style="color:red;">{{anonymousNum}}</span>次</el-button>
            <el-button class="rightBtn" type="danger">匿名滑动清零</el-button>
            <el-button class="rightBtn" type="warning">给Ta一个头像</el-button>
            <el-button class="rightBtn" type="danger">删除视频卡牌状态</el-button>
            <el-button class="rightBtn" type="success">查看点赞ugc</el-button>
            <el-button class="rightBtn" type="danger">添加高危用户</el-button>
            <el-button class="rightBtn" type="warning">大V认证</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InputGroup from '@/components/Tool/InputGroup'
import { trim } from '@/utils/validate'
export default {
  name:'MyTask',
  components:{
    InputGroup
  },
  data() {
    return {
      value:'',
      genders:[{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],
      status:2,
      leftNum:50,
      rightNum:100,
      anonymousNum:5,
      detailAddress:'湖南省长沙市芙蓉区火星街道马王堆北路晨光花园(马王堆北路)',
      phoneOwnership:'广东  中国联通',
      ipOwnership:'183.92.249.200湖北省随州市联通',
      sinkReason:'不是沉底状态',
      covers:["http://jimu-cover-new.cdn.bcebos.com/6892782_E67X8I",
              "http://jimu-cover-new.cdn.bcebos.com/6892782_iiiiii",
              "http://jimu-cover-new.cdn.bcebos.com/6892782_cliCjK",
              "http://jimu-cover-new.cdn.bcebos.com/6892782_iggae8",
              "http://jimu-cover-new.cdn.bcebos.com/6892782_ZIsl2P",
              "http://jimu-cover-new.cdn.bcebos.com/6892782_0xasNT"
      ],
      coversId:["49623910","49625053","49623583","49623194","49623623","49624156","49624663"]
    }
  },
  methods: {
    addWhite(photo) {
      console.log(photo)
    },
    deletePhoto(coverId) {
      console.log(coverId)
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
h5{
  padding-left: 60;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #409EFF;
}
.left .el-row{
  padding-left:10px;
  padding-right:10px;
}
.detail{
  background: #dff0d8;
  padding: 12px;
  margin-top: 4px;
  font-size:12px
}
.rightBtn{
  margin-top:4px;
  margin-left: 0;
  width:100%;
}
.join{
  margin-top:4px;
  margin-bottom:4px;
  .el-button{
    display: inline-block;
    margin:0;
    padding: 8px 8px;
  }
}
</style>