import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useToken from '../../../hooks/useToken';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if (token) {
        navigate('/');
    }

    const handleSignUp = (data) => {




        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                const userInfo = {
                    displayName: data.name,
                    department: data.department
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.department);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    const saveUser = (name, email, department) => {
        const user = { name, email, department };
        fetch('https://assignment-twelfth-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            })
    }

    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">

                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" alt='' src="https://cdn.learnwoo.com/wp-content/uploads/2019/11/image1-5.jpg" />
                    </div>

                    <div className="md:w-1/2 px-8 md:px-16">
                        <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>

                        <form onSubmit={handleSubmit(handleSignUp)}>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Name</span></label>
                                <input type="text" {...register("name", {
                                    required: "Name is Required"
                                })} className="input input-bordered w-full max-w-xs" />
                                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                            </div>

                            {/* <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Option</span></label>
                                <select
                                    {...register('option')}
                                    className="select select-bordered w-full max-w-xs">
                                    <option>Buyer</option>
                                    <option> Seller</option>
                                </select>
                                {errors.option && <p className='text-red-500'>{errors.option.message}</p>}
                            </div> */}

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Department</span></label>
                                <input type="text" {...register("department", {
                                    required: "Department is required"
                                })} className="input input-bordered w-full max-w-xs" />
                                {errors.department && <p className='text-red-500'>{errors.department.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Email</span></label>
                                <input type="email" {...register("email", {
                                    required: true
                                })} className="input input-bordered w-full max-w-xs" />
                                {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Password</span></label>
                                <input type="password" {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be 6 characters long" },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                                })} className="input input-bordered w-full max-w-xs" />
                                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                            </div>

                            <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                            {signUpError && <p className='text-red-600'>{signUpError}</p>}
                        </form>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>Do you have an account?</p>
                            <Link to='/login'> <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Log In</button></Link>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Register;