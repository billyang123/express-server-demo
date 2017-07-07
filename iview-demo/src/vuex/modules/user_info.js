// content
import {
  SET_BASEINFO,
  SET_DETAIL
} from '../mutation_types'
const state = {
  // 保存第一页数据
  id: '',
  accessToken: '',
  loginName: '',
  avatarUrl: '',
  email: '',
  level:'',
  createAt: ''
}

const mutations = {
  // 设置 token 登录名 头像
  [SET_BASEINFO] (state, data) {
    try {
      state.id = data.id
      state.accessToken = data.accesstoken || 0
      state.loginName = data.name
      state.avatarUrl = data.avatar
      state.level = data.level || 0
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  mutations
}