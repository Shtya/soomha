import * as XLSX from 'xlsx';

export const SheetExcel = () => {
	
	const Create_  = ()=>{
	   const wb = XLSX.utils.book_new();

   const data = [
	   ["Header1", "Header2"],
	   [1, 2],
	   [3, 4]
   ];
   // Create_ a worksheet
   const ws = XLSX.utils.aoa_to_sheet(data);
   // Append worksheet to workbook
   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
   // Write workbook and trigger download
   XLSX.writeFile(wb, "sheet.xlsx");
   }

	return (
		<button onClick={Create_}>Download Excel</button>

	)
};
