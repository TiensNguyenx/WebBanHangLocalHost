import styles from './HeaderAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function HeaderAdmin() {
    return (
        <div className={cx('containner')}>
            <div><Link to='/admin'>Home Users</Link></div>
            <div><Link to='/admin/createuser'>Create User</Link></div>
            <div><Link to='/admin/product'>Home Products</Link></div>
            <div><Link to='/admin/createproduct'>Create Product</Link></div>
            <div><Link to='/admin/coupons'>Home Coupons</Link></div>
            <div><Link to='/admin/createcoupons'>Create Coupon</Link></div>
            <div><Link to='/admin/order'>Home Orders</Link></div>
            <div><Link to='/admin/payment'>Home Payments</Link></div>
            <div><Link to='/admin/ordermanagement'>Home Order Management</Link></div>
            <div><Link>Log out</Link></div>
        </div>
    );
}

export default HeaderAdmin;