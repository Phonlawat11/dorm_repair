<template>
  <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">
      <h1 style="margin: 0;">🏠 หน้าจัดการผู้เช่า</h1>
      <button @click="logout" style="padding: 8px 16px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">ออกจากระบบ</button>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
      <h2 style="margin-top: 0; color: #2196F3;">🛠️ แจ้งซ่อมใหม่</h2>
      <form @submit.prevent="submitRepair">
        
        <div style="margin-bottom: 15px;">
          <label style="font-weight: bold;">เลขห้อง:</label>
          <input type="text" v-model="form.room_number" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: bold;">หมวดหมู่ปัญหา:</label>
          <select v-model="form.category" required style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;">
            <option value="" disabled>-- เลือกหมวดหมู่ --</option>
            <option value="น้ำ">💧 น้ำ</option>
            <option value="ไฟ">⚡ ไฟ</option>
            <option value="แอร์">❄️ แอร์</option>
            <option value="อื่นๆ">🔧 อื่นๆ</option>
          </select>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: bold;">รายละเอียด:</label>
          <textarea v-model="form.description" required rows="3" style="width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
        </div>

        <div style="margin-bottom: 15px;">
          <label style="font-weight: bold;">แนบรูปภาพอาการเสีย:</label>
          <input type="file" @change="onFileChange" accept="image/*" style="width: 100%; margin-top: 5px;">
        </div>

        <button type="submit" style="padding: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; width: 100%; font-weight: bold; cursor: pointer;">
          ส่งใบแจ้งซ่อม (พร้อมรูปถ่าย)
        </button>
      </form>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h2>📋 ประวัติการแจ้งซ่อม</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f2f2f2; text-align: left;">
            <th style="padding: 12px; border-bottom: 1px solid #ddd;">วันที่</th>
            <th style="padding: 12px; border-bottom: 1px solid #ddd;">ห้อง</th>
            <th style="padding: 12px; border-bottom: 1px solid #ddd;">รูปภาพ</th>
            <th style="padding: 12px; border-bottom: 1px solid #ddd;">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repair in repairs" :key="repair.id">
            <td style="padding: 12px; border-bottom: 1px solid #ddd;">{{ new Date(repair.createdAt).toLocaleDateString() }}</td>
            <td style="padding: 12px; border-bottom: 1px solid #ddd;">{{ repair.room_number }}</td>
            <td style="padding: 12px; border-bottom: 1px solid #ddd;">
              <img v-if="repair.image" :src="'http://localhost:8081/uploads/' + repair.image" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
              <span v-else style="color: #ccc;">ไม่มีรูป</span>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #ddd;">
              <span style="font-weight: bold;">{{ repair.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RepairService from '../services/RepairService'

const router = useRouter()
const repairs = ref([])
const selectedFile = ref(null) // ตัวแปรเก็บไฟล์ที่เลือก

const form = ref({
  room_number: '',
  category: '',
  description: ''
})

// ฟังก์ชันดึงไฟล์จาก input
const onFileChange = (e) => {
  selectedFile.value = e.target.files[0]
}

const fetchRepairs = async () => {
  const response = await RepairService.index()
  repairs.value = response.data.reverse()
}

const submitRepair = async () => {
  try {
    // ⚠️ สำคัญ: ต้องใช้ FormData ในการส่งไฟล์
    const formData = new FormData()
    formData.append('room_number', form.value.room_number)
    formData.append('category', form.value.category)
    formData.append('description', form.value.description)
    formData.append('user_id', 1) // จำลอง user_id
    
    if (selectedFile.value) {
      formData.append('image', selectedFile.value) // 'image' ต้องตรงกับใน Backend (upload.single('image'))
    }

    await RepairService.create(formData)
    alert('ส่งใบแจ้งซ่อมสำเร็จ!')
    
    // เคลียร์ค่า
    form.value.description = ''
    selectedFile.value = null
    fetchRepairs()
  } catch (error) {
    alert('เกิดข้อผิดพลาด')
  }
}

const logout = () => router.push('/login')
onMounted(fetchRepairs)
</script>