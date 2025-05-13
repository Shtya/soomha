import * as yup from 'yup'


export const accountSchema = yup.object({
  email           : yup.string().optional("my-account.schema.email") ,
  phone           : yup.string().required("my-account.schema.phone"),
  passwordCurrent : yup.string().optional(),
  newPassword     : yup.string().optional(),
  confirmPassword : yup.string().optional(),
})
