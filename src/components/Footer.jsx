import React from 'react'
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone} from "@fortawesome/free-solid-svg-icons";
import { faCopyright} from "@fortawesome/free-regular-svg-icons";
import { faWhatsapp} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className='footer'>
      <div className="footer-content">

          <div className="Col">

              <h2 className='logo'>MegaMart</h2>

              <div className="section">
                    <h3 className="section-title">Contact Us</h3>
                    <div className="contact">
                      
                        <h4><FontAwesomeIcon className='icon' icon={faWhatsapp}></FontAwesomeIcon> Whats App</h4>
                        <span>+1 202-918-2132</span>

                    </div>
                    <div className="contact">
                     
                        <h4> <FontAwesomeIcon className='icon' icon={faPhone}></FontAwesomeIcon> Call Us</h4>
                        <span>+1 202-918-2132</span>
                    </div>
              </div>

              <div className="section">
                    <h3 className="section-title">Download App</h3>
                    <div className="images">
                        <img src="/downloadAppstore.png" alt="" className='image-download' />
                        <img src="/googlePlayLogo.png" alt="" className='image-download' />
                    </div>
              </div>

          </div>

          <div className="Col">
              <div className="title">Most Popular Categories</div>
              <ul>
                <li>Staples</li>
                <li>Beverages</li>
                <li>Personal Care</li>
                <li>Home Care</li>
                <li>Baby Care</li>
                <li>Vegetables & Fruits</li>
                <li>Snacks & Foods</li>
                <li>Dairy & Bakery</li>
              </ul>
          </div>

          <div className="Col">
              <div className="title">Customer Services</div>
              <ul>
                <li>About Us</li>
                <li>Terms & Conditions</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li>E-waste Policy</li>
                <li>Cancellation & Return Policy</li>
              </ul>
          </div>

      </div>
      <div className="copy-right">
          <FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon>
          <span>2024 All rights reserved. Reliance Retail Ltd</span>
      </div>

    </div>
  )
}
