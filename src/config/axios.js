import axios from 'axios'
import { useTranslations } from 'next-intl'

export const Axios = axios.create({
    baseURL : "https://api.soomha.net/api",
    headers: {
      'Content-Type': 'application/json', 
    }
  })


export const AXIOS = axios.create({
  baseURL : "https://api.soomha.net/api",
})
export const baseUrl = axios.create({
  baseURL : "https://api.soomha.net",
})
