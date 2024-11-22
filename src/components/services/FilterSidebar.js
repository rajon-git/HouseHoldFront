import React from 'react';
import '../../App.css';

const FilterSidebar = ({ onFilterChange, categories, filters }) => {
    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        onFilterChange(name, value);
    };

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        onFilterChange('categories', selectedCategory);
    };

    return (
        <div className="col-md-2 sidebar">
            <h4>Filter Options</h4>
            
            <h5>Category</h5>
            <select 
                className="form-control" 
                value={filters.categories} 
                onChange={handleCategoryChange}
            >
                <option value="">Select a Category</option>
                {categories.map(category => (
                    <option key={category.slug} value={category.slug}>
                        {category.title}
                    </option>
                ))}
            </select>
            
            {/* <h5>Availability</h5>
            <ul>
                <li>
                    <input 
                        type="checkbox" 
                        id="available" 
                        checked={filters.available} 
                        onChange={() => onFilterChange('available')} 
                    />
                    <label htmlFor="available">Available</label>
                </li>
            </ul> */}
            
            <h5 className='mt-3'>Price Filters</h5>
            <div className="price-filter">
                <div className="price-input">
                    <label htmlFor="minPrice">Min Price: </label>
                    <input 
                        type="number" 
                        id="minPrice" 
                        name="minPrice" 
                        value={filters.minPrice} 
                        onChange={handlePriceChange}
                        min="0"
                    />
                </div>
                <div className="price-input">
                    <label htmlFor="maxPrice">Max Price: </label>
                    <input 
                        type="number" 
                        id="maxPrice" 
                        name="maxPrice" 
                        value={filters.maxPrice} 
                        onChange={handlePriceChange}
                        min="0"
                    />
                </div>
            </div>
            {/* <div>
                <label htmlFor="minPrice">Min Price: </label>
                <input 
                    type="number" 
                    id="minPrice" 
                    name="minPrice" 
                    value={filters.minPrice} 
                    onChange={handlePriceChange}
                    min="0"
                />
                <br />
                <label htmlFor="maxPrice">Max Price: </label>
                <input 
                    type="number" 
                    id="maxPrice" 
                    name="maxPrice" 
                    value={filters.maxPrice} 
                    onChange={handlePriceChange}
                    min="0"
                />
            </div> */}

            {/* <div>
                <h6>Or</h6>
                <label htmlFor="priceRange">Price Range: </label>
                <input 
                    type="range" 
                    id="priceRange" 
                    name="priceRange" 
                    min="0" 
                    max="10000" 
                    value={filters.priceRange}
                    onChange={(e) => onFilterChange('priceRange', e.target.value)}
                />
                <p>Selected Price: {filters.priceRange} BDT</p>
            </div> */}
        </div>
    );
};

export default FilterSidebar;
