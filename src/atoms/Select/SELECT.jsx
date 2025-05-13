"use client"

import * as React from "react"
import {  Select,  SelectContent,  SelectGroup,  SelectItem,  SelectLabel,  SelectTrigger,  SelectValue,} from "@/components/ui/select"

export function SELECT({reg , err , id , label , lists , place , onClick }) {
  return (
	<div className="select">
      <label htmlFor={id}> {label} <span>*</span> </label>
		<Select>
		<SelectTrigger name="country" onChange={onClick} id={id} {...reg} className="w-[180px]">
			<SelectValue placeholder={place} />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>Fruits</SelectLabel>
				{
					lists?.map((e,i)=> ( <SelectItem key={i} value={e?.id || e} > {e?.title || e} </SelectItem> ))
				}
			</SelectGroup>
		</SelectContent>
		</Select>
		{}
      {/* <Select name="country" {...reg} onChange={onClick}  placeholder={place}  id={id} >
        {
          lists?.map((e,i)=> ( <option key={i}  value={e?.id || e}> {e?.title || e} </option> ))
        }
      </Select> */}
      <span className='err' > {err?.message && t(err?.message)} </span>
    </div>
	
    
  )
}
