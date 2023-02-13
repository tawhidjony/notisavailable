import { FormControl, FormHelperText, InputLabel, InputLabelProps, TextField, TextFieldProps } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";


const BootstrapInput = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '7px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const BootstrapInputLabel = styled(InputLabel)(({ theme }) => ({
  '&.MuiInputLabel-root': { fontSize: '18px', },
}));

type FormInputProps = {
  name: string;
} & TextFieldProps;

type FormInputLabels = {
  required?: boolean
} & InputLabelProps

export const FormInputLabel: FC<FormInputLabels> = ({ children, required, ...otherProps }) => {
  return (
    <BootstrapInputLabel shrink {...otherProps}>{children}
      {required === true ? <span style={{ color: '#e70000', fontSize: '18px' }} > *</span> : ""}
    </BootstrapInputLabel>)
}

const FormInputBootstrap: FC<FormInputProps> = ({ name, ...otherProps }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field: { ref, ...field } }) => (
        <FormControl variant="standard" fullWidth >
          <BootstrapInput
            {...field}
            {...otherProps}
            error={!!errors[name]}
            inputRef={ref}
          />
          <FormHelperText error={true} sx={{ fontSize: '1rem' }} >{errors[name] ? (errors[name]?.message as unknown as string) : ''}</FormHelperText>
        </FormControl>
      )}

    />

  )
}

export default FormInputBootstrap
