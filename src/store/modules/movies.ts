import { defineStore } from 'pinia'
import axios from 'axios'
let useMoviesStore = defineStore('Movies', {
  state: () => {
    return {
      movies: []
    }
  },
  actions: {
    async get(url: string) {
      const res = await axios.get(url)
      console.log('movies_get', res);
      if (res.data.code === 200) {
        this.switchUrl(url, res.data)
      }
      return res.data
    },
    async post(url: string, payload: any) {
      const res = await axios.post(url, payload)
      console.log('movies_post', res);
      if (res.data.code === 200) {
        // this.switchUrl(url, res.data)
      }
      return res.data
    },
    switchUrl(url: string, data: any) {
      switch (url) {
        case '/api/get_movies':
          this.movies = data.movies
          break
      }
    },
  },

})

export default useMoviesStore
