import { useForm} from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import { notification } from '@/utils/notification'
import {  AXIOS, baseUrl } from '@/config/axios'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { sign_upSchema } from '@/validation/sign_upSchema'
import axios from 'axios'
import { useRouter } from '@/navigation'



export const useSignup = ( place ) => {
  const router = useRouter()
  const lang = useTranslations()
  const t = useTranslations()


  const {register , handleSubmit , formState:{errors} , reset , getValues , control , watch , setValue } = useForm({resolver : yupResolver(sign_upSchema) })

  const [ isLoading ,setIsLoading]  = useState(false)
  const [success ,setSuccess] = useState(false)

  

  const Submit = handleSubmit( async data => {
    setIsLoading(true)
    const handleData = { 
      phone : data?.phone , 
      email : data?.email , 
      password : data?.password , 
      c_password:data?.confirmPassword 
    }

    try{
      const res = await AXIOS.post('/user/auth/register' , handleData , {headers:{ "Accept-Language": lang('lang') }})
        if(res?.data?.message) notification(res?.data?.message , "success")
        // reset()
        router.push("/sign-in")
    }
    catch(err){
      const {response} = err ;
      if(response.status == 430){
        notification( t("verifyEmail") , 'success') 
        localStorage.setItem('verifyEmail', data?.email )
        setTimeout(() => {
          router.push("verify-email")
        }, 500);
      }
      else if (response?.data?.message) return notification( response?.data?.message , 'error') 
      else notification(t("notification_err") , 'error') 
    } 
    finally{ setIsLoading(false) }

  })


  const [loadingResend , setloadingResend ] = useState(false)
  const resend = async()=>{
    setloadingResend(true)

    try{
        const res = await AXIOS.post(`email/verification-notification`, {email : localStorage.getItem("verifyEmail")} , {headers:{ "Accept-Language": lang('lang') }})
        if(res?.data?.message) notification(res?.data?.message , "success")
    }
    catch(err){
      const {response} = err ;
      if (response?.data?.message) return notification( response?.data?.message , 'error') 
      else notification(t("notification_err") , 'error') 
    } 
    finally{ setloadingResend(false) }

  }
  


  return [ register , Submit , errors , isLoading , getValues , success , control , watch , setValue , loadingResend , resend  ]
}
