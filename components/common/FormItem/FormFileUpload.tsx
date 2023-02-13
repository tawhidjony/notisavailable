import { Box, SxProps, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { HttpClientFileUpload } from 'Utils/HttpClient';


const styleFileUpload = {
  width: "100%",
  padding: "10px",
  border: "1px dotted",
  borderRadius: "5px",
  borderColor: "#1D8FA8",
  position: 'relative',
  '.previewImg': {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: '70px',
    top: 0,
    borderRadius: '5px',
    padding: '2px',
  },
  "& input::-webkit-file-upload-button": {
    background: "#1D8FA8",
    color: "#fff",
    borderRadius: "20px",
    border: "none",
    padding: "1em",
  },
}

type IFormFileInput = {
  name: string,
  previewUrl?: string
}

const FormFileUpload: FC<IFormFileInput> = ({ name, previewUrl }) => {

  const [previewFile, setPreviewFile] = useState<string>("")
  const { setError, register, setValue, getValues, formState: { errors } } = useFormContext()

  const fileUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {

    if (!e.target.files) {
      setPreviewFile("")
      return;
    }
    const file = e.target.files[0]

    if (!file) {
      setValue(name, "");
      setPreviewFile("")
    } else {
      const fileNameSplit = file.name.split(".");
      const fileExtension = fileNameSplit[fileNameSplit.length - 1];
      const fileSize = file.size / (1024 * 1024);
      const imageFileTypes = ["jpeg", "jpg", "png", "gif", 'webp'];

      if (!imageFileTypes.some((ext) => ext === fileExtension)) {
        setValue(name, "")
        setError(name, { type: 'custom', message: 'এখানে ছবি ছাড়া অন্য কোন ফাইল ব্যবহার করা যাবে না ' });
        return;
      }

      if (fileSize > 2) {
        setValue(name, "")
        setError(name, { type: 'custom', message: 'ছবি ২ MB এর কম সাইজ আপলোড করুন' });
        return;
      }

      const data = new FormData();
      data.append("file", file);

      HttpClientFileUpload.post("", data).then((res) => {
        if (res.statusText == "OK") {
          const imagePath = res?.data?.payload
          setPreviewFile(process.env.FILE_URL + '/' + imagePath.fileName)
          setValue(name, imagePath.fileName)
        }
      })
    }

  }

  useEffect(() => {
    if (getValues(name) === "") {
      setPreviewFile("")
    }
  }, [getValues(name)])


  return (<>
    <Box sx={{ ...styleFileUpload } as SxProps} >
      <input type="hidden" {...register(name)} />
      <input type="file" accept="image/*" onChange={fileUpload} />
      {previewFile && <img
        className='previewImg'
        src={previewFile ? previewFile : process.env.FILE_URL + '/' + previewUrl}
        alt=""
      />}
    </Box>
    <Typography color="error" sx={{ mt: 1 }} >{errors[name] ? (errors[name]?.message as unknown as string) : ''}</Typography>
  </>)
}

export default FormFileUpload