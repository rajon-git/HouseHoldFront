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
      navigate('/profile', { state: { profile: updatedProfile } });
    } catch (error) {
      setMessage(error.data?.error || 'Profile update failed.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '40px auto', 
      padding: '30px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '12px', 
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' 
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontSize: '2rem', 
        color: '#343a40', 
        marginBottom: '30px' 
      }}>
        Update Your Profile
      </h2>

      <div style={{
        textAlign: 'center', 
        marginBottom: '20px'
      }}>
        {existingImageURL ? (
          <img
            src={existingImageURL}
            alt="Profile"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '5px solid #007bff',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        ) : (
          <div
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: '#007bff',
              borderRadius: '50%',
              color: '#fff',
              fontSize: '3rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            }}
          >
            <i className="fas fa-user" />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label
              htmlFor={key}
              style={{
                display: 'block',
                fontSize: '1rem',
                color: '#495057',
                marginBottom: '8px',
                fontWeight: 'bold',
              }}
            >
              {key.replace('_', ' ').toUpperCase()}
            </label>
            {key === 'profile_image' ? (
              <input
                type="file"
                name={key}
                id={key}
                style={{
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '2px solid #ced4da',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s',
                  width: '100%',
                }}
                onChange={handleChange}
                accept="image/*"
              />
            ) : key === 'gender' ? (
              <select
                name={key}
                id={key}
                style={{
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '2px solid #ced4da',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s',
                  width: '100%',
                }}
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
                value={value}
                onChange={handleChange}
                style={{
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: '2px solid #ced4da',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s',
                  width: '100%',
                }}
                required
              />
            )}
          </div>
        ))}
        <div style={{
          gridColumn: 'span 2',
          textAlign: 'center'
        }}>
          <button
            type="submit"
            style={{
              padding: '12px 25px',
              backgroundColor: '#007bff',
              color: '#fff',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            Save Profile
          </button>
        </div>
        {message && (
          <p style={{
            marginTop: '20px',
            color: '#28a745',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProfileUpdate;
