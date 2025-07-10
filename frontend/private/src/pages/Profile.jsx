import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

import useDataEmployee from "../components/employee/hook/useDataEmployee.jsx";
import RegisterEmployee from "../components/employee/registerEmployee.jsx";

const Profile = () => {

    const { user } = useAuth();
    const data = useDataEmployee();

    useEffect(() => {
        if (user) {
            data.setName(user.name ?? '');
            data.setEmail(user.email ?? '');
            data.setImageUrl(user.image ?? '');
        }
    }, [user?.id]);


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">

                        <div
                            className="mt-5"
                            style={{
                                borderRadius: 25,
                                padding: '20px',
                                height: '90vh',
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                            }}>
                            <RegisterEmployee
                                {...data} id={user?.id} fromProfile={true}/>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;