import Vue from 'vue'

export function userBatchShield(checkBoxData,userList) {//批量屏蔽用户
  let checkLen = checkBoxData.length
  console.log(checkLen)
  if(checkLen <= 0){
    Vue.prototype.$message({
        type: 'warning',
        message: '请至少选择一个用户'
      });
  }else{
    Vue.prototype.$confirm('此操作将屏蔽选中用户, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      userList.filter((item,index) => {
        if(item.uid == checkBoxData[index]) {
          item.status = 0
        }
      })
      Vue.prototype.$message({
        type: 'success',
        message: '屏蔽成功!'
      });
    }).catch(() => {
      Vue.prototype.$message({
        type: 'info',
        message: '已取消屏蔽'
      });          
    });
  }
}

export function userBatchReleive(checkBoxData,userList) {//批量解封用户
  let checkLen = checkBoxData.length
  console.log(checkLen)
  if(checkLen <= 0){
    Vue.prototype.$message({
        type: 'warning',
        message: '请至少选择一个用户'
      });
  }else{
    Vue.prototype.$confirm('此操作将解封选中用户, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      userList.filter((item,index) => {
        if(item.uid == checkBoxData[index]) {
          item.status = 1
        }
      })
      Vue.prototype.$message({
        type: 'success',
        message: '解封成功!'
      });
    }).catch(() => {
      Vue.prototype.$message({
        type: 'info',
        message: '已取消解封'
      });          
    });
  }
}

export function userBatchSink(checkBoxData,userList) {//批量沉底用户
  let checkLen = checkBoxData.length
  console.log(checkLen)
  if(checkLen <= 0){
    Vue.prototype.$message({
        type: 'warning',
        message: '请至少选择一个用户'
      });
  }else{
    Vue.prototype.$confirm('此操作将沉底选中用户, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      userList.filter((item,index) => {
        if(item.uid == checkBoxData[index]) {
          item.status = 2
        }
      })
      Vue.prototype.$message({
        type: 'success',
        message: '沉底成功!'
      });
    }).catch(() => {
      Vue.prototype.$message({
        type: 'info',
        message: '已取消沉底'
      });          
    });
  }
}

