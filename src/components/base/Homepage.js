import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroPage from './HeroPage';
import { useGetServicesQuery } from '../../features/auth/apiSlice';
import Service from '../services/Service';
import Spinner from 'react-bootstrap/Spinner'; 

export default function Homepage({ isAuthenticated, handleLogout }) {
  const { data: services, isError, isLoading } = useGetServicesQuery();
  const limitedServices = services ? services.slice(0, 4) : [];

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
      <HeroPage />
      <div className="container-xxl mt-5">
        <h2 className="text-center mb-4">Our Featured Services</h2>
        <div className="row justify-content-center">
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : isError ? (
            <p>Error fetching services. Please try again later.</p>
          ) : limitedServices.length === 0 ? (
            <p>No services found.</p>
          ) : (
            limitedServices.map(service => (
              <div className="col-md-3 mb-4" key={service.id}>
                <Service service={service} />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
