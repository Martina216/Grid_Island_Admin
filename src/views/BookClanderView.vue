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
import axios from 'axios';
import VueCal from 'vue-cal'
import { dateFormat } from 'vue-cal/dist/i18n/en.cjs';
import 'vue-cal/dist/vuecal.css'
export default {
  components: { VueCal },
  data(){
    return{
      booksData:[],
      today: '',
      events:[],
    }
  },
  created(){
    this.fetchbooks();
  },
  methods:{
    getToday(){
      const today = new Date()
      this.today = today.getFullYear() + '-' + parseInt(today.getMonth()+1) + '-' + today.getDate()
    },
    fetchbooks() {
      axios
      .post(`${import.meta.env.VITE_API_URL}/bookCanlender.php`, {})
      .then(res => {
        console.log(res.data.books);
        this.booksData = res.data.books;
        // console.log(this.booksData.id);
        this.createEvents();
      })
      .catch(error => console.error('發生錯誤:',error))
    },
    createEvents(){
      this.booksData.forEach(item => {
        //先定義一個物件存放資料
        const event={
          start:`${item.book_date} ${item.book_start_time}`,
          end:`${item.book_date} ${item.book_end_time}`,
          title:`${item.mem_name}，${item.table_type_name}`
        };
        //在把這個存放資料的物件放進去events陣列裡
        this.events.push(event);
      });
      console.log(JSON.stringify(this.events.length));
    },

  }
  
}
</script>
<style lang="scss">
//
</style>