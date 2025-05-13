'use client'
import Image from "next/image";
import React from "react";
import wheel from "@/assets/services/wheel.png";
import useFetch from "@/utils/useFetch";
import Spiner from "@/atoms/Skeleton/Spiner";

const C_numbers = () => {
    const [load , data] = useFetch('/website/states' , 'dd')

    return load == false ?
        data.length >= 1 ?
            data.map((e, i) => (
                <li key={i} className="box">
                    
                    <div className="wheel">
                        <Image src={wheel} width={200} height={200} alt="wheel" />
                        <span> {e.content}</span>
                    </div>
                    <div className="txt-icon"> {e.title} </div>
                </li>
            )) 
        : <></>
    :<Spiner />
};

export default C_numbers;
