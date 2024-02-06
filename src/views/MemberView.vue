<template>
    <main class="member">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" aria-current="page">
                    <router-link to="/home">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">會員管理</li>
            </ol>
        </nav>
        <div class="titleGroup">
            <h1>會員管理</h1>
            <div class="searchGroup">
                <select id="searchFilter" class="rounded border border-1 border-dark">
                    <option value="memId">會員編號</option>
                    <option value="memName">會員姓名</option>
                    <option value="memTel">連絡電話</option>
                    <option value="memEmail">電子信箱</option>
                </select>
                <input type="text" id="searchBar" placeholder="請輸入查詢資料" class="rounded border border-1 border-dark" />
            </div>
        </div>
        <div class="memTable">
            <table class="table table-hover">
                <thead>
                    <tr class="border-bottom text-center">
                        <th scope="col">會員編號</th>
                        <th scope="col">會員姓名</th>
                        <th scope="col">連絡電話</th>
                        <th scope="col">電子信箱(帳號)</th>
                        <th scope="col">權限管理</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in memData" class="border-bottom text-center" 
                        :key="index">
                        <th class="pb-3 pt-3">{{ item.mem_id }}</th>
                        <td>{{ item.mem_name }}</td>
                        <td>{{ item.mem_tel }}</td>
                        <td>{{ item.mem_email }}</td>
                        <td>
                            <div class="form-check form-switch">
                                <input class="form-check-input " role="switch" type="checkbox" :name="item.ordId"
                                    :id="item.ordId" v-model="item.memberState" />
                                <label class="form-check-label" :for="item.ordId"></label>
                            </div>
                            <div class="memState">
                                <span v-if="item.member_state">正常</span>
                                <span v-else>已停權</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                memData:[],
            };
        },
        components: {},
        mounted() { },
        methods: {
            fetchMember() {
                axios
                    .get(`${import.meta.env.VITE_API_URL}/member.php`)
                    .then(res => {
                        console.log(res.data.mem); //這可以在f12看到自己的陣列，好用！
                        this.memData = res.data.mem;
                    })
                    .catch(error => console.error('發生錯誤:', error))
            },
        },
        created() {
            this.fetchMember();
        }
    };
</script>