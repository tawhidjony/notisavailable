import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputProps = {
    name: string;
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            defaultValue=''
            render={({ field }) => (<TextField
                {...field}
                {...otherProps}
                sx={{ mb: '1.5rem' }}
                variant="outlined"
                error={!!errors[name]}
                helperText={errors[name] ? (errors[name]?.message as unknown as string) : ''}
            />)}
        />

    )
}

export default FormInput