import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import React from 'react';
import IGalleryItem, { MediaListType } from 'Utils/PropTypes/GalleryItems';


const useStyles = makeStyles({
  galleryItems: {
    maxHeight: '500px',
    overflowY: 'auto',
    padding: '10px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 200px)',
    gridGap: '10px',
    justifyContent: 'center',
    gridAutoFlow: 'dense'

  },
  imageItem: {
    padding: '5px',
    cursor: 'pointer',

    '& p': {
      fontSize: '14px',
      fontWeight: 500,
      color: 'rgba(0,0,0,0.6)',
    }
  }
})

const GalleryItems: React.FC<IGalleryItem> = ({ getSelectedItem }) => {

  const mediaLists: MediaListType[] = [
    {
      url: 'https://images.unsplash.com/photo-1530545124313-ce5e8eae55af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWlyJTIwcGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1559023234-1e773470544f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1503412345334-7d4ca6c34f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1661957173884-901e33146e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1529990131237-cfa5ce9517b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1661281249843-ec407da0c152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1530545124313-ce5e8eae55af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWlyJTIwcGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1559023234-1e773470544f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1503412345334-7d4ca6c34f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1661957173884-901e33146e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1529990131237-cfa5ce9517b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1661281249843-ec407da0c152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1530545124313-ce5e8eae55af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWlyJTIwcGxhbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1559023234-1e773470544f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1503412345334-7d4ca6c34f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1661957173884-901e33146e92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    },
    {
      url: 'https://images.unsplash.com/photo-1529990131237-cfa5ce9517b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFpciUyMHBsYW5lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      name: 'Air plane',
      media_type: 'image'
    }
  ]

  const classes = useStyles();

  const selectImage = (item: MediaListType) => {
    getSelectedItem(item)
  }

  return (
    <Box className={classes.galleryItems} my={5}>
      {
        mediaLists.map((item, index) => (
          <Paper key={`media-${index}`}>
            <Box className={classes.imageItem} onClick={() => { selectImage(item) }}>
              <Image src={item.url} alt={item.name} width={190} height={190} objectFit="contain" />
              <Typography>
                {item.name}
              </Typography>
            </Box>
          </Paper>
        ))
      }
    </Box>
  )
}

export default GalleryItems