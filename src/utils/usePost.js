import { useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import { notification } from '@/utils/notification'
import {  AXIOS } from '@/config/axios'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'


const usePost = (schema , url , place , DATA) => {

  const {register , handleSubmit , formState:{errors} } = useForm({resolver : yupResolver(schema) })
  const [ isLoading ,setIsLoading]  = useState(false)

  const lang = useTranslations()
  const t = useTranslations(place)

  const Submit = handleSubmit( async data => {
    setIsLoading(true)
    try{
      const res = await AXIOS.post(url , DATA(data) , {headers:{ }})
      if(res?.data?.message) notification(res?.data?.message , "success")
    }
    catch(err){
      notification(t("notification_err") , 'error')
    } 
    finally{ setIsLoading(false) }

  })


  return [ register , Submit , errors , isLoading] /*need ( schema , url , place) */
}




export const usePostAuth = (schema , url , place , DATA , token , headers1) => {
  const router = useRouter()
  const lang = useTranslations()


  const {register , handleSubmit , formState:{errors} , reset , getValues , control , watch , setValue } = useForm({resolver : yupResolver(schema) })

  const [ isLoading ,setIsLoading]  = useState(false)
  const t = useTranslations(place)
  const [success ,setSuccess] = useState(false)

  const Submit = handleSubmit( async data => {
    setIsLoading(true)
    try{

      const res = await AXIOS.post(url , DATA(data) , {headers:{ "Accept-Language": lang('lang')  , headers1 , Authorization:`Bearer ${token}`}})
        if(res?.data?.message) notification(res?.data?.message , "success")
        reset()
      
      setTimeout(() => { 
        setSuccess(true)
        if(place == 'enter-email') router.push("/sign-in/otp")
        else if (place == 'sign-in') {
          router.push("/")
          localStorage.setItem("soomha-user" , JSON.stringify(res?.data?.data))
        }
        else if (place == 'my-account') {
          router.push("/sign-in")
          localStorage.removeItem("soomha-user")
        }
        else if ( place == 'sign-up') router.push("/sign-in") 
        else if ( place == 'otp') router.push("/sign-in") 
        else if ( place == "rate-us" ) router.push("/rates") 
        else if ( place == "send-complains" ) router.push("/complains") 
      }, 500);
    }
    catch(err){
      const {response} = err ;
      if(response?.data?.message) return notification( response?.data?.message , 'error') 
      notification(t("notification_err") , 'error') 
    } 
    finally{ setIsLoading(false) }

  })


  return [ register , Submit , errors , isLoading , getValues , success , control , watch , setValue  ] /*need ( schema , url , place) */
}
export default usePost;



export const usePostPeople = (schema , url , place , DATA , token , headerFile ) => {

  const {register , handleSubmit , reset , formState:{errors} , clearErrors , setError , getValues , control , watch , setValue } = useForm({resolver : yupResolver(schema) })
  const [ isLoading ,setIsLoading]  = useState(false)
  const [show , setShow] = useState(false)
  const t = useTranslations(place)
  const [DataCheckout , setDataCheckout] = useState()
  const navigate = useRouter()

  const Submit = handleSubmit( async e => { 
    setIsLoading(true)

    try{
      const res = await AXIOS.post(url , {...DATA(e)} , {headers:{ ...headerFile , Authorization:`Bearer ${token}`}})
      if(res?.data?.message) notification(res?.data?.message , "success")
      if(res?.data?.message == "you must login first !!.") return navigate.push("/sign-in")

          window.scrollTo({ top: 0, behavior: 'smooth' });
          setDataCheckout(res.data.data)
    }
    catch(err){
      const {response} = err ;
      if(response?.data?.message) return notification( response?.data?.message , 'error') 
      notification(t("notification_err") , 'error') 
    } 
    finally{ setIsLoading(false) }

  })

  return [ register , Submit , errors , isLoading , DataCheckout , control , getValues , watch , setValue  , clearErrors , setError , setShow , show ]
}


export const usePostbanks = (schema , url , place , DATA , token ) => {

  const {register , handleSubmit , formState:{errors} , getValues , control , watch , setValue } = useForm({resolver : yupResolver(schema) })
  const [ isLoading ,setIsLoading]  = useState(false)
  const t = useTranslations(place)

  const [DataCheckout , setDataCheckout] = useState()
  const navigate = useRouter()
  

  const Submit = handleSubmit( async e => { 
    setIsLoading(true)

    try{
      const res = await AXIOS.post(url , {...DATA(e)} , {headers:{ Authorization:`Bearer ${token}`}})
      if(res?.data?.message) notification(res?.data?.message , "success")
      if(res?.data?.message == "you must login first !!.") return navigate.push("/sign-in")

          window.scrollTo({ top: 0, behavior: 'smooth' });
          setDataCheckout(res.data.data)
    }
    catch(err){
      const {response} = err ;
      if(response?.data?.message) return notification( response?.data?.message , 'error') 
      notification(t("notification_err") , 'error') 
    } 
    finally{ setIsLoading(false) }

  })

  return [ register , Submit , errors , isLoading , DataCheckout , control , getValues , watch , setValue  ]
}



export const UseCheckout = async( url , body , userID , orderID ) => {
  const lang = useTranslations()
  const [data , setData ] = useState()

  useEffect(_=> {
     userID  && AXIOS.post(url , body )
    .then(res => setData(res.data))
    
  } ,[userID])

    return data
}

