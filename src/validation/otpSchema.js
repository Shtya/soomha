import * as yup from 'yup'


export const otpSchema = yup.object({
  otp   : yup.string().required("enter-email.schema.otp") ,
  password: yup
    .string()
    .required("enter-email.schema.password")
    .min(6, "enter-email.schema.password-min-length"), // Ensure password is at least 6 characters
  confirmPassword: yup
    .string()
    .required("enter-email.schema.confirmPassword")
    .oneOf([yup.ref('password')], "enter-email.schema.confirmPassword-match")
  // password   : yup.string().required("enter-email.schema.password") ,
  // confirmPassword   : yup.string().required("enter-email.schema.confirmPassword") ,
})
