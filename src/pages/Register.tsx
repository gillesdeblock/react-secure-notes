import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import FormInput from '@/components/FormInput'
import RegisterFormSchema from '@/schemas/RegisterForm'
import z from 'zod'
import http from '@/lib/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'

type RegisterFieldValues = z.infer<typeof RegisterFormSchema>

export default () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { control, handleSubmit, formState } = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordRepeat: '',
    },
  })

  const onSubmit = (data: RegisterFieldValues) => {
    let cancelled = false
    register()

    async function register() {
      setIsLoading(true)
      const response = await http(`${import.meta.env.VITE_SECURE_NOTES_API}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      setIsLoading(false)
      if (!cancelled && response.ok) {
        navigate('/')
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
          <Button className="hover:cursor-pointer" type="submit" form="form-register" disabled={!formState.isValid || isLoading}>
            {isLoading && <LoaderCircle className="h-[1.2rem] w-[1.2rem] animate-spin" />}
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
