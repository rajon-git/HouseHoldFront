import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../App.css'; 
import Service from './Service';
import { useGetServicesQuery, useGetCategoriesQuery } from '../../features/auth/apiSlice';
import FilterSidebar from './FilterSidebar';
import Pagination from './Pagination'; 

const Services = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 1;
    const { data: serviceData = {}, isError, isLoading, error } = useGetServicesQuery({ page });
    const { data: categories = [] } = useGetCategoriesQuery();
    const [filteredServices, setFilteredServices] = useState([]);
    const [filters, setFilters] = useState({ 
        categories: [], 
        available: false, 
        minPrice: 0, 
        maxPrice: 10000, 
        priceRange: 10000 
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const searchQuery = queryParams.get('search') || '';

    const services = Array.isArray(serviceData.results) ? serviceData.results : [];
    const totalPages = Math.max(1, Math.ceil(serviceData.count / 8));

    const applyFilters = useCallback((services) => {
        let updatedServices = [...services];

        // Filter by availability
        if (filters.available) {
            updatedServices = updatedServices.filter(service => service.is_available);
        }

        // Filter by selected categories
        if (filters.categories.length > 0) {
            updatedServices = updatedServices.filter(service =>
                filters.categories.includes(service.category.slug)
            );
        }

        // Filter by price (min and max or price range)
        if (filters.minPrice || filters.maxPrice) {
            updatedServices = updatedServices.filter(service =>
                service.service_fee >= filters.minPrice && service.service_fee <= filters.maxPrice
            );
        }

        // Filter by price range (if used)
        if (filters.priceRange) {
            updatedServices = updatedServices.filter(service =>
                service.service_fee <= filters.priceRange
            );
        }

        // Search filtering
        if (searchTerm || searchQuery) {
            updatedServices = updatedServices.filter(service =>
                service.title.toLowerCase().includes((searchTerm || searchQuery).toLowerCase())
            );
        }

        // Sort by price
        updatedServices.sort((a, b) =>
            sortOrder === 'asc' ? a.service_fee - b.service_fee : b.service_fee - a.service_fee
        );

        return updatedServices;
    }, [filters, searchTerm, searchQuery, sortOrder]);

    useEffect(() => {
        if (Array.isArray(services)) {
            const newFilteredServices = applyFilters(services);
            setFilteredServices(newFilteredServices);
        }
    }, [services, applyFilters]); 

    const handleFilterChange = (filter, value) => {
        if (filter === 'available') {
            setFilters(prev => ({ ...prev, available: !prev.available }));
        } else if (filter === 'minPrice' || filter === 'maxPrice') {
            setFilters(prev => ({
                ...prev,
                [filter]: value
            }));
        } else if (filter === 'priceRange') {
            setFilters(prev => ({
                ...prev,
                priceRange: value
            }));
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

    const handlePageChange = (newPage) => {
        navigate(`/services/?page=${newPage}`);
    };

    let content;

    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isError) {
        content = <p>Error fetching services: {error.message}</p>;
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
        <div className="container-xxl" style={{ marginTop: '70px' }}>
            <h2 className="text-center mb-4">Our Household Services</h2>
            <div className="row">
                <FilterSidebar 
                    onFilterChange={handleFilterChange} 
                    categories={categories} 
                    filters={filters} 
                />
                <div className="col-md-10">
                    <select 
                        value={sortOrder} 
                        onChange={handleSortChange} 
                        className="form-control mb-3"
                    >
                        <option value="asc">Sort by Price: Low to High</option>
                        <option value="desc">Sort by Price: High to Low</option>
                    </select>
                    <div className="row justify-content-center">
                        {content}
                    </div>
                    <Pagination 
                        currentPage={page} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Services;
