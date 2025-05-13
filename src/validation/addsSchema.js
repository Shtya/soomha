import * as yup from 'yup'


export const addsSchema = yup.object({
  
  name    : yup.string().required("adds.schema.name") ,
  person  : yup.string().required("adds.schema.position") ,
  type    : yup.string().required("adds.schema.active") ,
  email   : yup.string().required("adds.schema.email") ,
  phone   : yup.string().required('adds.schema.phone') ,
  city    : yup.string().required("adds.schema.city") ,

})
