<template>
  <div class="bookClander">
    <h3>


    </h3>
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
        title: '王先生4人桌'
      },

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