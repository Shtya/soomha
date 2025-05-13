'use client'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Image from "next/image";
import { time } from "@/config/variants";

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
  // responsive: [
  //   {
  //     breakpoint: 1300,
  //     settings: {
  //       slidesToShow: 5,
  //       slidesToScroll: 1,
  //       infinite: true,
  //       dots: false
  //     }
  //   }
  // ]
};

const Slider1 = ({images}) => {

  return (
    <Slider {...settings} className='slider1' >
        {images.map((e,i)=>(
            <Image  src={e} key={i} alt={"slider images "+i} />
          ))}
      </Slider>
  )
}

export default Slider1