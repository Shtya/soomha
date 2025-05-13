import * as yup from 'yup'


export const banksSchema = yup.object({
  name    : yup.string().required("banks.schema.name") ,
  phone   : yup.string().required('banks.schema.phone') ,
  country : yup.string().required("banks.schema.country") ,
  city    : yup.string().required("banks.schema.city") ,
  address : yup.string().required("banks.schema.address") ,
  Zcode   : yup.number().typeError("banks.schema.Zcode") ,
  Bcode   : yup.number().typeError("banks.schema.Bcode") ,
  person  : yup.string().required("banks.schema.person") ,
  position: yup.string().required("banks.schema.position") ,
  
})
