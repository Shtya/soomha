import React from 'react'

const OneOffer = ({data , t , onClick}) => {
  return (
	<div className="box">
          <div className="h4 !text-[18px] "> { data?.title } </div>
          <div className="h5 !text-[16px] mt-[-4px] "> { `${data?.price} ${t.raw("between")[2]} ` } </div>
          <div className="p !text-[14px]"> { `${t.raw("between")[0]} ${data?.orders}  ${t.raw("between")[1]} ` } </div>
		      <button onClick={_=>onClick(data)} className="btn1"> { t("button") } </button>
  </div>
  )
}

export default OneOffer