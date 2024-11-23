import React, { useEffect, useState } from 'react';
import { useGetProfileQuery } from '../../features/auth/apiSlice';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Sidebar from '../dashboard/SideBar';

const ProfileView = () => {
  const location = useLocation();
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const [existingImageURL, setExistingImageURL] = useState('');

  useEffect(() => {
    const updatedProfile = location.state?.profile;
    if (updatedProfile) {
      setExistingImageURL(updatedProfile.profile_image); 
    } else if (profile) {
      setExistingImageURL(profile.profile_image); 
    }
  }, [location.state, profile]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <div className="d-flex vh-100 bg-light">
     
      <Sidebar/>

    
      <div className="container flex-grow-1 p-5">
        <div className="card shadow-lg p-4 border-0 rounded-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ fontSize: '2.5rem', color: '#4a4a4a' }}>
              {(location.state?.profile.first_name || profile.first_name) || 'N/A'}
            </h2>
          </div>

         
          <div className="text-center mb-4">
            {existingImageURL ? (
              <img
                src={existingImageURL}
                alt="Profile"
                className="rounded-circle shadow-lg"
                style={{ width: '160px', height: '160px', objectFit: 'cover', border: '5px solid #fff' }}
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ width: '160px', height: '160px', backgroundColor: '#f1f1f1', borderRadius: '50%', border: '4px solid #ddd' }}>
                <span className="text-muted">No Image</span>
              </div>
            )}
          </div>

         
          <div className="text-end mb-3">
            <Link to="/edit-profile" className="btn btn-outline-primary btn-lg px-4">
              <FaEdit /> Edit Profile
            </Link>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <label className="form-label me-3" style={{ width: '140px', fontWeight: '500' }}>First Name:</label>
                <p className="mb-0" style={{ color: '#555' }}>
                  {(location.state?.profile.first_name || profile.first_name) || 'N/A'}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <label className="form-label me-3" style={{ width: '140px', fontWeight: '500' }}>Last Name:</label>
                <p className="mb-0" style={{ color: '#555' }}>
                  {(location.state?.profile.last_name || profile.last_name) || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <label className="form-label me-3" style={{ width: '140px', fontWeight: '500' }}>Gender:</label>
                <p className="mb-0" style={{ color: '#555' }}>
                  {(location.state?.profile.gender || profile.gender) || 'N/A'}
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <label className="form-label me-3" style={{ width: '140px', fontWeight: '500' }}>Phone:</label>
                <p className="mb-0" style={{ color: '#555' }}>
                  {(location.state?.profile.phone || profile.phone) || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="d-flex align-items-center">
                <label className="form-label me-3" style={{ width: '140px', fontWeight: '500' }}>Address:</label>
                <p className="mb-0" style={{ color: '#555' }}>
                  {(location.state?.profile.address || profile.address) || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
