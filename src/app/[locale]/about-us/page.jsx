'use client'
import BreadCrumbs from "@/atoms/BreadCrumbs";
import { SkeletonText } from "@/atoms/Skeleton/Skeleton_adds";
import useFetch from "@/utils/useFetch";
import { useTranslations } from "next-intl";
import React from "react";

export default function page() {

	const [load , data] = useFetch("/website/settings" , 'token')
	const t = useTranslations("settings")
	const lang = useTranslations()
	function formatText(text) {
		return text?.replace(/\r\n\r\n/g, '<br><br>');
	}

  return <div>
	<div className="container min-h-[70vh] py-[50px] px-[20px]  max-w-[1100px] mx-auto ">
	<BreadCrumbs  main={t.raw('aboutUs')[0]} slash="/"  second={t.raw('aboutUs')[1]} />

		<div className="mx-[30px] " >
		<div dangerouslySetInnerHTML={{ __html: formatText(lang("lang") == "en" ? data?.aboutus_en: data?.aboutus_ar) }} ></div>
			{load == true &&  <SkeletonText /> }
		</div>
	</div>
  </div>;
}
