import React from 'react';
import { Carousel } from 'react-bootstrap';

const HeroPage = () => {
    return (
      <div className='mt-5'>
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.millcitycleaning.com/wp-content/uploads/2021/07/home-cleaning-services.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Welcome to Our Services</h3>
                    <p>Your satisfaction is our priority.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.southernliving.com/thmb/WFDNaUu60QnIwoz882hzNJpBdrc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1433923860-23d578ea089f409c8cc41475118fb2fa.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Quality Service Guaranteed</h3>
                    <p>We provide top-notch household services.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://rubyredcleaning.com/wp-content/uploads/2023/09/house-cleaning-orlando.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Expert Professionals</h3>
                    <p>Our team is highly skilled and trained.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </div>
    );
};

export default HeroPage;
