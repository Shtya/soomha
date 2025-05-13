import * as yup from 'yup'


export const companiesSchema = yup.object({
  name    : yup.string().required("companies.schema.name") ,
  phone   : yup.string().required('companies.schema.phone') ,
  country : yup.string().required("companies.schema.country") ,
  city    : yup.string().required("companies.schema.city") ,
  address : yup.string().required("companies.schema.address") ,
  Zcode   : yup.number().typeError("companies.schema.Zcode") ,
  Bcode   : yup.string().required("companies.schema.Bcode") ,
  person  : yup.string().required("companies.schema.person") ,
  position: yup.string().required("companies.schema.position") ,
  active : yup.string().required("companies.schema.active") ,
})
