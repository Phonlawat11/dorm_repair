import Api from './Api'

export default {
  // ฟังก์ชันสำหรับส่งข้อมูลไปสมัครสมาชิก
  register (credentials) {
    return Api().post('register', credentials)
  },
  // ฟังก์ชันสำหรับส่งข้อมูลไปล็อกอิน
  login (credentials) {
    return Api().post('login', credentials)
  }
}