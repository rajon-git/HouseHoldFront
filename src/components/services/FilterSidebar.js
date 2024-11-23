import React from 'react';
import '../../App.css';

const FilterSidebar = ({ onFilterChange, categories, filters }) => {
    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        onFilterChange(name, value);
    };
    return (
        <div className="col-md-2 sidebar">
            <h4>Filter Options</h4>
            <h5>Category</h5>
            <ul>
                {categories.map(category => (
                    <li key={category.slug}>
                        <input 
                            type="checkbox" 
                            id={category.slug} 
                            checked={filters.categories.includes(category.slug)} 
                            onChange={() => onFilterChange(category.slug)} 
                        />
                        <label htmlFor={category.slug}>{category.title}</label>
                    </li>
                ))}
            </ul>
            
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
        </div>
    );
};

export default FilterSidebar;