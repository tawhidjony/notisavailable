import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Grid, SxProps } from "@mui/material";
import FormSubmitButton from "components/common/Button/FormSubmitButton";
import InputField from "components/common/FormItem/InputField";
import useErrorHandler from "hooks/errorHandlerHooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import HTTP, { setFromAuthResponse } from "Utils/APIConfig";
import * as yup from "yup";
import { LOGIN_API } from "./api/list";
import { formStyle } from "./FormStyle";

interface IFormInputs {
  identifier: string;
  password: string;
}

const schema = yup
  .object({
    identifier: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const handleError = useErrorHandler();
  const [passwordType, setPasswordType] = useState(true);

  const [submittingForm, setSubmittingForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const handlePassord = () => {
    setPasswordType((prevState) => !prevState);
  };

  const onSubmit = (data: IFormInputs) => {
    setSubmittingForm(true);
    HTTP.post(LOGIN_API, data)
      .then((res) => {
        console.log(res);
        setFromAuthResponse(res);
        setSubmittingForm(false);

        window.location.href = "/admin";
      })
      .catch((err) => {
        console.log(err);
        handleError({
          err: err,
          // setFieldError: setError,
        });
        setSubmittingForm(false);
      });
  };

  return (
    <>
      <Box sx={{ ...formStyle } as SxProps}>
        <Box className="mainField">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  label="Email / Mobile Number"
                  type="email"
                  register={register("identifier")}
                  errors={errors?.identifier}
                />
              </Grid>
              <Grid item xs={12}>
                <Box className="passwordWrapper">
                  <InputField
                    label="Passowrd"
                    type={passwordType ? "password" : "text"}
                    register={register("password")}
                    errors={errors?.password}
                  />
                  <Box onClick={handlePassord} >{passwordType ?
                    <VisibilityOffIcon /> : <VisibilityIcon />}</Box>
                </Box>
              </Grid>
              <Grid className="forgot" item xs={12}>
                <a href="#">Forgot Password</a>
              </Grid>
              <Grid item xs={12} className="loginBtn">
                <FormSubmitButton
                  fullWidth={false}
                  isLoading={submittingForm}
                  buttonText={"Login"}
                  loadingText="Login, Please wait."
                  type={"submit"}
                />
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Box className="designBy">
        <p>Design and Developed by : SIMEC System Ltd.</p>
      </Box>
    </>
  );
};

export default LoginForm;
