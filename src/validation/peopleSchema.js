import * as yup from 'yup'


export const peopleSchema = yup.object().shape({
  date    : yup.string().required("people.schema.date") ,
  email   : yup.string().required("people.schema.email") ,
  name    : yup.string().required("people.schema.name") ,
  phone   : yup.string().min(7 , "people.schema.phone").max(20 , 'people.schema.phone').typeError('people.schema.phone') ,
  price   : yup.number().typeError("people.schema.price") ,
  purpose : yup.string().required("people.schema.purpose") ,
  rights  : yup.string().optional() ,
  
  country : yup.string().required("people.schema.country") ,
  city    : yup.string().required("people.schema.city") ,
  brand   : yup.string().required("people.schema.brand") ,
  model   : yup.string().required("people.schema.model") ,
  status  : yup.string().required("people.schema.status") ,
  distance: yup.string().required("people.schema.distance") ,
  // damage_pieces  : yup.string().required(),
  spray   : yup.string().optional(),
  motor : yup.string().required("people.schema.motor") ,
  gearbox : yup.string().required("people.schema.gyripx") ,

  rights : yup.string().required("terms") ,


})
