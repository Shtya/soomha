import React from 'react'

const Statics = ({num , width}) => {
  return (
    <div className="box" > <span> {num}  </span>
        <div className="back"> <span style={{width: `${width}%` }} className='front'></span> </div>
    </div>
  )
}

export default Statics