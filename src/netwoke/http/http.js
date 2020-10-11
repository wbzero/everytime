import axios from 'axios'
// 当环境切换时改变axios的默认路径
if(process.env.NODE_ENV == 'development'){
    axios.defaults.baseURL = 'http://120.53.31.103:84/'
}
if(process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'https://wap.365msmk.com/'
}
// 设置默认请求超时时间
axios.defaults.timeout = 5000;
// 请求拦截和响应拦截
axios.interceptors.request.use(
    config => {
        let token = 'Bearer '+localStorage.token;
        config.headers = {DeviceType:'H5',Authorization:token}
        return config
    }
);
// axios.interceptors.responce.use(
//     response => {
        
//     },
//     error => {
//         if (error,response,status){

//         }
//     }
// );
// 使用Promise返回axios请求的结果  (返回的是promise)
export function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}

export function post(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,params).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}