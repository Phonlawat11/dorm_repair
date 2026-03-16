<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>📝 สมัครสมาชิกใหม่</h1>
    
    <div style="max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <form @submit.prevent="onRegister">
        
        <div style="margin-bottom: 15px; text-align: left;">
          <label style="font-weight: bold;">ชื่อ-นามสกุล:</label>
          <input type="text" v-model="user.name" required style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" placeholder="ชื่อ นามสกุล">
        </div>

        <div style="margin-bottom: 15px; text-align: left;">
          <label style="font-weight: bold;">เลขห้องพัก (ถ้ามี):</label>
          <input type="text" v-model="user.room_number" style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" placeholder="เช่น 101, 205 (Admin ไม่ต้องระบุ)">
        </div>

        <div style="margin-bottom: 15px; text-align: left;">
          <label style="font-weight: bold;">ประเภทผู้ใช้งาน:</label>
          <select v-model="user.role" required style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
            <option value="user">ผู้เช่าทั่วไป (User)</option>
            <option value="admin">เจ้าของหอ/ช่าง (Admin)</option>
          </select>
        </div>

        <div style="margin-bottom: 15px; text-align: left;">
          <label style="font-weight: bold;">อีเมล (ใช้เข้าสู่ระบบ):</label>
          <input type="email" v-model="user.email" required style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" placeholder="กรอกอีเมล">
        </div>
        
        <div style="margin-bottom: 15px; text-align: left;">
          <label style="font-weight: bold;">รหัสผ่าน:</label>
          <input type="password" v-model="user.password" required style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" placeholder="ตั้งรหัสผ่าน">
        </div>
        
        <button type="submit" style="width: 100%; padding: 12px; background-color: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold;">
          ลงทะเบียน
        </button>
      </form>

      <div style="margin-top: 15px;">
        <router-link to="/login" style="color: #666; text-decoration: none;">มีบัญชีอยู่แล้ว? กลับไปเข้าสู่ระบบ</router-link>
      </div>

      <p style="color: red; margin-top: 15px;" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthenService from '../services/AuthenService'
import { useRouter } from 'vue-router'

const router = useRouter()
const errorMessage = ref('')

// สร้าง Object เก็บข้อมูลที่ผู้ใช้พิมพ์
const user = ref({
  name: '',
  room_number: '',
  email: '',
  password: '',
  role: 'user' // ค่าเริ่มต้นเป็น user
})

const onRegister = async () => {
  try {
    const response = await AuthenService.register(user.value)
    alert('สมัครสมาชิกสำเร็จในฐานะ ' + response.data.role + '! กรุณาเข้าสู่ระบบ')
    router.push('/login')
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
  }
}
</script>