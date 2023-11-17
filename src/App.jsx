import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Index from './components/user/Index.jsx'
import Details from './components/user/Details.jsx'
import Create from './components/user/Create.jsx'
import Edit from './components/user/Edit.jsx'

export default function App() {
  return (
    <Routes>
       <Route path='/'/>
       <Route path='*' element={<div className='pt-5'><h2 className='text-center bg-danger py-2 text-white'>Page Not Found</h2></div>}/>
       <Route path='/user/index' element={<Index />}/>
       <Route path='/user/:id' element={<Details />}/>
       <Route path='/user/create' element={<Create />}/>
       <Route path='/user/edit/:id' element={<Edit />}/>




    </Routes>

  )
}
