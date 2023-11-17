import React, {useState, useEffect} from 'react'
import DashBoard from '../../shared/DashBoard'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Details() {
    const [user, setUser] = useState({});
    const {id} = useParams('id');
    const getUser = async () => {
        const {data} = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`);
        setUser(data.user);
    }
    useEffect(() => {
        getUser();
    }, [])

  return (
    <DashBoard content={
        <div className='py-5'>
          <h2 className='text-center bg-success text-white py-2'>Details For {user.name}</h2>
        </div>
    }/>
     
  )
}
