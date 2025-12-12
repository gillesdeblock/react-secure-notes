import Page from '@/components/Page'
import NoteEdit from '@/components/NoteEdit'
import { Notes } from '@/components/Notes'
import { Separator } from '@/components/ui/separator'

export default () => {
  return (
    <Page className="flex">
      <Notes />
      <Separator orientation="vertical" />
      <NoteEdit className="w-full" />
    </Page>
  )
}
