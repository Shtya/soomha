import * as yup from 'yup'


export const complainSchema = yup.object({
  name     : yup.string().required("send-complains.schema.name"),
  email    : yup.string().required("send-complains.schema.email"),
  message  : yup.string().required("send-complains.schema.message"),

})
