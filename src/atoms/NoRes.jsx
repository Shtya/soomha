"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import {  useEffect, useState } from 'react'

//! validation
import { useTranslations } from 'next-intl'
import ModalComponent from '@/atoms/ModalComponent'
import {Link} from '@/navigation';




const NoResponsd = ({order}) => {
  const t = useTranslations("my-orders")
  const [open , setOpen] = useState(false)

  return (
    <div className='people my-orders'>
      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container"> 
          
            <div className="warp-cancel"> <div onClick={_=> setOpen(!open)} className="cancel"> {t.raw('error')[2]} </div> </div>
            <ModalComponent id={order?.id} open={open} setOpen={setOpen} btn={t.raw("error")[2]} /> 

            <div className="box"> <div className="title"> {t.raw("names")[0]} </div> <div className="val"> {order?.car_model?.name_en} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[1]} </div> <div className="val"> {order?.made_year} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[2]} </div> <div className="val"> {order?.car_case} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[3]} </div> <div className="val"> {order?.current_price} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[4]} </div> <div className="val"> {order?.kilos} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[5]} </div> <div className="val"> {order?.spray} </div> </div>
            {/* <Link className='btn1' href='/evaluate/banks' > {t("order")} </Link> */}
        
        </div>

    </div>
  )
}

export default NoResponsd