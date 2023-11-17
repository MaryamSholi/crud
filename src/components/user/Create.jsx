import React, { useState } from 'react'
import DashBoard from '../../shared/DashBoard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../shared/Input.jsx';
import { validationUserData } from '../../validation/uservalidation.js';
import Loader from '../loader/Loader.jsx';

export default function Create() {

    const inputItems = [
        { id: 'username', title: 'User Name', type: 'text', name: 'name' },
        { id: 'email', title: 'User Email', type: 'email', name: 'email' },
        { id: 'password', title: 'User Password', type: 'password', name: 'password' },

    ];

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
                const { data } = await axios.post("https://crud-users-gold.vercel.app/users", user);
                console.log(data);
                if (data.message == 'success') {
                    toast.success("User Added Successfully");
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

    console.log(validationUserData(user));

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

                        <input type='submit' className='form-control bg-danger text-white ' value='Add User' />
                    </div>
                </form>
            </div>

        } />

    )
}
