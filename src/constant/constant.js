const baseUrl = "https://soomha.net/"
// const baseUrl = "http://localhost:3000/"

export const banksUrls = {
	success_url:`${baseUrl}success`,
	declined_url:`${baseUrl}evaluate/banks?message=true`,
	cancel_url:`${baseUrl}evaluate/banks?message=true`,
}

export const companyUrls = {
	success_url:`${baseUrl}success`,
	declined_url:`${baseUrl}evaluate/companies?message=true`,
	cancel_url:`${baseUrl}evaluate/companies?message=true`,
}

export const offerUrls = {
	success_url:`${baseUrl}success`,
	declined_url:`${baseUrl}offers?message=true`,
	cancel_url:`${baseUrl}offers?message=true`,
}

export const peopleUrls = {
	success_url:`${baseUrl}success`,
	declined_url:`${baseUrl}evaluate/people?message=true`,
	cancel_url:`${baseUrl}evaluate/people?message=true`,
}