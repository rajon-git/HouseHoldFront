import React from 'react';
import Header from './Header';
import HeroPage from './HeroPage';
import { useGetFeaturedServicesQuery } from '../../features/auth/apiSlice';
import Service from '../services/Service';
import Spinner from 'react-bootstrap/Spinner';

export default function Homepage({ isAuthenticated }) {
  const { data: servicesData, isError, isLoading, error } = useGetFeaturedServicesQuery(); 
  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <HeroPage />
      <div className="container-xxl mt-5">
        <h2 className="text-center mb-4">Our Featured Services</h2>
        <div className="row justify-content-center">
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <p>Loading services...</p>
            </div>
          ) : isError ? (
            <>
              <p className="text-danger">Error fetching services. Please try again later.</p>
              <p>Error details: {error.message}</p>
            </>
          ) : servicesData.length === 0 ? (
            <p>No services found.</p>
          ) : (
            servicesData.map(service => (
              <div className="col-md-3 mb-4" key={service.id}>
                <Service service={service} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
