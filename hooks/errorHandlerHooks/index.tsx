import axios from "axios";
import { useSnackbar } from "notistack";

type ErrorSetProps = {
  type: string;
  message: string;
}

type Props = {
  err: any,
  setFieldError?: (field: string, errorState: ErrorSetProps) => void

}
const useErrorHandler = () => {
  const { enqueueSnackbar } = useSnackbar();

  return ({ err, setFieldError }: Props) => {
    if (err.response && err.response.data) {
      // @ts-ignore
      if (err.response.data.errors) {
        // @ts-ignore
        const error = err.response.data.errors;

        // @ts-ignore
        error.forEach((ele) => {
          if (ele.constraints.minLength) {
            enqueueSnackbar(ele.constraints.minLength, { variant: 'error' });

          }
          if (ele.constraints.maxLength) {
            enqueueSnackbar(ele.constraints.maxLength, { variant: 'error' });

          }

        })
      } else {
        const message = err.response.data?.message;
        enqueueSnackbar(message, { variant: 'error' });
      }
    } else {
      // @ts-ignore
      if (!axios.isCancel(err) && err.message === 'Network Error') {
        enqueueSnackbar('Maybe you are offline. Please Try again!', { variant: 'error' });
      } else {
        enqueueSnackbar('Failed. Please try again!', { variant: 'error' });
      }
    }
  }
};

export default useErrorHandler;
