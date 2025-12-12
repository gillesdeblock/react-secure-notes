import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import z from 'zod'
import FormInput from '@/components/FormInput'
import LoginFormSchema from '@/schemas/LoginForm'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useGetCurrentUserQuery, useLoginMutation } from '@/reducers/auth.api'

type LoginFieldValues = z.infer<typeof LoginFormSchema>

export default () => {
  const navigate = useNavigate()
  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery()
  const [login, { isLoading: isLoginPending }] = useLoginMutation()

  const { control, handleSubmit, formState } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFieldValues) => {
    const res = await login(data)

    if ('error' in res) {
      toast.error('Login failed', { richColors: true })
      return
    }

    toast.success('Logged in')
    await refetchCurrentUser()
    navigate('/')
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="flex-1 max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            No account yet?&nbsp;
            <Link className="hover:text-blue-500 hover:underline" to="/register">
              Click here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" id="form-login" onSubmit={handleSubmit(onSubmit)}>
            <FormInput type="email" title="Email" name="email" control={control}></FormInput>
            <FormInput type="password" title="Password" name="password" control={control}></FormInput>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="hover:cursor-pointer" type="submit" form="form-login" disabled={!formState.isValid || isLoginPending}>
            {isLoginPending && <LoaderCircle className="h-[1.2rem] w-[1.2rem] animate-spin" />}
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
