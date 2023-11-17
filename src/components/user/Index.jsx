import React, {useState, useEffect} from 'react'
import DashBoard from '../../shared/DashBoard.jsx'
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from'react-toastify';
import Loader from '../loader/Loader.jsx';

export default function Index() {
    const [users, setUsers] = useState([]);
    let [loader, setLoader] = useState(false);
    const getUsers = async () => {
        const {data}= await axios.get('https://crud-users-gold.vercel.app/users');
        setUsers(data.users);
        setLoader(false);
    }

    const deleteUser= async (id) => {
        setLoader(true);
        const {data}= await axios.delete(`https://crud-users-gold.vercel.app/users/${id}`);
        if(data.message =='success'){
            toast.success("User Deleted Successfully");
            getUsers();
            setLoader(false);
        }
        

    }

    useEffect(() => {
        setLoader(true);
        getUsers();
    }, [])

    if(loader){
        return <Loader />
    }

    return (
      
            <DashBoard content={
                <table className="table table-success table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>email</th>
                        <th>password</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length>0?users.map ( (user,index)=>{
                            return(
                                <React.Fragment key={user._id}>
                                    <tr>
                                        <td>{index}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td className='btn btn-danger' onClick={()=>deleteUser(user._id)}>delete</td>
                                        <td className='btn btn-info' ><Link to={`/user/${user._id}`}>details</Link></td>
                                        <td className='btn btn-warning' ><Link to={`/user/edit/${user._id}`}>edits</Link></td>

                                    </tr>
                                </React.Fragment>
                            )
                        }):<h2>no data</h2>
                    }
                </tbody>
                </table>
            } />
      
    )
}
