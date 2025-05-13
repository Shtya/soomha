'use client' ;
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import useFetch from "@/utils/useFetch";
import { useTranslations } from 'next-intl'
import { useRouter } from "next/navigation";


const CommonQuestion = () => {
  const t = useTranslations('home')

  const [load , questions] = useFetch('/website/question' , "dd")
  const navigate = useRouter()

  return (
    <div className='common'>
      
      <div className="container">
        <h2 className="h1-head" style={{cursor:"pointer"}} onClick={_ => navigate.push("/Faqs")} > {t.raw('common')}</h2>
        <Accordion type="single" collapsible className="w-full">
          {
            questions.length >=1 && questions.map((e , i) => (
                <AccordionItem className="group-acc" key={i} value={`item${i}`}>
                  <AccordionTrigger>  {e.title} </AccordionTrigger>
                  <AccordionContent className="h2"> {e.answer} </AccordionContent>
                </AccordionItem>
            ))
          }
          </Accordion>
      </div>
    </div>
  )
}

export default CommonQuestion