import React from "react";
import CardOrders from "../components/CardOrders.jsx";
import CardPersonalInformation from "../components/CardPersonalInformation.jsx";


const Profile = () => {
  return (
    <div className="profile-container d-flex flex-column min-vh-100">
      <main className="flex-grow-1 d-flex justify-content-start">
        <CardOrders />
        <CardPersonalInformation/>
      </main>
    </div>
  );
};

export default Profile;
