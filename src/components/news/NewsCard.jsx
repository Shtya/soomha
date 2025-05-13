"use client"

import useFetch from "@/utils/useFetch";
import { useTranslations } from "next-intl";
import { sliceText } from '@/utils/sliceText'
import {Link} from '@/navigation';
import Image from "next/image";
import { handleTime } from "@/utils/handleTime";
import Skeleton_card_column from "@/atoms/Skeleton/CardColumn";
import Skeleton_card_raw from "@/atoms/Skeleton/CardRow";

const NewsCard = () => {
    const t = useTranslations("all-news") ;
    const [load , data] = useFetch('/website/news' , 'dd')

  return (
    load == false ?
        data?.map((e,i) => (
        <div key={i} className="box   ">
            <Image src={e.image} alt={e.title} width={300} height={200} />
            <h3 className="h3">  {e.title} </h3>
            <span> {handleTime(e.created_at)} </span>
            <p className="p"> {sliceText(100 , e.content)} </p>

            <Link href={`/news/${e.id}`} className="btn1"> {t("button")} </Link>
        </div>
        ))

        : <Skeleton_card_column />
  )
}

export const News_card_row = () => {
    const t = useTranslations("all-news") ;
    const [load , data] = useFetch('/website/news' , 'dd')

  return (
    load == false ?
        data?.slice(0,5)?.map((e,i) => (
            <div key={i} className="box">
                <Image src={e.image} alt={e.title} width={350} height={200} />
                <div className="text">
                <h3 className="h3"> {e.title} </h3>
                <p className="p"> {sliceText(300 , e.content)} <Link href={`news/${e.id}`} >  {t("button")}</Link> </p>
                <span className='p'> {handleTime(e.created_at)} </span>
                </div>
            </div>
        ))

        : <Skeleton_card_raw />
  )
}

export default NewsCard