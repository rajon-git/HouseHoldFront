import React, { useState, useEffect } from 'react';
import '../../App.css'; 
import Service from './Service';
import { useGetServicesQuery, useGetCategoriuesQuery } from '../../features/auth/apiSlice';
import FilterSidebar from './FilterSidebar';

const Services = () => {
    const { data: services, isError, isLoading } = useGetServicesQuery();
    const { data: categories = [] } = useGetCategoriuesQuery();
    const [filteredServices, setFilteredServices] = useState([]);
    const [filters, setFilters] = useState({ categories: [], available: false });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        if (services) {
            applyFilters(services);
        }
    }, [services, filters, searchTerm, sortOrder]);

    const applyFilters = (services) => {
        let updatedServices = [...services];

        if (filters.available) {
            updatedServices = updatedServices.filter(service => service.is_available);
        }

        if (filters.categories.length > 0) {
            updatedServices = updatedServices.filter(service =>
                filters.categories.includes(service.category.slug)
            );
        }

        if (searchTerm) {
            updatedServices = updatedServices.filter(service =>
                service.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        updatedServices.sort((a, b) => 
            sortOrder === 'asc' ? a.service_fee - b.service_fee : b.service_fee - a.service_fee
        );

        setFilteredServices(updatedServices);
    };

    const handleFilterChange = (filter) => {
        if (filter === 'available') {
            setFilters(prev => ({ ...prev, available: !prev.available }));
        } else {
            setFilters(prev => {
                const categories = prev.categories.includes(filter)
                    ? prev.categories.filter(cat => cat !== filter)
                    : [...prev.categories, filter];
                return { ...prev, categories };
            });
        }
    };
    

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isError) {
        content = <p>Error fetching services.</p>;
    } else if (filteredServices.length === 0) {
        content = <p>No services found.</p>;
    } else {
        content = filteredServices.map(service => (
            <div className="col-md-3 mb-4" key={service.id}>
                <Service service={service} />
            </div>
        ));
    }

    return (
        <div className="container-xxl mt-5">
            <h2 className="text-center mb-4">Our Household Services</h2>
            <div className="row">
                <FilterSidebar onFilterChange={handleFilterChange} categories={categories} filters={filters} />
                <div className="col-md-10">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="form-control mb-3"
                    />
                    <select value={sortOrder} onChange={handleSortChange} className="form-control mb-3">
                        <option value="asc">Sort by Price: Low to High</option>
                        <option value="desc">Sort by Price: High to Low</option>
                    </select>
                    <div className="row justify-content-center">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
