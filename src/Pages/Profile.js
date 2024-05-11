import React, { useEffect, useState } from 'react';
import './mix.css';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const userdata = await fetch(`http://localhost:8000/users/userInfo/${id}`);
        const resData = await userdata.json();
        if (resData) setUserInfo(resData.data);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="wrapper">
      {userInfo && (
        <>
          <div className="left">
            <img src={ userInfo.gender === "male"?"https://i.imgur.com/cMy8V5j.png" : "https://t3.ftcdn.net/jpg/02/65/60/80/360_F_265608067_Nth2hs7Ri68NZBgHHhGuWIxaP6Z1m170.jpg"} alt="user" width="100" />
            <h1>
              {userInfo.firstname} <span> </span> {userInfo.lastname}
            </h1>
            <p>UI Developer</p>
          </div>
          <div className="right">
            <div className="info">
              <h3>Information</h3>
              <div className="info_data">
                <div className="data">
                  <h4>Email</h4>
                  <p>{userInfo.email}</p>
                </div>
                <div className="data">
                  <h4>Gender</h4>
                  <p>{userInfo.gender}</p>
                </div>
                <div className="data">
                  <h4>Location</h4>
                  <p>
                    {userInfo.location.country} <span>,</span> {userInfo.location.subcountry}{' '}
                    <span>,</span> {userInfo.location.name}
                  </p>
                </div>
                <div className="data">
                  <h4>Age</h4>
                  <p>{userInfo.age}</p>
                </div>
                <div className="data">
                  <h4>Date Of Birth</h4>
                  <p>{userInfo.dob}</p>
                </div>
              </div>
            </div>
               
      <div className="projects">
            <h3>Projects</h3>
            <div className="projects_data">
                 <div className="data">
                    <h4>Recent</h4>
                    <p>dont have project right now </p>
                 </div>
                 <div className="data">
                   <h4>Most Viewed</h4>
                    <p>0</p>
              </div>
            </div>
        </div>
      
        <div className="social_media">
            <ul>
              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#"><i class="fab fa-instagram"></i></a></li>
          </ul>
      </div>
    </div>

           
        
        </>
      )}
    </div>
  );
};

export default Profile;
