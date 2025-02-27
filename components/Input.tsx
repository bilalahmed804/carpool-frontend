import { Text, TextInputProps, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native'
import React, { forwardRef, useId } from 'react'
import { Control, Controller } from 'react-hook-form'
import { form_Data } from '@/app'

interface Inputprops extends TextInputProps {
    placeholder: string,
    label?: string,
    control: Control<form_Data>,
    name: keyof form_Data,
    keyboardType?: KeyboardTypeOptions
}

const Input =
    forwardRef<TextInput, Inputprops>(({ placeholder, label, style, control, name , keyboardType='default', ...props }, ref) => {
        return (
            <>
                {label && <Text
                    style={styles.label} >
                    {label}
                </Text>}
                <Controller
                    control={control}
                    name={name}
                    rules={{
                        required: `${name} is required`,
                        ...(name === 'email' ? { pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } } : {}),
                        ...(name === 'password' ? { minLength: { value: 8, message: "Password must be at least 8 characters" } } : {})
                    }}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <>
                            <TextInput
                                ref={ref}
                                style={[styles.input, style]}
                                placeholder={placeholder}
                                keyboardType={keyboardType}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                {...props}
                            />
                            {error && <Text style={styles.errorText}>{error.message}</Text>}
                        </>
                    )}
                />

            </>
        )
    })



const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: "#333",
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        // padding: 10,
        // marginBottom: 15,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        color: "#333",
    },
    errorText: {
        color: "#FF3B30",
        fontSize: 14,
        // marginBottom: 10,
    },
})

export default Input