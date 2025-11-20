import z from 'zod'
import http from '@/lib/http'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/FormInput'
import { useEffect } from 'react'

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

type RegisterFieldValues = z.infer<typeof RegisterFormSchema>

export default function RegisterForm() {
  const { control, watch, trigger, handleSubmit } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordRepeat: '',
    },
  })
  const navigate = useNavigate()

  const onSubmit = (data: RegisterFieldValues) => {
    async function register() {
      const response = await http('http://localhost:3000/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        navigate('/')
      }
    }

    register()
  }

  useEffect(() => {
    trigger('passwordRepeat')
  }, [watch(['password', 'passwordRepeat'])])

  return (
    <form className="flex flex-col gap-4" id="form-register" onSubmit={handleSubmit(onSubmit)}>
      <FormInput type="email" title="Email" name="email" control={control}></FormInput>
      <FormInput type="password" title="Password" name="password" control={control}></FormInput>
      <FormInput
        type="password"
        name="passwordRepeat"
        title="Repeat your password"
        control={control}
      ></FormInput>
    </form>
  )
}
