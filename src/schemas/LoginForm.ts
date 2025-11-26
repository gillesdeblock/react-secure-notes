import z from 'zod'

const LoginFormSchema = z.object({
  email: z.string().nonempty('Field required'),
  password: z.string().nonempty('Field required'),
})

export default LoginFormSchema
