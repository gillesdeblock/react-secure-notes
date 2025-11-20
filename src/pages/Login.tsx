import LoginForm from '@/components/LoginForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="flex-1 max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm></LoginForm>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="form-login">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
