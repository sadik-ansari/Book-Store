import { useState } from 'react'
import './App.css'
import BookForm from './components/BookUploadForm'
import BookUploadForm from './components/BookUploadForm'
import BookList from './components/BookList'
import LandingPage from './components/LandingPage'
import { Route, Routes } from 'react-router'
import ViewBook from './components/ViewBook'
import ProtectedRoute from './components/ProtectedRoute'



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />

        <Route element={<ProtectedRoute />} >
          <Route path='/books' element={<BookList />} />
          <Route path='/books/name' element={<ViewBook />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
