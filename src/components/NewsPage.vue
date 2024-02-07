<template>
    <main class="newsPage">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" aria-current="page">
          <router-link to="/home">首頁</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          <router-link to="/news">最新消息管理</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">新增消息</li>
      </ol>
    </nav>
    <div class="titleGroup pb-5">
      <h1>新增消息</h1>
      <form action="" method="post" enctype="multipart/form-data" >
        <div class="wrapper">
          <div class="text">
            <div class="title">
              <label for="newsTitle"><span>消息標題</span></label>
              <input type="text" name="news_title" id="newsTitle" class="form-check-input rounded border border-1 border-gray" placeholder="請輸入最新消息標題">
            </div>
            <div class="date">
              <label for="newsDate"><span>消息發佈時間</span></label>
              <input type="datetime-local" name="news_date" id="newsDate" class="form-check-input rounded border border-1 border-gray">
            </div>
            <div class="content">
              <label for="newsContent"><span>消息內容</span></label>
              <textarea name="news_content" id="newsContent" cols="10" rows="20" class=" rounded border border-1 border-gray " ></textarea>
            </div>
          </div>
          <div class="imgContent">
            <div class="img">
                <label for="newsImg">
                    <img src="../assets/images/default_img/logo_white.svg" alt="">
                </label>
                <span class="upload">點擊上傳圖片</span>
              <input type="file" name="news_img" id="newsImg" accept="image/png, image/jpeg" >
            </div>
            <div class="category">
              <select id="newsCategory" class="rounded border border-1 border-gray">
                <option value="0"><span>請選擇消息分類</span></option>
                <option value="1">桌遊</option>
                <option value="2">活動</option>
                <option value="3">限時</option>
              </select>
            </div>
          </div>
        </div>
        <div @click="addNews" class="btnArea">
          <div class="addBtn">
          <button type="button" class="btn btn-info">
            <i class="fa-solid fa-plus"></i>新增消息
            </button>
          </div>
          <div @click="cancelAdd" class="cancelBtn">
          <button type="button" class="btn btn-outline-secondary">
            取消
          </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>

export default {
  data() {
    return {
        isEditing: false,
        editedMessage: {
            content: '',
        },
        editingIndex: -1,
    };
  },
  components: {
   
  },
  mounted() {},
  methods:{
    addNews() {
        this.$set(this.messages, this.editingIndex, this.editedMessage);
        this.closeEditor();
        console.log('新增消息:')
    },
    cancelAdd() {
        this.clearForm();

        this.isEditing = false;
        this.editedMessage = { content: '' };
        this.editingIndex = -1;
        this.$emit('editor-closed');
    },
    clearForm() {
        this.editedMessage = {
        content: '',
        };
    }
    }
};


</script>