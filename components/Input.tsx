import { View, Text, TextInputProps } from 'react-native'
import React, { forwardRef } from 'react'

interface Inputprops extends TextInputProps {
    type: string,
    placeholder : string,
    label? : string
}

const  Input = forwardRef<Inputprops>({type='text', placeholder, label , ...props}, ref) => {
  return (

  )
}

