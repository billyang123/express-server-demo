import axios from 'axios';
import Qs from 'qs';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};
console.log(env);
const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:3000' :
    env === 'production' ?
    '' :
    'http://127.0.0.1:3000';
util.ajaxInit = (options)=>{
	let setting = Object.assign({},{
    baseURL: ajaxUrl,
    timeout: 30000,
    transformRequest: [function (data) {
    	// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    	data = Qs.stringify(data);
    	return data;
    }],
    responseType:'json',
    transformResponse: [function (data) {
    // 这里提前处理返回的数据
	    return data;
	  }],
    //withCredentials: true,
    headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  }
	},options)
	return axios.create(setting);
}
let storage = {
  set:function(data,store){
    if(!store) store = window.sessionStorage;
    store.setItem('diandi_BaseInfo', JSON.stringify(data))
  },
  get:function(name,store){
    if(!store) store = window.sessionStorage;
    if (store.getItem('diandi_BaseInfo')) {
      let data = JSON.parse(store.getItem('diandi_BaseInfo'))
      if(name) return data[name]
      return data;
    }
    return null
  },
  clear:function(store){
    if(!store) store = window.sessionStorage;
    store.removeItem('diandi_BaseInfo')
  },
  update:function(obj,store){
    if(!store) store = window.sessionStorage;
    if (store.getItem('diandi_BaseInfo')) {
      let data = JSON.parse(store.getItem('diandi_BaseInfo'));
      let newData = Object.assign({},data,obj);
      store.setItem('diandi_BaseInfo',JSON.stringify(newData))
    }
  },
  remove:function(name,store){
    if(!store) store = window.sessionStorage;
    if (store.getItem('diandi_BaseInfo')) {
      let data = JSON.parse(store.getItem('diandi_BaseInfo'));
      if(name){
        delete data[name];
        store.setItem('diandi_BaseInfo',JSON.stringify(data))
      }else{
        store.removeItem('diandi_BaseInfo')
      }
    }
  }
}
util.storage = storage
//设置cookie
util.setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取cookie
util.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
util.clearCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval=util.getCookie(name);
  if(cval!=null)
  document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
util.logout = function (){
  util.storage.clear();
  util.clearCookie('userId');
}
util.checkLogin = function (comp) {
    var userId = this.getCookie("userId") && util.storage.get('user');
    let user = util.storage.get('user');
    if (userId != "" && user) {
        return true;
    } else {
        comp.$router.push({ path: '/login',query:{directUrl:comp.$route.fullPath} })
        return false;
    }
}
util.getCurUser = function(comp,isLo){
  let user = util.storage.get('user');
  if(user){
      return util.storage.get('user');
  }else{
    isLo && comp.$router.push({ path: '/login',query:{directUrl:comp.$route.fullPath} })
    return null;
  }
}
export default util;
