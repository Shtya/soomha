import * as yup from 'yup'


export const sign_upSchema = yup.object({
  phone   : yup.string().required("sign-up.schema.phone") ,
  email   : yup.string().required("sign-up.schema.email") ,
  password   : yup.string().required("sign-up.schema.password") ,
  confirmPassword   : yup.string().required("sign-up.schema.confirmPassword") ,
})
