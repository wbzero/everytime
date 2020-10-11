import {get,post} from '../http/http.js';
// 封装一个获取数据的方法
// 首页接口
export function getAppIndex(){
    return get('api/app/recommend/appIndex')
}
// 首页轮播图接口
export function getAppBanners(){
    return get('api/app/banner')
}
// 课程详情接口
export function getClassify(id){
    return get('api/app/courseInfo/basis_id='+id)
}
// 课程大纲接口
export function postCourseOutline(id){
    return post('api/app/courseChapter',id)
}
// 课程评论接口
export function postCourseAssess(id){
    return post('api/app/courseComment',id)
}
// 教师详情接口
export function getTeacher(id){
    return get('api/app/teacher/'+id)
}
// 教师课程接口
export function getTeacherCourse(id){
    return post('api/app/teacher/mainCourse',id)
}
// 热门资讯接口
export function postHot(id){
    return post('api/app/information/detail',id)
}
// 获取验证码接口
export function postSmsCode(data){
    return post('api/app/smsCode',data)
}
// 登录接口
export function postLogin(data){
    return post('api/app/login',data)
}
// 设置密码
export function setPassword(data){
    return post('api/app/password',data)
}
// 用户信息接口
export function getUser(){
    return get('api/app/userInfo')
}
// 特色课接口
export function getCourse(data){
    return get('api/app/courseBasis',data)
}
