'use client'
import Image from 'next/image'

import IMG_x from '@/assets/shape/x.png'
import {Link} from '@/navigation';

import { useTranslations } from 'next-intl'
import useFetch from '@/utils/useFetch'
import Skeleton_brands from '@/atoms/Skeleton/Skeleton_brands'
import { handleTime } from '@/utils/handleTime'
import { sliceText } from '@/utils/sliceText'

const News = () => {
  const t = useTranslations('home')
  const [load , data] = useFetch('/website/news' , 'dd')

  return (
    <section className='news'>
      <Image className='shape' src={IMG_x} alt='shape' />
      <div className="container">
        <h2 className="h1-head">   {t.raw('news')[0]}  </h2>
        <p className="p-head"> {t.raw('news')[1]}</p>

        <div className="boxes">
          {
            load == false ?
              data.length >=1 ?
                data.slice(0 , 6).map((e,i) => (
                  <div key={i} className="box">
                    <Image src={e.image} width={300} height={300} alt={e.title} />
                    <h3 className="h3"> {sliceText(30 , e?.title )} </h3>
                    <span> {handleTime(e.created_at)} </span>
                    <p className="p"> {sliceText(150 , e?.content )} </p>

                    <Link href={`/news/${e.id}`} className="btn1">  {t.raw('news')[2]} </Link>
                  </div>
                )) 
              : <h2> there is no news yet </h2>
            : <Skeleton_brands />
          }
        </div>

        <div className="more"> <Link href='/news'> {t.raw('news')[3]}  </Link> </div>
      </div>
    </section>
  )
}

export default News