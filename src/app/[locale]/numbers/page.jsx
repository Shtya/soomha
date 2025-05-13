import BreadCrumbs from '@/atoms/BreadCrumbs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Circle from "@/assets/shape/circle.png"
import points from "@/assets/shape/points.png"
import random from "@/assets/shape/random.png"
import Car from "@/assets/bg/car.png"
import C_numbers from '@/components/numbers/C_numbers'
import Slider3 from '@/components/Home/Slider3'
import GetBySection from '@/components/GetBySection'

export const metadata = { title:'Soomha in Numbers | Our Achievements' , description:"Explore the impressive statistics and achievements of Soomha. See how we’ve made a difference in the car evaluation industry."};


const page = () => {
  const t = useTranslations("numbers")

  

  return (
    <section className='services numbers'>
      <div className="top">
      <BreadCrumbs main={t.raw("breadCrumbs")[0]} second={t.raw("breadCrumbs")[1]} slash='/' />
      <Image className='car' src={Car} width={1400} height={700} alt='car' />

      <div className="container">

        <Image className='circle' src={Circle} width={200} height={200} alt='shape' />
        <Image className='points' src={points} width={200} height={200} alt='shape' />
        <Image className='random' src={random} width={200} height={200} alt='shape' />

        <GetBySection type='4' />

          <div className="boxes-wheel">
            <C_numbers  />
            </div>
      </div>
      </div>
      
        <Slider3 type="5" />
    </section>
  )
}

export default page