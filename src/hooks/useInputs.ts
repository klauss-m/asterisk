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

  return { formData, setFormData, fetchAddress, setData }
}
