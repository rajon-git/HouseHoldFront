import React, { useEffect, useState } from 'react';
import { useGetProfileQuery } from '../../features/auth/apiSlice';
import { Link, useLocation } from 'react-router-dom'; 
import { FaEdit } from 'react-icons/fa'; 

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
    <div className="container mt-5" style={{marginBottom: '180px'}}>
      <h2 className="text-center mb-4">Profile</h2>
      <div className="text-center mb-4">
        {existingImageURL && (
          <img
            src={existingImageURL}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        )}
      </div>

      <div className="text-end mb-3">
        <Link to="/edit-profile" className="btn btn-outline-secondary">
          <FaEdit /> Edit Profile
        </Link>
      </div>

      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-2" style={{ width: '100px' }}>First Name:</label>
        <p className="mb-0">{(location.state?.profile.first_name || profile.first_name) || 'N/A'}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-2" style={{ width: '100px' }}>Last Name:</label>
        <p className="mb-0">{(location.state?.profile.last_name || profile.last_name) || 'N/A'}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-2" style={{ width: '100px' }}>Gender:</label>
        <p className="mb-0">{(location.state?.profile.gender || profile.gender) || 'N/A'}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-2" style={{ width: '100px' }}>Phone:</label>
        <p className="mb-0">{(location.state?.profile.phone || profile.phone) || 'N/A'}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <label className="form-label me-2" style={{ width: '100px' }}>Address:</label>
        <p className="mb-0">{(location.state?.profile.address || profile.address) || 'N/A'}</p>
      </div>
    </div>
  );
};

export default ProfileView;
