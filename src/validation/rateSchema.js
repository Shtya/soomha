import * as yup from 'yup'


export const rateSchema = yup.object({
  rate_us     : yup.string().required("rate-us.schema.comment"),
})
