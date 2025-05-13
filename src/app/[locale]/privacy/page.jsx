'use client'
import BreadCrumbs from "@/atoms/BreadCrumbs";
import { Skeleton, SkeletonText } from "@/atoms/Skeleton/Skeleton_adds";
import useFetch from "@/utils/useFetch";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

export default function page() {

	const [load , data] = useFetch("/website/settings" , 'token')
	const lang = useTranslations()
	const t = useTranslations("settings")

	function formatText(text) {
		return text?.replace(/\r\n\r\n/g, '<br><br>');
	}

  return <div>
	<div className="container min-h-[70vh] py-[50px] px-[20px]  max-w-[1100px] mx-auto ">
		<BreadCrumbs  main={t.raw('privacy')[0]} slash="/"  second={t.raw('privacy')[1]} />

		<div className="mx-[30px] " >
			<div className="output" dangerouslySetInnerHTML={{__html : formatText( lang("lang") == "en" ? data?.privacy_en: data?.privacy_ar )}}  />
			{load == true &&  <SkeletonText /> }
		</div>
	</div>
  </div>;
}
