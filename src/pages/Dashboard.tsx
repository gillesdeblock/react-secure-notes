import useCurrentUser from '@/hooks/useCurrentUser'

export default () => {
  useCurrentUser()

  return <div>Dashboard</div>
}
