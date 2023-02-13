import { FormHelperText, InputBase, MenuItem, Select, SelectProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';


type IFormSelectProps = {
  name: string;
  dataSource: any[];
} & SelectProps;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(0),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '7px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const FormSelect: FC<IFormSelectProps> = ({ name, dataSource, ...otherProps }) => {
  const { control, formState: { errors } } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue=''
      render={({ field }) => (<>
        <Select
          {...field}
          {...otherProps}
          fullWidth
          size='small'
          input={<BootstrapInput name='' />}
          error={!!errors}
        >
          {dataSource?.map((item, index) => (
            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText error={true} sx={{ fontSize: '1rem' }} >{errors[name] ? (errors[name]?.message as unknown as string) : ''}</FormHelperText>
      </>)}
    />

  )
}

export default FormSelect