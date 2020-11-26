import request from '@/utils/request'

export function askGetCash (data) {
  return request({
    url: 'member/cash',
    method: 'post',
    data
  })
}

export function askGetCashHistory () {
  return request({
    url: 'member/cash',
    method: 'get'
  })
}
