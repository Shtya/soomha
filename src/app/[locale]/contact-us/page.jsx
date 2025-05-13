"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import Input         from '@/atoms/Input'
import Spin          from '@/atoms/Spin'

//! validation
import { ContactSchema } from '@/validation/ContactSchema'
import { Toaster } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import Text from '@/atoms/Textarea'
import Image from 'next/image'
import contact_us from '@/assets/contact-us.png'
import { usePostAuth } from '@/utils/usePost'
import ButtonLoad from '@/atoms/ButtonLoad'



const page = () => {
  const t = useTranslations("contact-us")

  //! Submit handler  
  const DATA = (data)=>({name : data.name ,email : data.email ,message : data.message ,topic : data.topic })
  const [ register , Submit , errors , isLoading] = usePostAuth(ContactSchema , '/website/contact/store' , 'contact-us' , DATA )


  return (
    <div className='people contact-us'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className={`container `}>

        <div className="head">
          <div className="_h1 yellow"> {t("h1")} </div>
          <div className="_h4"> {t("h2")} </div>
        </div>

        <div className='boxes-form'>
            <form onSubmit={Submit} className="inputs" >
            
                <Input  err_star="no"  reg={register('name')}    err={errors.name}     id="name"     label={t.raw("box")[0].label}  place={t.raw("box")[0].place} type="text"    />
                <Input  err_star="no"   reg={register('email')}   err={errors.email}    id="email"    label={t.raw("box")[1].label}  place={t.raw("box")[1].place} type="email"   />
                <Input  err_star="no"   reg={register('topic')} err={errors.topic}  id="topic"  label={t.raw("box")[2].label}  place={t.raw("box")[2].place} type="text"   />
                <Text   err_star="no"   reg={register('message')}  err={errors.message}   id="message"   label={t.raw("box")[3].label}  place={t.raw("box")[3].place}   />
                <ButtonLoad isLoading={isLoading} value1={t.raw('button')[0]} value2={t.raw('button')[1]} />

            </form>

            <Image src={contact_us} alt='call center' width={600} height={660} />
        </div>

      </div>
      <Toaster />
    </div>
  )
}

export default page