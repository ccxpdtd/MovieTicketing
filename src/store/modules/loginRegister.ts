import { defineStore } from 'pinia'
import axios from 'axios'


let useLoginRegisterStore = defineStore('LoginRegister', {
  state: () => {
    return {
      token: '',
      uid: '',
      name: '',
      nickname: ''
    }
  },
  actions: {
    async post(url: string, payload: any) {
      const res = await axios.post(url, payload)
      console.log('post_res', res);
      if (res.data.code === 200) {
        this.switchUrl(url, res.data)
      }
      return res.data
    },
    switchUrl(url: string, data: any) {
      switch (url) {
        case '/api/login_psw':
          this.token = data.token
          this.uid = data.user.id
          this.name = data.user.name
          localStorage.setItem('token', data.token)
          break
      }
    },
  },

})

export default useLoginRegisterStore
