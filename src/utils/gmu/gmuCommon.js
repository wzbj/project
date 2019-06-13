const userStaus = {
  '1':'正常',
  '0':'屏蔽',
  '2':'沉底'
}
const genderStatus = {
  '1':'男',
  '2':'女'
}
const osStatus = {
  '1':'IOS',
  '2':'安卓'
}

// 时间选择器参数
const  pickerOptions = {
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(new Date(new Date().toLocaleDateString()).getTime())
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }]
}

export { userStaus, genderStatus, osStatus, pickerOptions }