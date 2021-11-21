import { useState } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'

interface ViaCep {
  data: {
    localidade: string
    logradouro: string
    bairro: string
    uf: string
    erro: boolean
  }
}

export interface FormData {
  name: string
  gender: string
  email: string
  birthday: string
  cpf: string
  phone: string
  city: string
  state: string
  zip: string
  address: string
  number: string
  complement: string
  password: string
}

export type FormEmployee = FormData & {
  rg: string
  pis: string
  cnh: string
  maritalStatus: string
  dateAdmission: string
  dateDemission: string
  registerDate: string
  salary: string
  role: string
  active: string
}

export function useInputs() {
  const [formData, setData] = useState<FormData>({
    name: '',
    gender: 'M',
    email: '',
    birthday: DateTime.now().toFormat('yyyy-LL-dd'),
    cpf: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    address: '',
    number: '',
    complement: '',
    password: '',
  })

  const [formEmployee, setEmployee] = useState<FormEmployee>({
    name: '',
    gender: 'M',
    email: '',
    birthday: DateTime.now().toFormat('yyyy-LL-dd'),
    cpf: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    address: '',
    number: '',
    complement: '',
    password: '',
    rg: '',
    pis: '',
    cnh: '',
    maritalStatus: 'Solteiro',
    dateAdmission: DateTime.now().toFormat('yyyy-LL-dd'),
    dateDemission: DateTime.now().toFormat('yyyy-LL-dd'),
    registerDate: DateTime.now().toFormat('yyyy-LL-dd'),
    salary: '',
    role: 'Balconista',
    active: 'Ativo',
  })

  function setFormData(data: string, value: string) {
    if (data === 'date') {
      setData({
        ...formData,
        birthday: DateTime.fromFormat(value, 'yyyy-LL-dd').toFormat('dd/LL/yyyy'),
      })
    } else {
      setData({ ...formData, [data]: value })
    }
  }

  function setFormEmployee(data: string, value: string) {
    if (data === 'date') {
      setEmployee({
        ...formEmployee,
        birthday: DateTime.fromFormat(value, 'yyyy-LL-dd').toFormat('dd/LL/yyyy'),
        dateAdmission: DateTime.fromFormat(value, 'yyyy-LL-dd').toFormat('dd/LL/yyyy'),
        dateDemission: DateTime.fromFormat(value, 'yyyy-LL-dd').toFormat('dd/LL/yyyy'),
        registerDate: DateTime.fromFormat(value, 'yyyy-LL-dd').toFormat('dd/LL/yyyy'),
      })
    } else {
      setEmployee({ ...formEmployee, [data]: value })
    }
  }

  async function fetchAddress(zip: string) {
    if (zip.length >= 8) {
      try {
        const response: ViaCep = await axios.get(`https://viacep.com.br/ws/${zip}/json/`)
        if (response.data.erro) {
          console.error('cep inválido')
        } else {
          setData({
            ...formData,
            zip: zip,
            city: response.data.localidade,
            address: `${response.data.logradouro} - ${response.data.bairro}`,
            state: response.data.uf,
          })
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      setData({ ...formData, zip: zip, city: '', address: '', state: '' })
    }
  }

  async function fetchAddressEmployee(zip: string) {
    if (zip.length >= 8) {
      try {
        const response: ViaCep = await axios.get(`https://viacep.com.br/ws/${zip}/json/`)
        if (response.data.erro) {
          console.error('cep inválido')
        } else {
          setEmployee({
            ...formEmployee,
            zip: zip,
            city: response.data.localidade,
            address: `${response.data.logradouro} - ${response.data.bairro}`,
            state: response.data.uf,
          })
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      setEmployee({ ...formEmployee, zip: zip, city: '', address: '', state: '' })
    }
  }

  return {
    formData,
    setFormData,
    fetchAddress,
    setData,
    setFormEmployee,
    formEmployee,
    setEmployee,
    fetchAddressEmployee,
  }
}
