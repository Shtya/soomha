'use client'
import BreadCrumbs from '@/atoms/BreadCrumbs'
import Image from 'next/image'
import X from "@/assets/shape/x.png"
import later from '@/assets/later.png'
import Slider3 from '@/components/Home/Slider3'
import { useTranslations } from 'next-intl'
import GetBySection from '@/components/GetBySection'
import IsLogin from '@/utils/IsLogin'
import Alert from '@/atoms/Alert'


// export const metadata = { title:"Our Services - Comprehensive Car Evaluation and More" , description:"Discover our wide range of services, including expert car evaluations, tailored for individuals, banks, and companies. Get accurate valuations and make informed decisions."};



export default function Page () {
  const t = useTranslations("services")
  const [handleRoute , show , setShow ]  = IsLogin()

  return (
    <section className='services'>
      {!show ? <Alert setShow={setShow} show={show} /> : "" }

      <div className="top">
        <BreadCrumbs main={t.raw("breadCrumbs")[0]} second={t.raw("breadCrumbs")[1]} slash='/' />
        
        <div className="container">
          <Image className='x' src={X} width={200} height={200} alt='shape' />
          <GetBySection type='3' />

          <div className="boxes">
            {
              t.raw("box").map((e,i) => <button  onClick={_=> handleRoute(e.path)} key={i} className='group box-icon grad shadow-sm '  > 
                  {e.icon}
                  <span > {e.title} </span>
                  {i == 3 && <Image className='group-hover:w-[100px] object-contain group-hover:h-[80px] h-0 w-0' src={`/assets/${t("soon")}.png`} alt='soon' width={100} height={100} /> }
                </button> )
            }
          </div>
          
        </div>

        
      </div>
      
        <Slider3 type='4' />
    </section>
  )
}

