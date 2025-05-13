'use client'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { time } from "@/config/variants";

var settings = {
  dots: false ,
  infinite: true,
  speed: 1000 ,
  autoplaySpeed: time + (time -1 )  ,
  slidesToShow: 1,
  slidesToScroll: 1 , 
  autoplay:true ,
    pauseOnHover: false,
  pauseOnFocus: false,
  focusOnSelect: false,
  rows:1 ,

};


const Slider2 = ({data}) => {

  return (
    <Slider {...settings} className='slider2' >
        {data.map((e,i)=>(
            <div className={"text text" + i} key={i} >
              <h2> {e.h1} </h2>
              <h3> {e.h2} </h3>
            </div>
          ))}
      </Slider>
  )
}

export default Slider2