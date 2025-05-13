import * as yup from 'yup'


export const enter_email_schema = yup.object({
  email   : yup.string().required("enter-email.schema.email") 
})
