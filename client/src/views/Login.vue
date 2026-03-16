<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>🛠️ ระบบแจ้งซ่อมออนไลน์ (หอพัก)</h1>
    
    <div style="max-width: 350px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2>เข้าสู่ระบบ</h2>
      
      <form @submit.prevent="onLogin">
        <div style="margin-bottom: 15px; text-align: left;">
          <label style="font-weight: bold;">อีเมล:</label>
          <input type="email" v-model="email" required style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" placeholder="กรอกอีเมล">
        </div>
        
        <div style="margin-bottom: 15px; text-align: left;">
          <label style="font-weight: bold;">รหัสผ่าน:</label>
          <input type="password" v-model="password" required style="width: 100%; padding: 10px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;" placeholder="กรอกรหัสผ่าน">
        </div>
        
        <button type="submit" style="width: 100%; padding: 12px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold;">
          เข้าสู่ระบบ
        </button>
      </form>
      
      <div style="margin-top: 15px; text-align: center;">
        <router-link to="/register" style="color: #2196F3; text-decoration: none; font-weight: bold;">
          ยังไม่มีบัญชี? สมัครสมาชิกที่นี่
        </router-link>
      </div>
      
      <p style="color: red; margin-top: 15px;" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthenService from '../services/AuthenService'

// สร้างตัวแปรมารับค่าที่พิมพ์ในกล่อง
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter() // เรียกใช้งาน Router สำหรับเปลี่ยนหน้าเว็บ

// ฟังก์ชันเมื่อกดปุ่ม "เข้าสู่ระบบ"
const onLogin = async () => {
  try {
    const response = await AuthenService.login({
      email: email.value,
      password: password.value
    })
    
    // แจ้งเตือนเมื่อล็อกอินสำเร็จ
    alert('ล็อกอินสำเร็จ! ยินดีต้อนรับคุณ ' + response.data.user.name)
    errorMessage.value = '' // เคลียร์ข้อความ error
    
    // เช็คสิทธิ์ว่าผู้ล็อกอินเป็น User หรือ Admin เพื่อให้เด้งไปหน้าให้ถูกต้อง
    if (response.data.user.role === 'admin') {
      // ถ้าเป็น Admin ให้ไปหน้า Admin Dashboard (เดี๋ยวเราจะสร้างกัน)
      router.push('/admin') 
    } else {
      // ถ้าเป็น User ธรรมดา ให้ไปหน้า User Dashboard (เดี๋ยวเราจะสร้างกัน)
      router.push('/user') 
    }
    
  } catch (error) {
    console.error('Login Error:', error)
    // แสดงข้อความ Error ที่ส่งมาจากฝั่ง Backend
    errorMessage.value = error.response?.data?.error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
  }
}
</script>