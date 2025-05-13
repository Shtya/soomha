'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Image from "next/image";
import { time } from "@/config/variants";
import useFetch from "@/utils/useFetch";
import Skeleton_adds, { Skeleton } from "@/atoms/Skeleton/Skeleton_adds";
import {Link} from '@/navigation';

var settings = {
  dots: true ,
  infinite: true,
  speed: 1000 ,
  autoplaySpeed: time ,
  slidesToShow: 1,
  slidesToScroll: 1 , 
  autoplay:true ,  
  pauseOnHover: false,
  pauseOnFocus: false,
  focusOnSelect: false,
  rows:1 ,
};

const Slider3 = ({type , classN}) => {
  let [load , data] =useFetch(`/website/ads/${type}` , "dd")

  return (
    <div className={`slider-container container ${classN}`}>
      {
        load == false 
          ? data.length >= 2 ? 
            <Slider {...settings} className='slider3' >
                {data.map((e,i)=>(
                    <Link target="_blank" key={i} href={ e.link || "" } > <Image src={e.image} width={1400} height={300} key={i} alt={"slider images "+i} /> </Link>
                  ))}
            </Slider>
          : data.length >= 1 ? <Link target="_blank" href={ data[0].link || "" } > <Image className="only" src={data[0].image} width={1400} height={300}  alt={"slider images 0"} />  </Link>  :  <h1 className=" font-[700] text-[24px] opacity-60 text-center " > there are no exists adds </h1> 
        : <Skeleton />
      }
    </div>
        
  )
}

export default Slider3