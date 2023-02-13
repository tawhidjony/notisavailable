import { Autocomplete, FormHelperText, TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ListData {
  label: string
  value: string
}

type FormInputProps = {
  name: string;
  dataSource: ListData[],
  disabled?: boolean
} & TextFieldProps;

const FormAutocomplete: FC<FormInputProps> = ({ name, disabled, dataSource, ...otherProps }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{ label: "", value: "" }}

      render={({ field }) => (
        <Autocomplete
          {...field}
          options={dataSource || []}
          size="small"
          disabled={disabled}
          getOptionLabel={(option) => `${option.label}` ?? ''}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, data) => field.onChange(data)}

          renderInput={(params) => (<>
            <TextField
              {...params}
              {...otherProps}
              inputRef={field.ref}
              error={!!errors[name]}
            />
            <FormHelperText error={true} sx={{ fontSize: '1rem' }} >{!!errors[name] && "This field is required"}</FormHelperText>
          </>)}

        />
      )}
    />

  )
}

export default FormAutocomplete
