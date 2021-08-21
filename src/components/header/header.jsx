import React from 'react';
import {Link} from 'react-router-dom';
import './header.scss';
import {ReactComponent as Logo} from '../../assests/crown.svg';
import {auth} from '../../firebase/firebase.util';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon'
import CartDropdown from '../cart/cart';
import {selectCartHidden } from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

const Header = ({currentUser,hidden}) => (
    <div className="header">
     <Link className='logo-container' to="/">
     <Logo className="logo"/>
     </Link>
     {/* other links */}
     <div className="options">
         <Link className="option" to='/shop'>
          SHOP
         </Link>
         <Link className="option" to='/shop'>
         CONTACT
         </Link>
         {
         currentUser ?
         <div className="option" onClick={()=> auth.signOut()}>SIGN OUT</div>
         :(
         <Link className="option" to='/signin'>
            SIGN IN
         </Link>
         )}
         <CartIcon/>
     </div>
     {
       hidden ? null : <CartDropdown/>
     }
    </div>
);
 
const mapStateToProps =createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);