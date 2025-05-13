"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import {  useEffect, useState } from 'react'

//! validation

import { AXIOS } from '@/config/axios'
import { useTranslations } from 'next-intl'
import NotFound from '@/atoms/NotFound'



const Responed = ({order}) => {
  const t = useTranslations("my-orders")
  const t_people = useTranslations("people")
  
  return (
    <div className='people my-orders'>
      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">
       <>
            <div className="box"> <div className="title"> {t.raw("names")[0]} </div> <div className="val"> {` ${order?.brand?.title_en} - ${order?.car_model?.name_en}`} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[1]} </div> <div className="val"> {order?.made_year} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[2]} </div> <div className="val"> {t_people.raw('boxes2')[3].choose[order?.car_case]?.title} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[3]} </div> <div className="val"> {order?.current_price} {t("currency")} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[4]} </div> <div className="val"> {order?.kilos} {t("kilos")} </div> </div>
            <div className="box"> <div className="title"> {t.raw("names")[5]} </div> <div className="val"> {order?.damage_pieces >=1 ? t.raw("scratches")[0] : t.raw("scratches")[1] } </div> </div>
            <div className="bg-[#fafafa] p-[20px] box"> <div className="txt-icon"> {t("button")} </div> <span className="txt-icon"> {Number(order?.final_price).toFixed(0)} {t("currency")}</span> </div>
          </>
        
        </div>

    </div>
  )
}

export default Responed