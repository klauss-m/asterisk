import { TextField, Tooltip } from '@mui/material'

import { ValidateError } from '../../hooks/useValidate'
import { FormData } from '../../hooks/useInputs'

interface ValidationInputProps {
  field:
    | 'name'
    | 'email'
    | 'gender'
    | 'birthday'
    | 'phone'
    | 'cpf'
    | 'zip'
    | 'city'
    | 'state'
    | 'address'
    | 'complement'
    | 'number'
    | 'password'
  fieldLabel: string
  errors: ValidateError[]
  formData: FormData
  setErrors: (errors: ValidateError[]) => void
  setFormData: (data: string, value: string) => void
  type?: string
  onchange?: (arg: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  value?: boolean
  readonly?: boolean
  editData?: string
}

export function ValidationInput({
  field,
  fieldLabel,
  errors,
  formData,
  setErrors,
  setFormData,
  type = 'text',
  onchange = (e) => {
    setErrors(errors.filter((error) => !Object.keys(error).includes(field)))
    setFormData(field, e.target.value)
  },
  value,
  readonly,
  editData,
}: ValidationInputProps) {
  let props: { [key: string]: any } = {
    InputLabelProps: { shrink: true },
    error: errors.filter((error) => Object.keys(error).includes(field)).length > 0,
    helperText: errors.find((error) => Object.keys(error).includes(field))?.[field],
    onChange: onchange,
    variant: 'outlined' as 'outlined',
    required: true,
    fullWidth: true,
    label: fieldLabel,
    type,
  }

  if (value) {
    props.value = formData[field]
    if (editData) {
      props.value = editData
    }
  } else {
    props.defaultValue = formData[field]
    if (editData) {
      props.defaultValue = editData
    }
  }

  if (readonly) {
    props.readOnly = true
  }

  return (
    <>
      {field === 'address' && (
        <Tooltip title={formData[field] || editData! || ''}>
          <TextField {...props} />
        </Tooltip>
      )}
      {field !== 'address' && <TextField {...props} />}
    </>
  )
}
