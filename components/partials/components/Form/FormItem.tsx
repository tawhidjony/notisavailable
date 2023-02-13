import { Box, Button, Grid } from '@mui/material'
import FileUpload from 'components/common/FormItem/FileUpload'
import InputField from 'components/common/FormItem/InputField'
import RadioBox from 'components/common/FormItem/RadioBox'
import SelectBox from 'components/common/FormItem/SelectBox'
import TexteEditor from 'components/common/FormItem/TexteEditor'
import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface IFormInputs {
  firstName: string
  lastName: string
  phone: string
  email: string
  profile_picture: string
  select: string
  gender: string
  content: string
}

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().required("Email is required"),
  profile_picture: yup.string().required("Image is required"),
  select: yup.string().required("Select box is required"),
  gender: yup.string().required("Choose gender first"),
  content: yup.string().required("Content is required"),
}).required()

const FormItem: React.FC = () => {

  const radioBoxItems = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    },
    {
      label: 'Others',
      value: 'others'
    }
  ]

  const { register, handleSubmit, formState: { errors }, control, watch, setValue,getValues } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: IFormInputs) => {
    console.log(data)
  }

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputField
              label="First Name"
              register={register('firstName')}
              errors={errors?.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField 
              label="Last Name"
              register={register('lastName')}
              errors={errors?.lastName}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField 
              label="Phone number"
              type='number'
              register={register('phone')}
              errors={errors?.phone}
            />
          </Grid>
          <Grid item xs={6}>
            <InputField 
              label="Email"
              type='email'
              register={register('email')}
              errors={errors?.email}
            />
          </Grid>
          <Grid item xs={6}>
            <FileUpload 
              label="Profile Picture"
              register={register('profile_picture')}
              errors={errors?.profile_picture}
              multiple={true}
              fileType="image"
            />
          </Grid>
          <Grid item xs={6}>
            <SelectBox 
              label="Select Box"
              onChange={(e) => {console.log(e.target.value)}}
              register={register('select')}
              errors={errors?.select}
              items={[
                {value: '1', label: 'One'},
                {value: '2', label: 'Two'}
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <RadioBox 
              label="Gender"
              register={register('gender')}
              errors={errors?.gender}
              items={radioBoxItems}
            />
          </Grid>
          <Grid item xs={12}>
            <TexteEditor watch={watch} setValue={setValue} errors={errors?.content} />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained'>Submit</Button>
          </Grid>

        </Grid>
      </form>
    </Box>
  )
}

export default FormItem