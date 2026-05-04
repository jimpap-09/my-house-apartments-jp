import { Route, Routes } from 'react-router-dom'
import { PageLayout } from './layouts/PageLayout'
import { ApartmentDetailsPage } from './pages/ApartmentDetailsPage'
import { ApartmentsListPage } from './pages/ApartmentsListPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<ApartmentsListPage />} />
        <Route path="apartments/:apartmentId" element={<ApartmentDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
