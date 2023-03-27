import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import './Navbar.css'

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }



    const menuItems = <React.Fragment>
        <li className='text-black'><Link to="/">Dashboard</Link></li>
        <li><Link to='/addstaf'>Add Staff</Link></li>
        {
            user?.uid ?
                <>
                    <li className='text-black'><button onClick={handleLogOut}>Sign out</button></li>
                </>
                :
                <li className='text-black'><Link to="/login">Login</Link></li>
        }
    </React.Fragment>


    return (



        <div className=''>
            <div className="lg:pl-20 lg:pr-20 navbar bg-stone-200 flex justify-between">
                <div className="navbar-start">
                    <div className="dropdown rounded bg-stone-600">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={1} className="menu menu-compact text-black dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className='text-black'><Link to="/">Dashboard</Link></li>
                            <li><Link to='/addstaf'>Add Staff</Link></li>
                            {
                                user?.uid ?
                                    <>
                                        <li><button onClick={handleLogOut}>Sign out</button></li>
                                    </>
                                    :
                                    <li><Link to="/login">Login</Link></li>
                            }
                        </ul>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Navbar;