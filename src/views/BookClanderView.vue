<template>
  <div class="bookClander">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">預約管理</li>
        <li class="breadcrumb-item active" aria-current="page">預約行事曆</li>
      </ol>
    </nav>
    <div class="titleGroup">
      <h1>預約行事曆</h1>
    </div>
    <vue-cal class="vuecal--blue-theme"   
    hide-view-selector   
    :selected-date="today" 
    :disable-views="['years', 'year']"
    :time-from="9 * 60"
    :time-to="21 * 60"
    :time-step="180"
    :timeCellHeight="100"
    :editable-events="{ title: false, drag: false, resize: false, delete: false, create: false }"
    :events="events"
    events-on-month-view="short"
    />
  </div>

</template>

<script>
import VueCal from 'vue-cal'
import { dateFormat } from 'vue-cal/dist/i18n/en.cjs';
import 'vue-cal/dist/vuecal.css'
export default {
  components: { VueCal },
  data(){
    return{
      today: '',
      events: [{
        start: '2024-02-08 09:00',
        end: '2024-02-08 12:00',
        title: '古迪錐4人桌'
      },{
        start: '2024-02-08 09:00',
        end: '2024-02-08 12:00',
        title: '古迪錐4人桌'
      }
    ],
    }
  },
  methods:{
    getToday(){
      const today = new Date()
      this.today = today.getFullYear() + '-' + parseInt(today.getMonth()+1) + '-' + today.getDate()
    }
  }
  
}
</script>
<style lang="scss">
//
</style>