import Api from './Api'

export default {
  index () {
    return Api().get('repairs')
  },
  // ฟังก์ชัน create จะรับข้อมูลเป็น FormData ได้โดยอัตโนมัติผ่าน axios
  create (repairData) {
    return Api().post('repair', repairData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  put (repair) {
    return Api().put('repair/' + repair.id, repair)
  },
  delete (repair) {
    return Api().delete('repair/' + repair.id)
  }
}