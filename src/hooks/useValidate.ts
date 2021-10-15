import { useState } from 'react'
import { isCpf, isCep } from 'validator-brazil'
import validator from 'validator'
import { FormData } from './useInputs'

export type ValidateError = { [field: string]: string }

export function useValidate(fields: string[]) {
  const [errors, setErrors] = useState<ValidateError[]>([])

  function validate(data: FormData) {
    const tempErrors: ValidateError[] = []
    if (
      fields.includes('name') &&
      (validator.isEmpty(data.name) || !validator.isLength(data.name, { min: 3 }))
    ) {
      tempErrors.push({ name: 'Nome inválido' })
    }
    if (fields.includes('cpf') && !isCpf(data.cpf)) {
      tempErrors.push({ cpf: 'CPF inválido' })
    }
    if (fields.includes('email') && !validator.isEmail(data.email)) {
      tempErrors.push({ email: 'E-mail inválido' })
    }
    if (fields.includes('phone') && !validator.isMobilePhone(data.phone, 'pt-BR')) {
      tempErrors.push({ phone: 'Telefone inválido' })
    }
    if (fields.includes('zip') && !isCep(data.zip)) {
      tempErrors.push({ zip: 'CEP inválido' })
    }
    if (fields.includes('password') && !data.password.match(/\S{8}/)) {
      tempErrors.push({ password: 'Senha inválida' })
    }

    return tempErrors
  }

  function resetErrors() {
    setErrors([])
  }

  return { validate, errors, setErrors, resetErrors }
}
