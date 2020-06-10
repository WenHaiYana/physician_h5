import axios from 'axios';
// axios.defaults.timeout = 5000;//延时
axios.defaults.baseURL ='http://114.115.216.211';

// get请求

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      // reject(err)
    })
  })
}
//post请求
 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            // reject(err)
          })
   })
 }
