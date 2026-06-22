import React from 'react'
import bookstoreImage from '../assets/vecteezy_library-bookshelves-knowledge-research-study_69181600.jpg'
import { Box } from '@mui/material'

const BookStoreLandingPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}>
        <img
      src={bookstoreImage}
      alt="bookstore"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
    </Box>
  )
}

export default BookStoreLandingPage