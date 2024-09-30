document.addEventListener("DOMContentLoaded", function() {
    fetch("https://householdserviceapi.onrender.com/category/categories/",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const categoryList = document.getElementById("category-list");
            categoryList.innerHTML = "";  
            data.forEach(category => {
                const categoryLink = document.createElement("a");
                categoryLink.href = "#"; 
                categoryLink.className = "nav-item nav-link";
                categoryLink.textContent = category.name;  
                categoryList.appendChild(categoryLink);
            });
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://householdserviceapi.onrender.com/services/all/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; 

        const products = Array.isArray(data) ? data : data.results || [];

        products.forEach(product => {
            const productHTML = `
                <div class="card product-item border-0 mb-4" style="flex: 0 1 calc(33.333% - 1rem); margin: 0.5rem;">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3">${product.title}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>${product.service_fee ? product.service_fee.toFixed(2) : 'N/A'} BDT</h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <a href="service_Details.html?id=${product.id}" class="btn btn-sm text-dark p-0">
                            <i class="fas fa-eye text-primary mr-1"></i>View Detail
                        </a>
                        <a href="/cart/add/${product.id}/" class="btn btn-sm text-dark p-0">
                            <i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                        </a>
                    </div>
                </div>
            `;
            productList.innerHTML += productHTML;
        });
    })
    .catch(error => console.error('Error fetching products:', error));
});


document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id');
    console.log(serviceId);

    fetch(`https://householdserviceapi.onrender.com/services/all/${serviceId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
      
        const serviceImage = document.getElementById('service-image');
        if (data.image && data.image.length > 0) {
            serviceImage.src = data.image; 
        }

        console.log(data);

        document.getElementById('service-title').innerText = data.title;
        document.getElementById('service-price').innerText = `${data.service_fee.toFixed(2)} BDT`;
        document.getElementById('service-description').innerText = data.description;
        document.getElementById('review-count').innerText = `(${data.reviews_count} Reviews)`;
        
        const ratingDiv = document.getElementById('service-rating');
        ratingDiv.innerHTML = ''; 

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('small');
            star.className = data.rating > i ? 'fas fa-star' : 'far fa-star';
            ratingDiv.appendChild(star);
        }
    })
    .catch(error => console.error('Error fetching data:', error));
});
