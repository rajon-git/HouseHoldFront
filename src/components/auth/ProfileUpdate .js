import React, { useEffect, useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../dashboard/SideBar';

const ProfileUpdate = () => {
  const { data: profile, error, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile_image: null,
    gender: '',
    phone: '',
    address: '',
    first_name: '',
    last_name: '',
  });
  const [message, setMessage] = useState('');
  const [existingImageURL, setExistingImageURL] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        profile_image: null,
        gender: profile.gender || '',
        phone: profile.phone || '',
        address: profile.address || '',
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
      });
      setExistingImageURL(profile.profile_image);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, profile_image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    if (formData.profile_image) {
      data.append('profile_image', formData.profile_image);
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'profile_image' && value) {
        data.append(key, value);
      }
    });

    try {
      const updatedProfile = await updateProfile(data).unwrap();
      setMessage('Profile updated successfully!');
      navigate('/profile', { state: { profile: updatedProfile } });
    } catch (error) {
      setMessage(error.data?.error || 'Profile update failed.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <>
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar/>
      <div className="container flex-grow-1 p-5">
        <div className="card shadow-lg p-4 border-0 rounded-4">
         
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ fontSize: '2.5rem', color: '#4a4a4a' }}>
              Update Your Profile
            </h2>
          </div>

          
          <div className="text-center mb-4">
            {existingImageURL ? (
              <img
                src={existingImageURL}
                alt="Profile"
                className="rounded-circle shadow-lg"
                style={{ width: '160px', height: '160px', objectFit: 'cover', border: '5px solid #007bff' }}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: '160px',
                  height: '160px',
                  backgroundColor: '#007bff',
                  borderRadius: '50%',
                  border: '4px solid #ddd',
                  color: '#fff',
                  fontSize: '3rem',
                }}
              >
                <i className="fas fa-user" />
              </div>
            )}
          </div>

         
          <form className="row g-4" onSubmit={handleSubmit}>
            {Object.entries(formData).map(([key, value]) => (
              <div className="col-md-6" key={key}>
                <label
                  htmlFor={key}
                  className="form-label"
                  style={{ fontWeight: '500', color: '#555' }}
                >
                  {key.replace('_', ' ').toUpperCase()}
                </label>
                {key === 'profile_image' ? (
                  <input
                    type="file"
                    name={key}
                    id={key}
                    className="form-control"
                    onChange={handleChange}
                    accept="image/*"
                  />
                ) : key === 'gender' ? (
                  <select
                    name={key}
                    id={key}
                    className="form-select"
                    value={value}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <input
                    type={key === 'phone' ? 'tel' : 'text'}
                    name={key}
                    id={key}
                    value={value}
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}

            
            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5"
                style={{ borderRadius: '8px' }}
              >
                Save Profile
              </button>
            </div>

          
            {message && (
              <div className="col-12 text-center mt-3">
                <p className="text-success fw-bold">{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>

    </div></>
  );
};

export default ProfileUpdate;
