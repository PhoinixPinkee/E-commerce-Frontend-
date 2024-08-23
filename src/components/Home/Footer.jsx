import React from 'react'

const Footer = () => {
  return 
    
    <footer>
    <div className="footer-container">
        <div className="footer-column">
            <h3>About Us</h3>
            <ul>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
            </ul>
        </div>
        <div className="footer-column">
            <h3>Customer Service</h3>
            <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Order Tracking</a></li>
            </ul>
        </div>
        <div className="footer-column">
            <h3>Follow Us</h3>
            <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
        <div className="footer-column">
            <h3>Subscribe to our Newsletter</h3>
            <form action="#">
                <input type="email" placeholder="Enter your email" required />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    </div>
    <div className="footer-bottom">
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </div>
</footer>
  
}

export default Footer
