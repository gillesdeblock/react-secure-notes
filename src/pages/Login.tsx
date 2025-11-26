import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import FormInput from '@/components/FormInput'
import LoginFormSchema from '@/schemas/LoginForm'
import z from 'zod'
import http from '@/lib/http'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import useCurrentUser from '@/hooks/useCurrentUser'

type LoginFieldValues = z.infer<typeof LoginFormSchema>

export default () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { fetchCurrentUser } = useCurrentUser({ autoload: false })

  const { control, handleSubmit, formState } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFieldValues) => {
    let cancelled = false
    register()

    async function register() {
      setIsLoading(true)
      const response = await http('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      setIsLoading(false)
      if (cancelled) {
        return
      }
      if (response.ok) {
        navigate('/')
        fetchCurrentUser()
      } else {
        toast.error('Login failed.', { richColors: true })
      }
    }

    return () => {
      cancelled = true
    }
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
            <FormInput
              type="password"
              title="Password"
              name="password"
              control={control}
            ></FormInput>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="hover:cursor-pointer"
            type="submit"
            form="form-login"
            disabled={!formState.isValid || isLoading}
          >
            {isLoading && <LoaderCircle className="h-[1.2rem] w-[1.2rem] animate-spin" />}
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
