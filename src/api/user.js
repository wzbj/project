import request from '@/utils/request'
// /webadmin/account/accountList

export function accountList(accountForm) {
  
  return request({
    url: '/account/accountList',
    method: 'post',
    data: accountForm
  })
}