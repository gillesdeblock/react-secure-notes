import LoginForm from '@/components/LoginForm'
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
          <CardTitle>Login</CardTitle>
          <CardDescription>
            No account yet?&nbsp;
            <Link
              className="hover:text-blue-500 hover:underline hover:font-semibold"
              to="/register"
            >
              Click here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
        </CardContent>
        <CardFooter>
          <Button className="hover:cursor-pointer" type="submit" form="form-login">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
