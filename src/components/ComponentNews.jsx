'use client'
import Skeleton_card_news from '@/atoms/Skeleton/CardNews'
import { handleTime } from '@/utils/handleTime'
import useFetch from '@/utils/useFetch'
import Image from 'next/image'
import React from 'react'

const Component = ({params}) => {
    const [load , data] = useFetch(`/website/news/show/${params.id}` ,"dd" )

  return ( 
        load == false 
          ?<>
            <Image src={data.image} alt={data?.title} width={1400} height={400} />
            <div className="_h3"> {data.title} </div>
            <div className="p date"> {handleTime(data.created_at)} </div>
            <div className="p desc"> {data?.content} </div>
          </>
          : <Skeleton_card_news />
  )
}

export default Component