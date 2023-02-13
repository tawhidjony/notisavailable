import { Card, CardContent, CardHeader, Paper } from '@mui/material'
import React from 'react'
import { MediaListType } from 'Utils/PropTypes/GalleryItems'
import GalleryFilter from './GalleryFilter'
import GalleryItems from './GalleryItems'

const GalleryWrapper = () => {

  const getSelectedItem = (item: MediaListType) => {
    console.log(item)
  }

  return (
    <Card>
      <CardHeader>Gallery</CardHeader>
      <CardContent>
        <GalleryFilter />
        <GalleryItems getSelectedItem={getSelectedItem} />
      </CardContent>
    </Card>
  )
}

export default GalleryWrapper