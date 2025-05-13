
import Adds from '@/components/Home/Adds'
import Section2 from '@/components/Home/Section2'
import CommonQuestion from '@/components/Home/CommonQuestion'
import Hero from '@/components/Home/Hero'
import News from '@/components/Home/News'
import Slider3 from '@/components/Home/Slider3'
import Newsletter from '@/components/Home/Newsletter'



const page = () => {


  return (
    <main className='home'>
      <Hero  />
      <Slider3 type="1" />

      <Section2 />
      <Slider3 type='2' classN="shape2" />

      <Newsletter />

      <News />

      <CommonQuestion />

      <Adds />
    </main>
  )
}

export default page