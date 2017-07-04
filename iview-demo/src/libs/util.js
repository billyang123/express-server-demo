import axios from 'axios';
import Qs from 'qs';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:3000' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    transformRequest: [function (data) {
    	// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    	data = Qs.stringify(data);
    	return data;
    }],
    transformResponse: [function (data) {
    // 这里提前处理返回的数据
	    return data;
	  }],
    headers: {
	    'Content-Type': 'application/x-www-form-urlencoded'
	  }
});

export default util;