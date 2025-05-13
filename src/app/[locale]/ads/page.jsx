"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import Input         from '@/atoms/Input'
import Selection     from '@/atoms/Select'
import Spin          from '@/atoms/Spin'

//! validation
import { addsSchema } from '@/validation/addsSchema'
import { Toaster } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { GetUser } from '@/utils/GetUser'
import { usePostAuth } from '@/utils/usePost'


const page = () => {
  const t = useTranslations("adds")

  //! Submit handler
  const user = GetUser();
  
  const DATA = (data)=>({ user_id : user?.user?.id ,  company : data.name ,  manager : data.person ,  type : data.type ,  email : data.email ,  phone : data.phone ,   city : data.city  })
  const [ register , Submit , errors , isLoading] = usePostAuth(addsSchema , '/user/advertise/store' , 'adds' , DATA , user?.token)

  return (
    <div className='people adds'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />

      <div className={`container `}>
        <div className={`info-bank`}>
            <div className="h2-head"> {t('h1')} </div>
            <form className="inputs" >
            
                  <Input     reg={register('name')}   err={errors.name}    id="name"    label={t.raw("box")[0].label}  place={t.raw("box")[0].place} type="text"    />
                  <Input     reg={register('person')} err={errors.person}  id="person"  label={t.raw("box")[1].label}  place={t.raw("box")[1].place} type="text"   />
                  <Input     reg={register('type')}   err={errors.type}    id="type"    label={t.raw("box")[2].label}  place={t.raw("box")[2].place} type="text"  />
                  <Input     reg={register('email')}  err={errors.email}   id="email"   label={t.raw("box")[3].label}  place={t.raw("box")[3].place} type="email"   />
                  <Input     reg={register('phone')}  err={errors.phone}   id="phone"   label={t.raw("box")[4].label}  place={t.raw("box")[4].place} type="phone"   />
                  <Input     reg={register('city')}   err={errors.city}   id="city"     label={t.raw("box")[6].label}  place={t.raw("box")[6].place} type="city"   />
                  {/* <Selection reg={register('city')}   err={errors.city}    id="city"    label={t.raw("box")[5].label}  place={t.raw("box")[5].place} lists={t.raw('box')[5].select}   /> */}
                  {/* <SELECT reg={register('city')}   err={errors.city}    id="city"    label={t.raw("box")[5].label}  place={t.raw("box")[5].place} lists={t.raw('box')[5].select}   /> */}
                  
            </form>
        </div>

          {
            isLoading   
              ? <button className="btn1 disabled" disabled={true} >  {t.raw('button')[1]}  <Spin />  </button>
              : <button className='btn1' onClick={_=>Submit()}  > {t.raw('button')[0]} </button>
          }
      </div>
      <Toaster />
    </div>
  )
}

export default page