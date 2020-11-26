import request from '@/utils/request'

export function updatePassword (data) {
  return request({
    url: 'member/update-password',
    method: 'post',
    data
  })
}
