import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { InputHTMLAttributes } from 'react'

type FormInputType = InputHTMLAttributes<HTMLInputElement>['type']
type FormInputProps<T1 extends FieldValues, T2 extends FieldPath<T1>> = {
  title?: string
  type?: FormInputType
} & UseControllerProps<T1, T2>

export default function FormInput<T1 extends FieldValues, T2 extends FieldPath<T1>>(
  props: FormInputProps<T1, T2>,
) {
  const { field, fieldState } = useController(props)
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={props.name}>{props.title || props.name}</FieldLabel>
      <Input type={props.type} {...field}></Input>
      {fieldState.invalid && <FieldError errors={[fieldState.error]}></FieldError>}
    </Field>
  )
}
