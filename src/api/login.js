import request from '@/utils/request'

export function loginByPassword (data) {
  return request({
    url: 'member/password-login',
    method: 'post',
    data
  })
}

// 获取验证码
export function getCode (phone) {
  return request({
    url: 'member/login-code',
    method: 'get',
    params: { phone }
  })
}
