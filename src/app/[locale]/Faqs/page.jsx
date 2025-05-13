'use client';
import BreadCrumbs from "@/atoms/BreadCrumbs";
import NotFound from "@/atoms/NotFound";
import { Rows, Skeleton } from "@/atoms/Skeleton/Skeleton_adds";
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion";
import useFetch from "@/utils/useFetch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const CommonQuestion = () => {
  const t = useTranslations();
  
  const [load, questions] = useFetch('/website/question', "dd");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate total pages and slice questions for the current page
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const currentQuestions = questions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='common page-common'>
		<BreadCrumbs main={t.raw("breadCrumbs")[0]} slash="/"  second={t.raw("breadCrumbs")[1]} />
      <div className="container">

        <Accordion type="single" collapsible className="w-full">
          {
            load == false ? 
              currentQuestions.length >= 1 && currentQuestions.map((e, i) => (
              <AccordionItem className="group-acc" key={i} value={`item${i}`}>
                <AccordionTrigger>{e.title}</AccordionTrigger>
                <AccordionContent className="h2">{e.answer}</AccordionContent>
              </AccordionItem>
            ))
            : <Rows number={3} />
          }
        </Accordion>

		<div className="pagination">
			<button className="arrow" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} > <ChevronLeft /></button>
			{
				Array.from({length : totalPages}).map((e,i)=> <div key={i} onClick={() => handlePageChange(i+1 ) } className={`page ${currentPage == i+1 ? "active" :""}`}> {i+1}</div> )
			}
			<button className="arrow" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}> <ChevronRight /> </button>
		</div>

      </div>
    </div>
  );
}

export default CommonQuestion;
