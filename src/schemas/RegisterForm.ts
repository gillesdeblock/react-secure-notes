import z from 'zod'

const RegisterFormSchema = z
  .object({
    email: z.string().nonempty('Field required'),
    password: z.string().nonempty('Field required').min(8, 'Must be at least 8 characters long'),
    passwordRepeat: z
      .string()
      .nonempty('Field required')
      .min(8, 'Must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ['passwordRepeat'],
    message: 'Passwords do not match',
  })

export default RegisterFormSchema
