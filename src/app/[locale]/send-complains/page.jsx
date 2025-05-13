"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import Text from '@/atoms/Textarea'
import Input from '@/atoms/Input'

import { Toaster } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { complainSchema } from '@/validation/complainSchema'
import Spin from '@/atoms/Spin'
import { GetUser } from '@/utils/GetUser'
import { usePostAuth } from '@/utils/usePost'


const page = () => {
  const t = useTranslations("send-complains")

  const user = GetUser()
  const DATA = (data) => ( { user_id: user?.user.id , name:data.name , email:data.email , message:data.message})
  const [ register , Submit , errors , isLoading] = usePostAuth(complainSchema , '/user/complains/store' , 'send-complains' , DATA , user?.token)


  return (
    <div className='people send-complains'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0] } slash="/"  second={t.raw('breadCrumbs')[2]} third={t.raw('breadCrumbs')[1]} />
      <div className="container mt-[50px] ">
          <Input   err_star="no"  reg={register('name')}    err={errors.name}     id="name"     label={t.raw("box")[0].label}  place={t.raw("box")[0].place} type="name"  />
          <Input   err_star="no"  reg={register('email')}    err={errors.email}     id="email"     label={t.raw("box")[1].label}  place={t.raw("box")[0].place} type="email"  />
          <Text reg={register('message')} err={errors.message} err_star="no" place={t.raw("box")[2].place}   />
          {
            isLoading   
              ? <button className="btn1 w-full disabled" disabled={true} >  {t.raw('button')[1]}  <Spin />  </button>
              : <button className='btn1 w-full' onClick={_=>Submit()}  > {t.raw('button')[0]} </button>
          }
      </div>

      <Toaster />
    </div>
  )
}

export default page