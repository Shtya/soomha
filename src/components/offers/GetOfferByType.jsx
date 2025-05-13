'use client' ;
import Skeleton_offers from '@/atoms/Skeleton/Skeleton_offers'
import useFetch from '@/utils/useFetch'
import React from 'react'
import NoData from '../NoData';
import { useTranslations } from 'next-intl';

const GetOfferByType = ({type}) => {
    const [load , data ] = useFetch(`/website/offers/${type}` , 'dd')
    const t = useTranslations("offers")

  return ( 
    load == false 
        ?data.length >= 1 ?
            data.map((e,i)=> (
                <div className="box" key={i} >
                <div className="p p-bold"> {e.price}</div>
                <div className="p"> {e.details} </div>
                </div>
            )) 
        : <NoData msg={t("no_data")}/>
    : <Skeleton_offers />
  )
}

export default GetOfferByType