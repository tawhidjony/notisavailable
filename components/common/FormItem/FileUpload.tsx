import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useRef, useState } from 'react';

type FileType = "image" | "doc"

type fileItemType = {
  file: string;
  type: string;
  name: string;
}

type fileItemsType = fileItemType[]

type FileUploadProps = {
  label: string;
  name?: string;
  value?: string;
  fileType?: FileType;
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any
  errors?: any
}

const FileExtensions = {
  image: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  doc: ['docx', 'doc', 'xlsx', 'pdf', 'txt', 'csv']
}


const useStyles = makeStyles({
  fileUploadBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '40px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    position: 'relative',
    cursor: 'pointer',
    '& input': {
      opacity: 0,
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  },
  fileUploadBoxLabel: {
    fontSize: '14px',
    color: '#999',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    zIndex: 0,

    '& span': {
      zIndex: 1
    }
  },
  multipleFiles: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    gap: '10px',
    marginTop: '10px',

    '& > div': {
      width: '60px',
      height: '60px',
      cursor: 'pointer',

      '& > div': {
        width: '100%',
        height: '100%',
        boxShadow: '0px 0px 5px 0px #ccc',
        borderRadius: '5px',
        position: 'relative',

        '& span': {
          position: 'absolute',
          right: 0,
          top: 0,
          background: '#656565',
          lineHeight: 0,
          color: '#fff',
          borderRadius: '50%',
          padding: '2px',
          '& svg': {
            fontSize: '16px'
          }

        },

        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }
      }
    }
  }
})



const FileUpload: React.FC<FileUploadProps> = ({ label, name, value, fileType = "image", multiple = false, onChange, register, errors }) => {

  const classes = useStyles();

  const inputFile = useRef<HTMLInputElement>(null)

  const [fileItems, setFileItems] = useState<fileItemsType>([])
  let items: fileItemType[] = []

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files || []
    if (multiple) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const { name, size } = file

        const fileExtension = name.split('.').pop() || '';

        if (FileExtensions[fileType]?.includes(fileExtension)) {
          const fileReader = new FileReader()
          fileReader.onloadend = (element: any) => {
            items.push({ file: element.target.result, type: fileType, name: name })
            setFileItems(items)
          }

          fileReader.readAsDataURL(file)
        }
      }
    }
    else {
      const file = files[0];
      if (file) {
        const { name, size } = file

        const fileExtension = name.split('.').pop() || '';

        if (!FileExtensions[fileType]?.includes(fileExtension)) {
          e.preventDefault()
          return false
        }

        const fileReader = new FileReader()
        fileReader.onload = (element: any) => {
          setFileItems([{ file: element.target.result, type: fileType, name }])
        }

        fileReader.readAsDataURL(file)
      }
      else {
        setFileItems([])
        e.preventDefault()
        return false
      }
    }
  }

  const removeItem = (itemIndex: number) => {
    let fileItemsCopy = [...fileItems]

    fileItemsCopy.splice(itemIndex, 1)
    setFileItems(fileItemsCopy)

    if (fileItemsCopy.length === 0) {
      items = []

      if (inputFile.current) {
        inputFile.current.value = ''
      }

    }

  }

  const removeSingleItem = () => {
    setFileItems([])
    if (inputFile.current) {
      inputFile.current.value = ''
    }
  }


  return (
    <>
      <Box className={classes.fileUploadBox}>
        {
          (fileItems.length === 1 && !multiple) ?
            <Box className={classes.fileUploadBoxLabel}>
              <span>{fileItems[0].name}</span>
              <span onClick={removeSingleItem}><CloseIcon /></span>
            </Box>
            :
            <Box className={classes.fileUploadBoxLabel}>
              <CloudUploadIcon />
              <span>{label}</span>
            </Box>
        }
        <input ref={inputFile} type="file" multiple={multiple} {...register} value={value} onChange={handleFile} />

      </Box>
      {
        errors &&
        <span>
          {errors?.message}
        </span>
      }
      {
        (fileItems.length > 0 && multiple) &&
        <Box className={classes.multipleFiles}>
          {
            fileItems.map((item: fileItemType, index: number) => (
              <Box key={`file-item-${index}`}>
                {
                  item.type === "image" ?
                    <Box>
                      <img src={item.file} alt="file-array" />
                      <span onClick={() => removeItem(index)}><CloseIcon /></span>
                    </Box>
                    : ''
                }
              </Box>
            ))
          }
        </Box>
      }
    </>
  )
}

export default FileUpload