import React from 'react'

const Checkbox = ({id , title , setDescription }) => {
  const handleBox = (e)=>{
    setDescription(prev => [...prev , e.target.value])
  }
  
  return (
    <div className='check-box'>
      <input onChange={handleBox}  type="checkbox" value={id} id={id} />
      <label htmlFor={id} > {title} </label>
    </div>
  )
}

export default Checkbox
