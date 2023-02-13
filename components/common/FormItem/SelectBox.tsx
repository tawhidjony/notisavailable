import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles({
  inputField: {
    minWidth: '100%',
    width: '100%',

    '& label': {
      fontSize: '14px',
    }
  },
})

type selectItemTypes = {
  label: string,
  value: string,
}

type propTypes = {
  label: string,
  value?: string,
  onChange?: (event: SelectChangeEvent<string>) => void,
  items: Array<selectItemTypes>,
  size?: "small" | "medium",
  register?: any
  errors?: any,
  multiple?: boolean
}

const SelectBox: React.FC<propTypes> = ({
  label,
  value,
  onChange,
  items,
  size = "small",
  register,
  errors,
  multiple = false
}) => {
  const classes = useStyles()

  const renderValue = (selected: any) => {
    if (Array.isArray(selected)) {
      return selected
        .reduce((accu, item) => {
          const option = items.find((ele: any) => ele.value === item);
          if (option !== undefined) {
            return [...accu, option.label];
          }
          return accu;
        }, [])
        .join(", ");
    } else {
      const option = items.find((ele: any) => ele.value === selected);
      if (option !== undefined) {
        return option.label;
      }
      return '';
    }
  }

  return (
    <FormControl size={size} sx={{ width: '100%' }}>
      <InputLabel id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        label={label}
        renderValue={renderValue}
        {...register}
        value={value}
        multiple={multiple}
        onChange={onChange}
        fullWidth={true}
        className={classes.inputField}
      >
        {
          items?.map((item, index) => (
            <MenuItem key={`selectbox-item-${index}-item-${item.label}`} value={item.value}>
              {item.label}
            </MenuItem>
          ))
        }
      </Select>
      {errors?.message && <FormHelperText>{errors?.message}</FormHelperText>}
    </FormControl>
  )
}

export default SelectBox