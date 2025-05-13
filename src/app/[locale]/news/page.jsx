import BreadCrumbs         from '@/atoms/BreadCrumbs'
import { useTranslations } from 'next-intl'
import NewsCard, { News_card_row } from '@/components/news/NewsCard'


const page = () => {
  const t = useTranslations("all-news")

  return (
    <div className='people all-news'>

      <BreadCrumbs main={t.raw('breadCrumbs')[0]} slash="/"  second={t.raw('breadCrumbs')[1]} />
      <div className="container">

        <div className="depart _h4"> {t.raw('depart')[0]} </div>
        <div className="boxes-news">
            <NewsCard />
          </div>

        <div className="depart depart2 _h4"> {t.raw('depart')[1]} </div>
        <div className="boxes-common-news">
          <News_card_row />
        </div>
        
      </div>

    </div>
  )
}

export default page