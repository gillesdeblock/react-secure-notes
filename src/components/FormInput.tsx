import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName>) {
  const { field, fieldState } = useController(props)

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={String(props.name)}>{String(props.name)}</FieldLabel>
      <Input {...field}></Input>
      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
    </Field>
  )
}
