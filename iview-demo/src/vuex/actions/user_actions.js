import * as types from '../mutation_types'
let localStorage = window.localStorage
let storeBaseInfo = (data) => {
  localStorage.setItem('diandi_BaseInfo', JSON.stringify(data))
}
// 获取存储在localStorage中的数据
export const getStore = ({ dispatch, state }) => {
  if (localStorage.getItem('diandi_BaseInfo')) {
    let data = JSON.parse(localStorage.getItem('diandi_BaseInfo'))
    dispatch(types.SET_BASEINFO, data)
  }
}
// 设置基础数据
export const setUserInfo = ({ dispatch, state }, info) => {
	storeBaseInfo(info)
  dispatch(types.SET_BASEINFO, info)
}