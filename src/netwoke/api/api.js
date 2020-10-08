import {get,post} from '../http/http.js';
// 封装一个获取数据的方法
export function getAppIndex(){
    return get('api/app/recommend/appIndex')
}
export function getAppBanners(){
    return get('api/app/banner')
}
export function getClassify(id){
    return get('api/app/courseInfo/basis_id='+id)
}
export function postCourseOutline(id){
    return post('api/app/courseChapter',id)
}
export function postCourseAssess(id){
    return post('api/app/courseComment',id)
}
export function getTeacher(id){
    return get('api/app/teacher/'+id)
}
export function getTeacherCourse(id){
    return post('api/app/teacher/mainCourse',id)
}
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
