import z from 'zod'
import http from '@/lib/http'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/FormInput'

const LoginFormSchema = z.object({
  email: z.string().nonempty('Field required'),
  password: z.string().nonempty('Field required'),
})

type LoginFieldValues = z.infer<typeof LoginFormSchema>

export default function LoginForm() {
  const { control, handleSubmit } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()

  const onSubmit = (data: LoginFieldValues) => {
    async function login() {
      const response = await http('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        navigate('/')
      }
    }

    login()
  }

  return (
    <form className="flex flex-col gap-4" id="form-login" onSubmit={handleSubmit(onSubmit)}>
      <FormInput name="email" control={control}></FormInput>
      <FormInput name="password" control={control}></FormInput>
    </form>
  )
}
