import * as yup from 'yup'

export const signupSchema = yup.object().shape({
  email: yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
  password: yup
    .string()
    .min(6, 'รหัสผ่านควรมีมากกว่า 6 ตัวอักษร')
    .required('กรุณากรอกรหัสผ่าน'),
  confirmPassword: yup
    .string()
    .min(6, 'รหัสผ่านควรมีมากกว่า 6 ตัวอักษร')
    .required('กรุณากรอกรหัสผ่าน')
    .oneOf([yup.ref('password')], 'รหัสผ่านไม่ตรงกัน'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอกอีเมล'),
  password: yup
    .string()
    .min(6, 'รหัสผ่านควรมีมากกว่า 6 ตัวอักษร')
    .required('กรุณากรอกรหัสผ่าน'),
})

export const createPartySchema = yup.object().shape({
  name: yup.string().required('กรุณากรอกชื่อปาร์ตี้'),
  amount: yup.number().max(5, 'กรุณากรอกจำนวนคนที่ขาดไม่เกิน 5 คน').typeError('กรุณากรอกจำนวนคนที่ขาด').required('กรุณากรอกจำนวนคนที่ขาด')
})
