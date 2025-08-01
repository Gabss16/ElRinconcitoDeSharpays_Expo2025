import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

import "../styles/Profile.css"

import useDataEmployee from "../components/employee/hook/useDataEmployee.jsx";
import RegisterEmployee from "../components/employee/registerEmployee.jsx";

const Profile = () => {

    const { user } = useAuth();
    const data = useDataEmployee();

    useEffect(() => {
        if (user) {
            data.fetchEmployeesById(user?.id);
        }
    }, [user?.id]);


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-10">

                        <div
                            className="mt-4 container-profile"
                            style={{
                                borderRadius: 25,
                                padding: '20px',
                                height: '95vh',
                                width: '90%',
                                boxShadow: '0 1px 8px 10px rgba(0, 0, 0, 0.1)'
                            }}>
                            <h1 className="fw-bold p-2">Perfil</h1>
                            <RegisterEmployee
                                {...data} id={user?.id} fromProfile={true} />
                            <div className="gif-animation-profile" style={{
                                marginTop: '20px',
                                textAlign: 'center',
                                backgroundColor: '#fff'
                            }}>
                                <img
                                    src="https://cdn.dribbble.com/userupload/5509318/file/original-9fcb4efd061af4c6eb3c0b056bda48d1.gif"
                                    style={{ width: '40%', opacity: 0.9 }}
                                />
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;