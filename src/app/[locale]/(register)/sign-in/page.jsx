"use client"
import Image from "next/image"
import IMG_car from '@/assets/login/car.png'
import { X } from "lucide-react"
import {Link} from '@/navigation';
import { useState } from "react"
import { useTranslations } from "next-intl"


//! validation
import { sign_inSchema } from '@/validation/sign_inSchema'
import { Toaster } from 'react-hot-toast'
import EnterEmail from "@/components/EnterEmail"
import  { usePostAuth } from "@/utils/usePost"
import ButtonLoad from "@/atoms/ButtonLoad"


const page = () => {
  const t = useTranslations("sign-in")

  //! Submit handler
  const DATA = (data)=>( { email : data.email , password : data.n_password})
  const [ register , Submit , errors , isLoading] = usePostAuth(sign_inSchema , '/user/auth/login' , 'sign-in' , DATA)



  //! show forget component 
  const [show , setShow] = useState(false)
  const handleForget = ()=>{ setShow(!show) }


  return (
    <div className="sign-in  ">
      <Image src={IMG_car} alt="car" />
      {!show && <div className="container">

          <form className="h-fit  " onSubmit={Submit} action="">
            <div className="head">
              <h2 > {t('depart')} <Link href="/" className="x" > <X /> </Link></h2>
            </div>


            <label className="pt-[20px] max-md:pt-[10px] block "  htmlFor="email"> {t.raw('inputs')[0].label} </label>
            <div className="group"> 
              <svg className="lock" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.5 16C1.1 16 0.75 15.85 0.45 15.55C0.15 15.25 0 14.9 0 14.5V1.5C0 1.1 0.15 0.75 0.45 0.45C0.75 0.15 1.1 0 1.5 0H18.5C18.9 0 19.25 0.15 19.55 0.45C19.85 0.75 20 1.1 20 1.5V14.5C20 14.9 19.85 15.25 19.55 15.55C19.25 15.85 18.9 16 18.5 16H1.5ZM18.5 2.875L10.4 8.175C10.3333 8.20833 10.2708 8.2375 10.2125 8.2625C10.1542 8.2875 10.0833 8.3 10 8.3C9.91667 8.3 9.84583 8.2875 9.7875 8.2625C9.72917 8.2375 9.66667 8.20833 9.6 8.175L1.5 2.875V14.5H18.5V2.875ZM10 6.95L18.4 1.5H1.625L10 6.95ZM1.5 3.05V2.06707V2.08537V1.5V2.075V2.0522V3.05Z" fill="#B0B5AF"/> </svg>
              <input  {...register("email")} type="email" placeholder={t.raw('inputs')[0].place} className="input " name="email" id="email" />
            </div>
            {errors.email?.message &&  <span className="err"> {t(errors.email?.message)} </span>}


            <label className="pt-[20px] max-md:pt-[10px] block "  htmlFor="password"> {t.raw('inputs')[1].label} </label>
            <div className="group"> 
              <svg className="lock" width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 21C1.0875 21 0.734375 20.8531 0.440625 20.5594C0.146875 20.2656 0 19.9125 0 19.5V8.65C0 8.2375 0.146875 7.88438 0.440625 7.59063C0.734375 7.29688 1.0875 7.15 1.5 7.15H3.25V4.75C3.25 3.43583 3.71338 2.31563 4.64015 1.38938C5.56692 0.463125 6.68775 0 8.00265 0C9.31755 0 10.4375 0.463125 11.3625 1.38938C12.2875 2.31563 12.75 3.43583 12.75 4.75V7.15H14.5C14.9125 7.15 15.2656 7.29688 15.5594 7.59063C15.8531 7.88438 16 8.2375 16 8.65V19.5C16 19.9125 15.8531 20.2656 15.5594 20.5594C15.2656 20.8531 14.9125 21 14.5 21H1.5ZM1.5 19.5H14.5V8.65H1.5V19.5ZM8.0042 16C8.53473 16 8.9875 15.8164 9.3625 15.4492C9.7375 15.082 9.925 14.6406 9.925 14.125C9.925 13.625 9.7361 13.1708 9.3583 12.7625C8.9805 12.3542 8.52633 12.15 7.9958 12.15C7.46527 12.15 7.0125 12.3542 6.6375 12.7625C6.2625 13.1708 6.075 13.6292 6.075 14.1375C6.075 14.6458 6.2639 15.0833 6.6417 15.45C7.0195 15.8167 7.47367 16 8.0042 16ZM4.75 7.15H11.25V4.75C11.25 3.84722 10.9343 3.07986 10.3029 2.44792C9.67157 1.81597 8.9049 1.5 8.00295 1.5C7.10098 1.5 6.33333 1.81597 5.7 2.44792C5.06667 3.07986 4.75 3.84722 4.75 4.75V7.15Z" fill="#B0B5AF"/> </svg>
              <input  {...register("n_password")} type="password" name="n_password" placeholder={t.raw('inputs')[1].place} className="input "  id="password" />
            </div>
            {errors.n_password?.message &&  <span className="err"> {t(errors.n_password?.message)} </span>}

            <Link onClick={handleForget} className="forget" href=""> {t.raw('links')[0]} </Link>
            <ButtonLoad isLoading={isLoading} value1={t.raw('links')[1]} value2={t.raw('links')[2]} />
            
          </form>

          <span> {t.raw('links')[3]} <Link href="/sign-up" >{t.raw('links')[4]}</Link> </span>
      </div>}
      <Toaster />
      
      {show && <EnterEmail show={show} setShow={setShow} /> }

    </div>
  )
}

export default page