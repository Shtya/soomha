"use client"


import { X } from "lucide-react"
import {Link} from '@/navigation';
import { useTranslations } from "next-intl"


//! validation
import { enter_email_schema } from '@/validation/enter_email_schema'
import { Toaster } from 'react-hot-toast'
import Spin from "@/atoms/Spin"
import Input from "@/atoms/Input"
import { usePostAuth } from "@/utils/usePost"


const EnterEmail = ({show , setShow}) => {
    const t = useTranslations("enter-email")

    //! Submit handler
    const DATA = (data)=>( { email : data.email })
    const [ register , Submit , errors , isLoading] = usePostAuth(enter_email_schema , '/user/auth/send-ResetCode' , 'enter-email' , DATA)


    return (
    <div className="enter-email">
        <div className="container">
        <form onSubmit={Submit} action="" className="!mb-[-40px]" >
            <div className="head">
                <h2 > {t('depart')} <Link  href={""} className="x" onClick={_=> setShow(!show)} > <X /> </Link></h2>
            </div>

            <div className="p"> {t('p')} </div>
            <Input reg={register('email')}  err={errors.email} err_star="no" id="email" label={t.raw('field')[0]} place={t.raw('field')[1]}  type="email"  />

            {
                isLoading 
                ? <button disabled={true} className="btn1 btn-spin  grad"> {t.raw('field')[3]} <Spin /> </button>
                : <button className="btn1 grad"> {t.raw('field')[2]}</button>
            }
            
        </form>
    </div>


    <Toaster />

</div>
)
}

export default EnterEmail