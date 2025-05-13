import React from 'react'
import Spin from './Spin'

const ButtonLoad = ({isLoading , cn , value1 , value2 , onClick }) => {
  return (
    isLoading 
        ? <button disabled={true} className={`btn1 btn-spin grad ${cn} `}>  {value2} <Spin /> </button>
        : <button onClick={onClick} className={`btn1 grad ${cn} `} > {value1} </button>
  )
}

export default ButtonLoad