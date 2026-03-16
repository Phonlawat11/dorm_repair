<template>
  <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
      <h1>👨‍🔧 ระบบจัดการแจ้งซ่อม (Admin)</h1>
      <button @click="logout" style="padding: 8px 16px; background-color: #666; color: white; border: none; border-radius: 4px; cursor: pointer;">ออกจากระบบ</button>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h2 style="margin: 0;">รายการแจ้งซ่อมทั้งหมด ({{ repairs.length }})</h2>
        <button @click="fetchRepairs" style="padding: 5px 10px; cursor: pointer;">🔄 รีเฟรชข้อมูล</button>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #333; color: white; text-align: left;">
            <th style="padding: 12px; border: 1px solid #ddd;">วันที่</th>
            <th style="padding: 12px; border: 1px solid #ddd;">ห้อง</th>
            <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">รูปภาพ</th>
            <th style="padding: 12px; border: 1px solid #ddd;">อาการเสีย</th>
            <th style="padding: 12px; border: 1px solid #ddd;">สถานะ</th>
            <th style="padding: 12px; border: 1px solid #ddd;">จัดการ</th>
            <th style="padding: 12px; border: 1px solid #ddd; text-align: center;">ลบ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repair in repairs" :key="repair.id">
            <td style="padding: 10px; border: 1px solid #ddd;">{{ new Date(repair.createdAt).toLocaleDateString('th-TH') }}</td>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">{{ repair.room_number }}</td>
            
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
              <div v-if="repair.image">
                <a :href="'http://localhost:8081/uploads/' + repair.image" target="_blank" title="คลิกเพื่อดูรูปใหญ่">
                  <img :src="'http://localhost:8081/uploads/' + repair.image" 
                       style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd; display: block; margin: 0 auto;">
                </a>
              </div>
              <span v-else style="color: #ccc; font-size: 12px;">ไม่มีรูป</span>
            </td>

            <td style="padding: 10px; border: 1px solid #ddd;">
              <small style="color: #666; font-weight: bold;">[{{ repair.category }}]</small><br>
              {{ repair.description }}
            </td>
            
            <td style="padding: 10px; border: 1px solid #ddd;">
              <span :style="statusBadge(repair.status)">{{ repair.status }}</span>
            </td>
            
            <td style="padding: 10px; border: 1px solid #ddd;">
              <select @change="updateStatus(repair, $event)" style="padding: 5px; cursor: pointer; border-radius: 4px;">
                <option value="รอดำเนินการ" :selected="repair.status === 'รอดำเนินการ'">รอดำเนินการ</option>
                <option value="กำลังซ่อม" :selected="repair.status === 'กำลังซ่อม'">กำลังซ่อม</option>
                <option value="เสร็จสิ้น" :selected="repair.status === 'เสร็จสิ้น'">เสร็จสิ้น</option>
              </select>
            </td>
            
            <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">
              <button @click="deleteRepair(repair)" style="color: #f44336; border: none; background: none; cursor: pointer; font-size: 18px;">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="repairs.length === 0" style="text-align: center; color: #999; margin-top: 20px;">ไม่มีข้อมูลการแจ้งซ่อม</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RepairService from '../services/RepairService'

const router = useRouter()
const repairs = ref([])

const fetchRepairs = async () => {
  try {
    const response = await RepairService.index()
    repairs.value = response.data.reverse()
  } catch (error) {
    console.error('Error fetching repairs:', error)
  }
}

const updateStatus = async (repair, event) => {
  const newStatus = event.target.value
  try {
    repair.status = newStatus
    // ส่งข้อมูลไปอัปเดตที่ Backend
    await RepairService.put(repair)
    alert('อัปเดตสถานะสำเร็จ!')
  } catch (error) {
    alert('ไม่สามารถอัปเดตสถานะได้')
  }
}

const deleteRepair = async (repair) => {
  if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
    try {
      await RepairService.delete(repair)
      fetchRepairs()
    } catch (error) {
      alert('ลบข้อมูลไม่สำเร็จ')
    }
  }
}

const statusBadge = (status) => {
  let color = '#666'
  if (status === 'รอดำเนินการ') color = '#f44336'
  if (status === 'กำลังซ่อม') color = '#ff9800'
  if (status === 'เสร็จสิ้น') color = '#4caf50'
  return {
    color: color,
    fontWeight: 'bold',
    padding: '4px 8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: `1px solid ${color}`,
    fontSize: '12px'
  }
}

const logout = () => {
  router.push('/login')
}

onMounted(fetchRepairs)
</script>