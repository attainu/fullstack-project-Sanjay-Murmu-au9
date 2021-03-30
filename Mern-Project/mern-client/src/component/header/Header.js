import React, { Fragment, useContext } from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icon/menu.svg'
import {Link} from 'react-router-dom'
import close from './icon/cancel.svg'
import Cart from './icon/cart.svg'
import axios from 'axios'



function Header() {
    const state = useContext(GlobalState)
    console.log(state);
    // console.log(state);
///product ka data with acesstoken mil rha
///user info bhi i am getting
    const [isLogged]=state.userAPI.isLogged
    const [isAdmin]=state.userAPI.isAdmin
    const[cart] = state.userAPI.cart
    const logoutUser = async ()=>{
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        // localStorage.clear()
        //local staorege se data chala jayega 
        // setIsAdmin(false)
        // setIsLogged(false)
        window.location.href='/';
        //user cart mai kch save kiya but login nhi to login krne k baad jo cart mai daala qo save rahega

    }

    const adminRouter =()=>{
        return(
            <Fragment>
                <li><Link to ='/create_product'>Create Products</Link></li>
                <li><Link to ='/category'>Categories</Link></li>

            </Fragment>
        )
    }
    const loggedRouter =()=>{
        return(
            <Fragment>
                <li><Link to ='/history'>History</Link></li>
                <li><Link to ='/' onClick={logoutUser}>Logout</Link></li>

            </Fragment>
        )
    }

    return (
        <header>
        <div className = 'menu'>
            <img src={Menu} alt = "" width="30"/>
        </div>
        <div className='logo'>
            <h1>
                <Link to ='/'>{isAdmin ? 'Admin': 'LENS CART'}</Link>
            </h1>
        </div>
        <ul>
            <li><Link to ='/'>{isAdmin ? 'Products': 'SHOP'}</Link></li>

            {isAdmin && adminRouter()}
            {
                isLogged ? loggedRouter() : <li><Link to ='/login'>Login ✥ Register</Link></li>
            }
            
            <li>
                <img src ={close} alt ="" width="30" className='menu'/>
            </li>

        </ul>
        {
            isAdmin ? ''
        
                :<div className='cart-icon'>
                    <span>{cart.length}</span>
                    <Link to = '/cart'>
                        <img src= {Cart} alt = "" width="30"/>
                    </Link>
                </div>
}
        </header>
    )
}

export default Header
