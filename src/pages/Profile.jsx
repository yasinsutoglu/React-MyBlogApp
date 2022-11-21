import React from 'react';
import {useSelector} from "react-redux";
import avatar from "../assets/imgs/avatar.jpg"

const Profile = () => {

  const {currentUser} = useSelector(state=>state?.auth)
  console.log(currentUser)
  return (
      <div className="card mx-auto profile-div" style={{ marginTop:"10rem", boxShadow:"3px 3px 5px rgba(0,0,0,0.7)" }}>
        <div className="row g-0">
          <div className="col-4">
            <img
              src={currentUser?.photoURL || avatar }
              className="img-fluid rounded-start h-100"
              alt="img"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">Display Name</h5>
              <p className="card-text">{currentUser?.displayName}</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">Email</h5>
              <p className="card-text">{currentUser?.email}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Profile