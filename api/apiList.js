import * as API from "./index";
// import {postApi} from "./index";


//post请求示例
function loginAPI(params) {
    return API.postApi("请求地址", params);
}
//gie请求示例
function getDetailHeader(parmas) {
    return API.getApi("请求地址", parmas)
}


// 菜单列表/mp/menu/list
export function MenuList(params) {
  return API.postApi('/mp/menu/list', params)
}
// 菜单列表添加 /mp/menu/add
export function MenuAdd(params) {
  return API.postApi('/mp/menu/add', params)
}
//用户列表/mp/user/list
export function UserList(params) {
  return API.postApi('/mp/user/list', params)
}
//添加用户/mp/user/add
export function UserAdd(params) {
  return API.postApi('/mp/user/add', params)
}
//修改用户/mp/user/update
export function UserUpdate(params) {
  return API.postApi('/mp/user/update', params)
}
//删除用户/mp/user/del
export function UserDel(params) {
  return API.postApi('/mp/user/del', params)
}
// function workingOrSuspend(params) {
//   return postApi('/work/pauseOrRestart', params)
// }