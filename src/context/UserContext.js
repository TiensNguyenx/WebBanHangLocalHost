import React from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const UserContext = React.createContext({ email: '', auth: false });

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ email: '', auth: false });
    const [lengthCart, setLengthCart] = React.useState(0);

    const loginContext = (token) => {

        localStorage.setItem('token', token)
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.payload?.id) {
                fetch(`http://localhost:3002/api/user/get-detail/${decoded.payload.id}`, {
                    headers: {
                        token: `Beare ${token}`
                    },

                })
                    .then((res) => {
                        if (res.status === 200) {
                            return res.json()
                        }
                    }

                    )
                    .then((data) => {

                        if (data) {
                            setUser((user) => ({
                                email: data.data.email,
                                auth: true,
                                name: data.data.name,
                                id: data.data._id,
                                phone: data.data.phone,
                                isAdmin: data.data.isAdmin,
                                isAuthEmail: data.data.isAuth
                            }));


                            localStorage.setItem('userId', data.data._id)
                            localStorage.setItem('isAdmin', data.data.isAdmin)
                        }
                    })
            }
        }
    };
    const getLengthCartContext = async () => {
        if (user.id) {
            axios.get(`http://localhost:3002/api/cart/get-details-cart/${user.id}`)
                .then((res) => {
                    if (res.data.status === 'success') {
                        setLengthCart(res.data.data.totalItems)
                    }
                })
        }
    }
    const decreaseLength = () => {
        setLengthCart(lengthCart - 1)
    }
    const increaseLength = () => {
        setLengthCart(lengthCart + 1)
    }
    const resetLength = () => {
        setLengthCart(0)
    }
    const handleAddCartContext = (idUser, idProduct) => {
        return axios.post(`http://localhost:3002/api/cart/add-to-cart`, {
            newCart: {
                userID: idUser,
                productID: idProduct,
            }
        })
    }
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('idPayment');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        setUser((user) => ({
            email: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logout, setUser, handleAddCartContext, lengthCart, getLengthCartContext, decreaseLength, increaseLength, resetLength }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };