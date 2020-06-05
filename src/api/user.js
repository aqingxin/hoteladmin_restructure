import axios from '../utils/request'
export function userLoginApi(data) {
  return axios({
    url: '/user/login',
    method: 'POST',
    data
  })
}