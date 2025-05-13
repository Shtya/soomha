
import { AXIOS } from '@/config/axios'
import { useTranslations } from 'next-intl'
import  { useEffect, useState } from 'react'
import { notification } from './notification'

const useFetch = (url , token  , city ) => {
      const lang = useTranslations()

      const [load , setLoad] = useState(true)
      const [data , setData] = useState([]) ;

      useEffect(()=> {
            if(city)  AXIOS.get(url , {headers: {  "Accept-Language": lang('lang')   }})
                  .then(res => {
                  setData(res.data)
                  setLoad(false)
            })
            
            if(token) AXIOS.get(url , {headers: { 'Authorization': 'Bearer '+token,  "Accept-Language": lang('lang'),   }})
                  .then(res => {
                        // if(res?.data?.message == "you must login first !!.") return notification(res?.data?.message , "error")
                        setData(res.data.data)
            } ).finally(() => { setLoad(false) })

            else setLoad(false)
      } ,[token])

      return [load , data] 
}

export default useFetch


export const useFetch2 = (url , token ) => {
      const lang = useTranslations()
      const [load , setLoad] = useState(true)
      const [data , setData] = useState([]) ;

      useEffect( () => {
            token && AXIOS.get(url , {headers: {
                  'Authorization': 'Bearer '+token }})

                  .then(res => {setLoad(false) })
      } ,[token , url])

      return [load , data] 
}
