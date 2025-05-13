import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import Upper_part from './Upper_part'
import Right_part from './Right_part'
import Left_part from './Left_part'


const Car = ({parts , setParts , classname , err}) => {

	const t = useTranslations("people")

	const [Index , setIndex] = useState(1)
	const handleClick = (index)=>{
		setIndex(index)
	}


	const handleValue = (value , name  , id) => {
		if(parts[value]?.color === "#1f327a") setParts({...parts ,[value] :{color: "transparent", name:""} })
		else {
		  setParts({...parts , [value] :{color: "#1f327a", name:name , id }})
		}

	  }

  return (
	<div className={`pt-[40px] pb-[10px] car ${classname}`}>
			<div className="text-[18px] font-[700] opacity-[.8]  mb-[20px] "> {t.raw("car")[0]} </div>
			<ul className=' flex gap-[20px] items-center '>
				{
					Array.from({length:3}).map((e ,i)=>(
						<li key={i} onClick={()=>handleClick(i+1)} className={` 
							text-[16px] cursor-pointer relative transition-all duration-400
							${Index == i+1 ? "after:absolute after:w-[100%] after:left-0 after:bottom-[-15px] after:rounded-[8px] after:h-[8px] after:bg-[#3e64f4]  opacity-100 font-[700] " : " opacity-80 font-[400]"}
							`} > {t.raw("car")[i+1]} </li>
					))
				}
				
			</ul>

			<div className='flex items-start justify-center gap-[20px] max-md:flex-col h-[500px] max-md:h-fit  ' >
					<div className={` ${Object.values(parts).length >= 1 ?"w-[200px]" :"w-0"} max-md:w-full  flex flex-col max-md:order-[3] max-md:flex-row max-md:flex-wrap justify-center items-start gap-[5px] max-md:gap-[15px] h-[600px] max-md:h-fit`}>
						{Object.values(parts).map(item => <span className='text-nowrap text-[18px] max-md:text-[14px] max-sm:text-[14px] font-[600] text-[#3e64f4] '> {item.name}  </span> )}
					</div>
					<div className="carContainer overflow-hidden  relative flex items-center justify-center w-full  h-[600px] max-md:h-[300px] max-sm:h-[200px] ">
						<Right_part handleValue={handleValue} translate={t.raw("parts")} parts={parts} setParts={setParts} index={Index}  classname={` absolute inset-0 w-full h-full duration-1000  `} />
						<Left_part  handleValue={handleValue} translate={t.raw("parts")} parts={parts} setParts={setParts} classname={` ${Index !== 2 ? 'translate-x-[100vw] ' : "translate-x-0"} absolute inset-0 w-full h-full  duration-1000 `} />
						<Upper_part handleValue={handleValue} translate={t.raw("parts")} parts={parts} setParts={setParts} classname={` ${Index !== 3 ? 'translate-y-[-700px] ' : "translate-y-0"} absolute inset-0 w-full h-full  duration-1000 `} />
					</div>

			</div>
	</div>
  )
}

export default Car



