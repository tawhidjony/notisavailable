import { Box, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'

type PageHeaderProps = {
  title: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box className='page-header'>
        <Box px={1.5} py={3}>
          <Typography variant='h4' sx={{ fontSize: '1.6rem' }}>{title}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default PageHeader