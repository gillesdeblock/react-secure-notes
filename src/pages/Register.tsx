import RegisterForm from '@/components/RegisterForm'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router'

export default () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="flex-1 max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Already have an account?&nbsp;
            <Link className="hover:text-blue-500 hover:underline hover:font-semibold" to="/login">
              Click here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm></RegisterForm>
        </CardContent>
        <CardFooter>
          <Button className="hover:cursor-pointer" type="submit" form="form-register">
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
