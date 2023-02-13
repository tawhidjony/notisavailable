import { Box, TextField } from "@mui/material";
import React from "react";
import { inputFieldStyle } from "./InputFieldStyle";

type InputFieldProps = {
  label: string;
  value?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  errors?: any;
  helperText?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "standard" | "filled";
  styles?: object;
  fullWidth?: boolean;
  min?: number;
  max?: number;
  register?: any;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onBlur,
  onKeyPress,
  errors,
  type = "text",
  disabled = false,
  required = false,
  multiline = false,
  size = "small",
  variant = "outlined",
  styles,
  fullWidth = true,
  min,
  max,
  register,
}) => {
  let inputProps = {};

  if (min || max) {
    inputProps = {
      min,
      max,
    };
  }

  return (
    <Box sx={{ ...inputFieldStyle }}>
      <TextField
        className="inputField"
        label={label}
        {...register}
        variant={variant}
        size={size}
        type={type}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        value={value}
        multiline={multiline}
        disabled={disabled}
        required={required}
        fullWidth={fullWidth}
        sx={styles}
        error={errors}
        helperText={errors?.message}
        InputProps={{
          inputProps: {
            ...inputProps,
          },
        }}
      />
    </Box>
  );
};

export default InputField;
