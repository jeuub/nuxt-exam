import axios from 'axios'
const HOST = 'https://demo-api.vsdev.space'

export const getters = {
  getMainPage: async () => {
    try {
      return await axios.get(`${HOST}/api/farm/home_page`)
    } catch (e) {
      console.log(e)
    }
  },
  getAboutPage: async () => {
    try {
      return await axios.get(`${HOST}/api/farm/about_page`)
    } catch (e) {
      console.log(e)
    }
  },
  getWidget: async () => {
    return await axios.get(`${HOST}/api/farm/left_widget`)
  },
  getForm: async () => {
    return await axios.get(`${HOST}/api/farm/baby/form`)
  },
  getDel: async () => {
    return await axios.get(`${HOST}/api/farm/baby`)
  },
}
