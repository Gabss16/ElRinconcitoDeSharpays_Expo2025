import React from "react";
import CardOrders from "../components/CardOrders.jsx";
import CardPersonalInformation from "../components/CardPersonalInformation.jsx";
import CardUbication from "../components/CardUbication.jsx";
import CardImage from "../components/CardImageProfile.jsx";
const Profile = () => {
  return (
    <div className="profile-container d-flex flex-column min-vh-100">
      <main className="flex-grow-1 d-flex justify-content-start">
 
           <CardOrders/>
           <CardUbication/>
           <CardPersonalInformation/>
            <CardImage/>
      </main>
    </div>
  );
};

export default Profile;
