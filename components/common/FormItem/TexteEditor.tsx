import React, { useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Gallery from '../Modal/Gallery';
import { MediaListType } from 'Utils/PropTypes/GalleryItems';
import { FormHelperText } from '@mui/material';
const ReactQuill = dynamic(
  async () => {
    //@ts-ignore
    const { default: RQ } = await import("react-quill");
    //@ts-ignore
    return ({ forwardedRef, ...props }) => <RQ id='quill' key={'react-quill-001122'} ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);


type Props = {
  watch: any;
  setValue: any;
  errors: any
}


const TexteEditor: React.FC<Props> = ({watch, setValue, errors}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const quillRef = useRef<any>(null)

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleModalOpen()
  }

  const getSelectedMediaData = (item: MediaListType) => {
    const editor = quillRef?.current?.getEditor();
    const range = editor.getSelection();
    editor.insertEmbed(range.index, "image", item.url, 'user');
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ font: [] }, { size: [] }, { header: [1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        [{ direction: "rtl" }, { align: [] }],
        ["link", "image", "clean"]
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const onEditorStateChange = (editorState: string) => {
    setValue("content", editorState);
  };

  const editorContent = watch("content");

  return (
    <>
      <ReactQuill 
        //@ts-ignore
        forwardedRef={quillRef}
        value={editorContent}
        onChange={onEditorStateChange}
        modules={modules}
      />
      {errors?.message && <FormHelperText>{errors?.message}</FormHelperText>}
      <Gallery isOpen={openModal} getSelectedMediaData={getSelectedMediaData} setOpenModal={setOpenModal} />
    </>
  )
}

export default React.memo(TexteEditor)