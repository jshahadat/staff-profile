import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const UpdateStaf = () => {
    const storedTodo = useLoaderData();
    const [todo, setTodo] = useState(storedTodo);

    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = "c1dadbc894ea0599486c64901c3740cb";
    const navigate = useNavigate();

    const handleAddDoctor = data => {
        // data.preventDefault();
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const product = {
                        displayName: data?.name,
                        email: user?.email,
                        price: data.price,
                        quantity: data.quantity,
                        img: imgData.data.url,
                    }

                    fetch(`https://mockup-todos-server.vercel.app/${storedTodo._id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            // authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(todo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                toast('Todo Updated')
                            }
                        })
                }
            })
    }





    return (
        <div className='flex'>
            <div className='w-full'>
                <div className='flex justify-center'>
                    <div className="relative w-full max-w-lg mb-12 mt-12" >
                        <div className="absolute lg:top-0 top-0 lg:left-2 left-1 lg:w-72 w-72 lg:h-72 h-60  rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" ></div >
                        <div className="absolute lg:top-0 lg:left-72 left-12 w-72  lg:h-72 h-60 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" ></div >
                        <div className="absolute lg:-bottom-8 lg:left-40 top-56 left-20 w-72 lg:h-72 h-60 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" ></div >
                        <div className="relative space-y-2" >
                            <div>
                                <form onSubmit={handleSubmit(handleAddDoctor)}>
                                    <div class="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="uppercase tracking-wide text-black text-xs font-bold mb-2"> <span className="label-text">ADD IMAGE</span></label>
                                            <input type="file" {...register("image", {
                                                required: "Photo is Required"
                                            })} className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" />
                                            {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                                        </div>
                                    </div>
                                    <div className='-mx-3 md:flex mb-6'>
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="uppercase tracking-wide text-black text-xs font-bold mb-2"> <span className="label-text border-none">QUANTITY</span></label>
                                            <input type="Number"  {...register("quantity", {
                                                required: "Quantity is Required"

                                            })} className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" />
                                            {errors.quantity && <p className='text-red-500'>{errors.quantity.message}</p>}
                                        </div>
                                        <div className="md:w-1/2 px-3">
                                            <label className="uppercase tracking-wide text-black text-xs font-bold mb-2"> <span className="label-text">PRICE</span></label>
                                            <input type="number" {...register("price", {
                                                required: "Price is Required"
                                            })} className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" />
                                            {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                                        </div>
                                    </div>
                                    <div className='-mx-3 md:flex mb-2'>
                                    </div>
                                    <input className='btn font-bold text-white btn-primary w-full mt-4' value="update" type="submit" />
                                </form>
                            </div >
                        </div >
                        <Toaster />
                    </div >
                </div >
            </div >
        </div>
    );
};

export default UpdateStaf;