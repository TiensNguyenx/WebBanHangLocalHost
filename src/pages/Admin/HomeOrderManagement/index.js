import HeaderAdmin from "~/components/Layout/components/HeaderAdmin";

import { UserContext } from "~/context/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeOrderManagement() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/')
        }
    }, [])
    return (
        <div>
            <HeaderAdmin />
        </div>
    );
}

export default HomeOrderManagement;