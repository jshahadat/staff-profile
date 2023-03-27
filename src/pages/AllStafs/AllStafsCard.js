import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const AllStafsCard = ({ allTodo }) => {

    const { user } = useContext(AuthContext);
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl mb-16">
                <figure><img src={allTodo.img} alt="Shoes" /></figure>
                <div className="card-body ">
                    <h2 className="card-title">
                        {/* Shoes! */}
                        {
                            user.email ?
                                <><Link to={allTodo._id}><button><div className="badge badge-secondary">Edit</div></button></Link></>
                                :
                                <><Link to="/login"><button><div className="badge badge-secondary">Edit</div></button></Link></>
                        }
                    </h2>
                    {/* <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                    </div> */}
                    <h1>Price:{allTodo.price}</h1>
                    <h1>Quantity:{allTodo.quantity} </h1>
                </div>
            </div>
        </div>
    );
};

export default AllStafsCard;