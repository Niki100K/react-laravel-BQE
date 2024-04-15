import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage, TermsPage, RequestsPage } from './components'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { Reducer } from './Reducer'

const store = configureStore({
  reducer: Reducer
})

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route path='/requests' element={<RequestsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
