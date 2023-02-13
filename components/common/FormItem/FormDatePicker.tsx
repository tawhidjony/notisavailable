
import { FormHelperText } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { DatePicker } from "@mui/x-date-pickers";
import moment from 'moment';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
type IDatePicker = {
  name: string
} & TextFieldProps


const FormDatePicker: FC<IDatePicker> = ({ name, ...otherProps }) => {
  const { control, formState: { errors } } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...restField } }) => (
        <DatePicker
          inputFormat="DD-MM-YYYY"
          value={value ? value : moment()}
          onChange={(newValue) => { onChange(newValue) }}
          renderInput={(params) => (<>
            <TextField {...params} {...otherProps} size="small" fullWidth error={!!errors[name]} />
            <FormHelperText error={true} sx={{ fontSize: '1rem' }} >{errors[name] ? (errors[name]?.message as unknown as string) : ''}</FormHelperText>
          </>)}
          {...restField}
        />
      )}
    />

  );
}

export default FormDatePicker



{/* <Controller
name={name}
control={control}
render={({ field: { onChange, value } }) => (
  <LocalizationProvider dateAdapter={AdapterMoment} >
    <DesktopDatePicker
      label=""
      inputFormat="DD-MM-YYYY"
      value={moment(value, 'DD-MM-YYYY')}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} {...otherProps} error={!!errors[name]} fullWidth />}
    />
    <FormHelperText error={true} sx={{ fontSize: '1rem' }} >{errors[name] ? (errors[name]?.message as unknown as string) : ''}</FormHelperText>
  </LocalizationProvider>
)} /> */}