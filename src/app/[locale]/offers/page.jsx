
'use client'
import BreadCrumbs         from '@/atoms/BreadCrumbs'
import Skeleton_offers, { Skeleton_offersOne } from '@/atoms/Skeleton/Skeleton_offers'
import OneOffer from '@/components/offers/OneOffer'
import { AXIOS } from '@/config/axios'
import { banksUrls, offerUrls } from '@/constant/constant'
import { GetUser } from '@/utils/GetUser'
import { notification } from '@/utils/notification'
import useFetch from '@/utils/useFetch'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const page = () => {
  const t = useTranslations("offers")
  const lang = useTranslations()

  const user = GetUser()
  const [load , data] = useFetch("/sub/getAll/" ,  user?.token  )


  
  const [myPackage , setMyPackage ] = useState()
  const GetSub = ()=>{
    AXIOS.get(`/user/subscribe/mypackage/${user?.user?.id}`  ,{headers:{ "Accept-Language": lang('lang') , Authorization:`Bearer ${user?.token}`}} )
    .then(res => setMyPackage(res.data?.data[0]))
  }

  useEffect(_=> { user && GetSub()  } ,[user])
  


  const navigate = useRouter()
  const handleSub = async(e)=>{

    await AXIOS.post("/user/subscribe/submit" , {sub_id : e?.id , user_id : user?.user?.id } ,{headers:{ "Accept-Language": lang('lang') , Authorization:`Bearer ${user?.token}`}} )
    .then(res => {
      if(res?.status == 200) {
        // notification(t("subscribe")  , "success")
        AXIOS.post("/telr/payment" , {
        success_url: offerUrls.success_url,
        declined_url: offerUrls.declined_url ,
        cancel_url: offerUrls.cancel_url ,
			  subscription_id : e?.id 
			} , {headers: { 'Authorization': 'Bearer '+user?.token,  "Accept-Language": lang('lang') }}
      ).then(payment =>{ 
        navigate.push(payment?.data?.order?.url)  			
      })
    }})
    
    .catch(err => {
      notification(err?.response?.data?.message , "error" )})
  }



  return (
    <div className='people offers'>
      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">

        <div className="h3"> {t("h1")} </div>
            {
              load == false ? 
                myPackage?.subscribtion ?
                <div className="grid">
                  <div className="box diff">
                    <div className="h4">{lang("lang") == "ar" ? myPackage?.subscribtion?.title_ar : myPackage?.subscribtion?.title_en} </div>
                    <div className="h5"> { `${myPackage?.subscribtion?.price} ${t.raw("between")[2]} ` } </div>
                    <div className="p"> { `${t.raw("between")[0]} ${myPackage?.subscribtion?.orders}  ${t.raw("between")[1]} ` } </div>
                    <p></p>
                    <button className="btn"> {myPackage?.rest_of_use} {t.raw("one")[3]} </button>
                  </div>
                </div>
                : <h1 className='notfound' > {t("youAreNotSubscribed")} </h1>
                :<Skeleton_offersOne />
            }

        <div className="h3"> {t("h2")} </div>
        <div className="boxes">
          {
            load == false?
              data.length >=1 ?
                data.map((e,i)=>(
                  <OneOffer onClick={handleSub} key={i} data={e} t={t} />
                ))
              : <h1 className='notfound' > {t("login")} </h1>
            : <Skeleton_offers  />
          }
        </div>

      </div>

    </div>
  )
}

export default page