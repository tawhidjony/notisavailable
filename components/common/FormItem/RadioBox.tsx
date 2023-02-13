import React from 'react'
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material'

type propTypes = {
  label: string,
  register: any,
  errors: any,
  disabled?: boolean,
  required?: boolean,
  items: Array<{
    label: string,
    value: string,
  }>
  row?: boolean,
}

const RadioBox: React.FC<propTypes> = ({
  label,
  register,
  errors,
  disabled = false,
  required = false,
  items,
  row = true,
}) => {
  return (
    <FormControl required={required}>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby="demo-row-radio-buttons-group-label"
        {...register}
      >
        {
          items.map((item, index)=> (
            <FormControlLabel 
              key={`radio-item-${index}`} 
              value={item.value} 
              label={item.label}  
              control={<Radio />} 
              disabled={disabled}
            />
          ))
        }
      </RadioGroup>
      {errors?.message && <FormHelperText>{errors?.message}</FormHelperText>}
    </FormControl>
  )
}

export default RadioBox