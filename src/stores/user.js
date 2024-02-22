import { defineStore } from "pinia";
export default defineStore("userStore", {
    // 對應 data
    state: () => ({
        token: "",
        userData: {},
    }),
    // 對應 methods (物件形式)
    actions: {
        updateToken(payload) {
            if (payload) {
                this.token = payload
                localStorage.setItem('empToken', payload)
            } else {
                this.token = ''
                localStorage.removeItem('empToken')
            }
        },
        updateUserData(val) {
            this.userData = val
            const empDataStr = JSON.stringify(this.userData)
            localStorage.setItem('empDataStr', empDataStr)
        },
        checkLogin() {
            const storageToken = localStorage.getItem('empToken')
            if (this.token) {
                return this.token
            } else if (storageToken) {
                this.token = storageToken
                return storageToken
            } else {
                return ''
            }
        },
    },
});
