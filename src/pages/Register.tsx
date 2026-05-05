import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import FormInput from '@/components/FormInput'
import RegisterFormSchema from '@/schemas/RegisterForm'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useGetCurrentUserQuery, useRegisterMutation } from '@/reducers/auth.api'
import { notesApi } from '@/reducers/notes.api'
import { useAppDispatch } from '@/hooks'
import { setAccessToken } from '@/reducers/auth.slice'

type RegisterFieldValues = z.infer<typeof RegisterFormSchema>

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery()
  const [register, { isLoading: isRegistrationPending }] = useRegisterMutation()

  const { control, handleSubmit, formState } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordRepeat: '',
    },
  })

  const onSubmit = async (data: RegisterFieldValues) => {
    const res = await register(data)

    if ('error' in res) {
      toast.error('Registration failed', { richColors: true })
      return
    }

    toast.success('User created')
    dispatch(setAccessToken(res.data.accessToken))
    dispatch(notesApi.util.resetApiState())
    await refetchCurrentUser()
    navigate('/')
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="flex-1 max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Already have an account?&nbsp;
            <Link className="hover:text-blue-500 hover:underline" to="/login">
              Click here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" id="form-register" onSubmit={handleSubmit(onSubmit)}>
            <FormInput type="email" title="Email" name="email" control={control}></FormInput>
            <FormInput type="password" title="Password" name="password" control={control}></FormInput>
            <FormInput type="password" name="passwordRepeat" title="Repeat your password" control={control}></FormInput>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="hover:cursor-pointer"
            type="submit"
            form="form-register"
            disabled={!formState.isValid || isRegistrationPending}
          >
            {isRegistrationPending && <LoaderCircle className="h-[1.2rem] w-[1.2rem] animate-spin" />}
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
