
import * as yup from 'yup'


export const ContactSchema = yup.object({
  name: yup.string().required('contact-us.schema.name'),
  email: yup.string().email().required('contact-us.schema.email') ,
  message  : yup.string().required("contact-us.schema.message") ,
  topic  : yup.string().required('contact-us.schema.topic') ,
  
})
