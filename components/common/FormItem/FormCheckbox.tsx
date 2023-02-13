import { Checkbox, CheckboxProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputProps = {
  name: string
} & CheckboxProps;

const FormCheckBox: FC<FormInputProps> = ({ name, ...otherProps }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (<Checkbox
          {...otherProps}
          onChange={(e) => field.onChange(e.target.checked)}
          checked={Boolean(field.value)}
        />)
      }}
    />

  )
}

export default FormCheckBox
