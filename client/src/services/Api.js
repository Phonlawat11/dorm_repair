import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8081/' // ชี้ไปที่พอร์ตของ Backend ที่เราสร้างไว้
  })
}