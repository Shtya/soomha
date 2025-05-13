import { useTranslations } from "next-intl"

const { default: axios } = require("axios")
const { useEffect, useState } = require("react")

export const axiosFetch = (url , level)=>{
	const [data , setData ] = useState()
	const lang = useTranslations()

	useEffect(_=> {
		if(url == "website/brands") {
			 axios.get("https://api.soomha.net/api/"+url  ,{ headers: {"Accept-Language": lang('lang')}} ).then(res => setData(res.data.data))
		}
		else if (level === 2)
		axios.get("https://api.soomha.net/api/"+url , { headers: {"Accept-Language": lang('lang') }} ).then(res => setData(res.data.data))
		else
		axios.get("https://api.soomha.net/api/"+url , { headers: {"Accept-Language": lang('lang') }} ).then(res => setData(res.data))
	} ,[])

	return data
}