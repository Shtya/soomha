import * as yup from 'yup'


export const sign_inSchema = yup.object({
  email   : yup.string().required("schema.email") ,
  // password   : yup.number().typeError("schema.password") ,
  n_password   : yup.string().required("schema.password") ,
})
