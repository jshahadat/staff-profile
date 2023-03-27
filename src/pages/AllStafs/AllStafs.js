import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AllStafsCard from './AllStafsCard';

const AllStafs = () => {
    const [todos, setTodos] = useState([])
    const [allTodos, setAllTodos] = useState([])
    useEffect(() => {
        fetch("https://mockup-todos-server.vercel.app/todos")
            .then(res => res.json())
            .then(data => setAllTodos(data))
    }, [])
    return (
        <div>
            <div className='lg:pr-20 lg:pl-20 ml-3 mr-3'>
                <h1 className='font-extrabold text-2xl text-center mb-6'> ALL STAFF</h1>
                <div className="overflow-x-auto">
                    <div className='lg:grid lg:grid-cols-3 grid-cols-1'>
                        {
                            allTodos.map(allTodo => <AllStafsCard
                                key={allTodo._id}
                                allTodo={allTodo}
                            ></AllStafsCard>)
                        }

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AllStafs;