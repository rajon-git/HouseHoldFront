import React, { useEffect, useState } from 'react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../features/auth/apiSlice';
import { useNavigate } from 'react-router-dom';

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
      navigate('/profile', { state: { profile: updatedProfile } }); // Pass updated profile as state
    } catch (error) {
      setMessage(error.data?.error || 'Profile update failed.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <div className="container" style={{ marginTop: '70px', marginBottom: '10px' }}>
      <h2 className="text-center mb-4">Update Profile</h2>
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
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {Object.entries(formData).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label htmlFor={key} className="form-label">{key.replace('_', ' ').toUpperCase()}</label>
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
                <option value="other">Other</option>
              </select>
            ) : (
              <input
                type={key === 'phone' ? 'tel' : 'text'}
                name={key}
                id={key}
                className="form-control"
                value={value}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">Save Profile</button>
        </div>
        {message && <p className="mt-3 text-success text-center">{message}</p>}
      </form>
    </div>
  );
};

export default ProfileUpdate;
