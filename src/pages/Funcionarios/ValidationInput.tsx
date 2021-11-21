import { TextField, Tooltip } from '@mui/material'

import { ValidateError } from '../../hooks/useValidate'
import { FormEmployee } from '../../hooks/useInputs'

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
    | 'rg'
    | 'pis'
    | 'cnh'
    | 'dateAdmission'
    | 'dateDemission'
    | 'registerDate'
    | 'salary'
    | 'role'
    | 'maritalStatus'
    | 'active'
  fieldLabel: string
  errors: ValidateError[]
  formEmployee: FormEmployee
  setErrors: (errors: ValidateError[]) => void
  setFormEmployee: (data: string, value: string) => void
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
  formEmployee,
  setErrors,
  setFormEmployee,
  type = 'text',
  onchange = (e) => {
    setErrors(errors.filter((error) => !Object.keys(error).includes(field)))
    setFormEmployee(field, e.target.value)
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
    props.value = formEmployee[field]
  } else {
    props.defaultValue = formEmployee[field]
  }

  if (readonly) {
    props.readOnly = true
  }

  return (
    <>
      {field === 'address' && (
        <Tooltip title={formEmployee[field]}>
          <TextField {...props} />
        </Tooltip>
      )}
      {field !== 'address' && <TextField {...props} />}
    </>
  )
}
