import GalleryFilter from 'components/common/Gallery/GalleryFilter';
import GalleryItems from 'components/common/Gallery/GalleryItems';
import React from 'react'
import { MediaListType } from 'Utils/PropTypes/GalleryItems';
import ThemeModal from '..'


type Props = {
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  getSelectedMediaData: (item: MediaListType) => void;
}

const Gallery: React.FC<Props> = ({isOpen, setOpenModal, getSelectedMediaData}) => {

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const getSelectedItem = (item: MediaListType) => {
    getSelectedMediaData(item)
    setOpenModal(false)
  }
  

  return (
    <ThemeModal title='Modal' maxWidht='md' open={isOpen} handleClose={handleCloseModal}>
      <GalleryFilter />
      <GalleryItems getSelectedItem={getSelectedItem} />
    </ThemeModal>
  )
}

export default Gallery