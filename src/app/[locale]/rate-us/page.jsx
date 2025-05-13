"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {Link} from '@/navigation';

import Text from '@/atoms/Textarea'
import { Toaster } from 'react-hot-toast'
import { rateSchema } from '@/validation/rateSchema'

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { GetUser } from '@/utils/GetUser'
import Spin from '@/atoms/Spin'
import { usePostAuth } from '@/utils/usePost'

const page = () => {
  const t = useTranslations("rate-us")
  const [rate , setrate] = useState(0)
  
  //! Submit handler
  const user = GetUser();
  
  const DATA = (data)=>({ user_id : user?.user?.id ,  count : rate ,  message : data.rate_us  })
  const [ register , Submit , errors , isLoading] = usePostAuth(rateSchema , '/user/rates/create' , 'rate-us' , DATA , user?.token )

  const handleSubmit = ()=>{
    if(rate == 0 ) return ;
    Submit()
  }

  return (
    <div className='people rate-us'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">
          <div className="starts"> <Rating style={{ maxWidth: 100 }} value={rate} onChange={e=>setrate(e)}  itemShapes={<svg width="65" height="61" viewBox="0 0 65 61" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.6761 60.7373C13.108 61.5416 11.3286 60.132 11.6455 58.3323L15.0173 39.1166L0.705155 25.4829C-0.631408 24.2073 0.0632796 21.8754 1.85484 21.6235L21.753 18.796L30.6255 1.21758C31.4258 -0.366797 33.5911 -0.366797 34.3914 1.21758L43.2639 18.796L63.162 21.6235C64.9536 21.8754 65.6483 24.2073 64.3077 25.4829L49.9995 39.1166L53.3714 58.3323C53.6883 60.132 51.9089 61.5416 50.3408 60.7373L32.5023 51.5723L14.6761 60.7373Z" fill="#EFC762"/> </svg> } />  </div>
          <Text reg={register('rate_us')} err={errors.rate_us} err_star="no" place={t("textarea")}   />
          {
            isLoading   
              ? <button className="btn1 w-full disabled" disabled={true} >  {t.raw('button')[1]}  <Spin />  </button>
              : <button className='btn1 w-full' onClick={handleSubmit}  > {t.raw('button')[0]} </button>
          }
          {/* <Link className='btn1' href='/rates' > {t.raw("button")[2]} </Link> */}
      </div>

      <Toaster />
    </div>
  )
}

export default page