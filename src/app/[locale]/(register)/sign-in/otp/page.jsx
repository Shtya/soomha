"use client"

import Image from "next/image"
import IMG_car from '@/assets/login/car.png'
import { X } from "lucide-react"
import {Link} from '@/navigation';
import { useState } from "react"
import { useTranslations } from "next-intl"
//! validation
import { otpSchema } from '@/validation/otpSchema'
import { Toaster } from 'react-hot-toast'
import Input from "@/atoms/Input"
import IMG_success from '@/assets/success.png'
import ButtonLoad from "@/atoms/ButtonLoad"
import { usePostAuth } from "@/utils/usePost"


const Page = () => {
    const t = useTranslations("otp")
    const [success , setSuccess] = useState(true) ;


    //! Submit handler
    const DATA = (data)=>( {  code : data.otp , password : data.password , c_password :  data.confirmPassword })
    const [ register , Submit , errors , isLoading] = usePostAuth(otpSchema , '/user/auth/change-password' , 'otp' , DATA)


    return (
    <div className=" relative  min-h-screen opt2 ">
        <Image className="w-full h-full object-cover absolute inset-0 "  src={IMG_car} alt="car" />
        <div className="bg-black  h-full flex items-center justify-center ">


        <form onSubmit={Submit} className=" z-[10] absolute top-[50%] translate-y-[-50%] gap-[20px] flex items-center justify-center flex-col bg-white max-w-[600px] w-[calc(100%-40px)] mx-auto  h-fit inset-0 p-[30px] rounded-[20px] " >
                <div className="head w-full ">
                    <h2 className=" flex items-center justify-between mb-[30px] " > 
                        <span className="text-[29px] font-[700] " > {t('depart')} </span>
                        <Link href="/sign-in" className="  w-[35px] h-[35px] bg-[#e04652] text-white flex items-center justify-center rounded-[50%] " > <X /> </Link>
                    </h2>
                </div>

                <Input cnInput={"rounded-[30px]"} cn={"w-full max-w-[450px]"} reg={register('otp')}              err={errors.otp}             err_star="no" id="otp"             label={t.raw('field')[0].label} place={t.raw('field')[0].place}  type="number"  />
                <Input cnInput={"rounded-[30px]"} cn={"w-full max-w-[450px]"} reg={register('password')}         err={errors.password}        err_star="no" id="password"        label={t.raw('field')[1].label} place={t.raw('field')[1].place}  type="password"  />
                <Input cnInput={"rounded-[30px]"} cn={"w-full max-w-[450px]"} reg={register('confirmPassword')}  err={errors.confirmPassword} err_star="no" id="confirmPassword" label={t.raw('field')[2].label} place={t.raw('field')[2].place}  type="password"  />

                <ButtonLoad cn="w-full max-w-[450px] mt-[20px] " isLoading={isLoading} value1={t.raw('button')[0]} value2={t.raw('button')[1]} />
            </form>
        {/* {success == false 
        ? <form onSubmit={Submit} className=" z-[10] absolute top-[50%] translate-y-[-50%] gap-[20px] flex items-center justify-center flex-col bg-white max-w-[600px] w-[calc(100%-40px)] mx-auto  h-fit inset-0 p-[30px] rounded-[20px] " >
                <div className="head w-full ">
                    <h2 className=" flex items-center justify-between mb-[30px] " > 
                        <span className="text-[29px] font-[700] " > {t('depart')} </span>
                        <Link href="/sign-in" className="  w-[35px] h-[35px] bg-[#e04652] text-white flex items-center justify-center rounded-[50%] " > <X /> </Link>
                    </h2>
                </div>

                <Input cnInput={"rounded-[30px]"} cn={"w-full max-w-[450px]"} reg={register('otp')}              err={errors.otp}             err_star="no" id="otp"             label={t.raw('field')[0].label} place={t.raw('field')[0].place}  type="number"  />
                <Input cnInput={"rounded-[30px]"} cn={"w-full max-w-[450px]"} reg={register('password')}         err={errors.password}        err_star="no" id="password"        label={t.raw('field')[1].label} place={t.raw('field')[1].place}  type="password"  />
                <Input cnInput={"rounded-[30px]"} cn={"w-full max-w-[450px]"} reg={register('confirmPassword')}  err={errors.confirmPassword} err_star="no" id="confirmPassword" label={t.raw('field')[2].label} place={t.raw('field')[2].place}  type="password"  />

                <ButtonLoad cn="w-full max-w-[450px] mt-[20px] " isLoading={isLoading} value1={t.raw('button')[0]} value2={t.raw('button')[1]} />
            </form>
        
        : <div className=" z-[10] absolute top-[50%] translate-y-[-50%] gap-[20px] flex items-center justify-center flex-col bg-white max-w-[600px] w-[calc(100%-40px)] mx-auto  h-fit inset-0 p-[30px] rounded-[20px] "> 
            <Link href="/sign-in" className="x absolute top-[30px] right-[30px]  w-[35px] h-[35px] bg-[#e04652] text-white flex items-center justify-center rounded-[50%] " > <X /> </Link>
            <Image className="max-w-[230px] max-md:max-w-[150px] " src={IMG_success} alt="success" width={230} height={230} />
            <div className="p text-center "> {t("message_success")} </div>
            <button className="btn1 max-w-[200px] w-full " onClick={_=> setSuccess(!success)} > {t("button_success")} </button>
            </div>
    } */}
    </div>


    <Toaster />

</div>
)
}

export default Page