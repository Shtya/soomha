"use client"
import BreadCrumbs         from '@/atoms/BreadCrumbs'

//! validation

import { useTranslations } from 'next-intl'
import useFetch from '@/utils/useFetch'
import { handleTime } from '@/utils/handleTime'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Skeleton_card_news from '@/atoms/Skeleton/CardNews'



const page = () => {
  const t = useTranslations("all-news")
  const {id} = useParams()
  const [load , data] = useFetch(`/website/news/show/${id}` ,"dd" )

  return (
    <div className='people one-news'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">
      
      {
        load == false 
          ?<>
            <Image src={data.image} alt={data?.title} width={1400} height={400} />
            <div className="_h3"> {data.title} </div>
            <div className="p date"> {handleTime(data.created_at)} </div>
            <div className="p desc"> {data?.content} </div>
          </>
          : <Skeleton_card_news />
        }
      </div>

    </div>
  )
}

export default page