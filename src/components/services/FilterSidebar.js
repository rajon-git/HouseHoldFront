import React from 'react';
import '../../App.css';

const FilterSidebar = ({ onFilterChange, categories, filters }) => {
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
            <h5>Availability</h5>
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
            </ul>
        </div>
    );
};

export default FilterSidebar;
