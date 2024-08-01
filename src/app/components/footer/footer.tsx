import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white mt-auto py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>About Us</h5>
                        <p>We are a fintech company dedicated to providing the best financial services.</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <ul className="list-unstyled">
                            <li>Email: support@fintech.com</li>
                            <li>Phone: +1 (800) 123-4567</li>
                            <li>Address: 123 Fintech Ave, Financial District, City</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white">Facebook</a></li>
                            <li><a href="#" className="text-white">Twitter</a></li>
                            <li><a href="#" className="text-white">LinkedIn</a></li>
                            <li><a href="#" className="text-white">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <p>&copy; 2024 Fintech. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
