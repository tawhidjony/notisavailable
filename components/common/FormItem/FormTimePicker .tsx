
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';



type IDatePicker = {
  name: string
} & TextFieldProps
const FormTimePicker: FC<IDatePicker> = ({ name, ...otherProps }) => {
  const { control } = useFormContext()
  return (

    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterMoment} >
          <TimePicker
            label=""
            inputFormat="HH:mm:ss"
            value={value ? moment(value, 'HH:mm:ss') : moment()}
            onChange={(event) => {
              // console.log('event', event);
              onChange(moment(event).format('HH:mm:ss'));
            }}
            renderInput={(params) => <TextField {...params} {...otherProps} error={!!error} helperText={error?.message} fullWidth />}
          />
        </LocalizationProvider>
      )} />
  );
}

export default FormTimePicker