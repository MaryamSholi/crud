import React,{useState, useEffect} from 'react'
import DashBoard from '../../shared/DashBoard'
import axios from 'axios';
import { useNavigate, useParams } from'react-router-dom';
import { validationUserData } from '../../validation/uservalidation.js';
import Loader from '../loader/Loader.jsx';
import { toast } from'react-toastify';
import Input from '../../shared/Input.jsx';

export default function Edit() {
    const navigate = useNavigate();
    let [loader, setLoader] = useState(false);
    let [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });
    let [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });
    const {id} = useParams('id');
    const getUser = async () => {
      const {data} = await axios.get(`https://crud-users-gold.vercel.app/users/${id}`);
      console.log(data.user);
      setUser(data.user);
    }
    useEffect( ()=>{
      getUser();
    }, [])
    let [errorBack, setErrorBack] = useState('');

    const handelData = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    }

    const sendData = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (Object.keys(validationUserData(user)).length > 0) {
            setErrors(validationUserData(user));
        } else {
            try {
                const {data} = await axios.put(`https://crud-users-gold.vercel.app/users/${id}`,user);
                console.log(data);
                if (data.message == 'success') {
                    toast.success("User Updated Successfully");
                    navigate('/user/index');
                    setLoader(false);
                }
            } catch (error) {
                setErrorBack(error.response.data.message);
                setErrors([]);
                setLoader(false);
            }
        }
        if (loader) {
            return (
                <Loader />
            )
        }
    }
    const inputItems = [
        { id: 'username', title: 'User Name', type: 'text', name: 'name', value: user.name },
        { id: 'email', title: 'User Email', type: 'email', name: 'email', value: user.email },
        { id: 'password', title: 'User Password', type: 'password', name: 'password', value: user.password },];
  return (
    <DashBoard content={
        <div className='bg-danger-subtle py-5 px-5' >
            {errorBack && <p className='text text-danger'>{errorBack}</p>}
            <form onSubmit={sendData}>



                <div className="mb-3">
                    {
                        inputItems.map((items) => (
                            <Input {...items} handelData={handelData} errors={errors} key={items.id} />
                        ))}

                    <input type='submit' className='form-control bg-danger text-white ' value='UPDATE' />
                </div>
            </form>
        </div>

    } />
  )
}
