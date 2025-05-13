"use client"

const ChooseFile = ({id , title , handleFile  }) => {


  return (
    
    <label htmlFor={id} className='choose-file'>
      <button> {title} </button>
      <input  onChange={handleFile}  type="file"  id={id} />
    </label>
  )
}

export default ChooseFile