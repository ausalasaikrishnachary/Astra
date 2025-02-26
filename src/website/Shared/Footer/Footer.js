import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, TextField, Button, Card, Grid, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, YouTube, Twitter } from "@mui/icons-material";
import "./Footer.css";
import Logo from '../../Images/Logo File.png';
import Divider from '@mui/material/Divider';

function Footer() {
  return (
    <footer className="footer">
      <hr style={{ width: '100%', margin: 0, border: 'none', borderTop: '1px solid #e0e0e0' }} />

      {/* Container that holds both left and right sections side-by-side */}
      <div className="footer-content">

        {/* Left side: Logo, addresses, email, socials */}
        <div className="footer-left" style={{display:"flex"}}>
          {/* <h2 className="footer-logo">ASTRA</h2> */}
          <img
                    src={Logo}
                    alt="logo"
                    style={{
                      height: '90px',
                      width: 'auto',
                      maxWidth: '150px',
                      transform: 'scale(2.8)',
                      // marginLeft:"10%"
                    }}
                  />

          <p className="footer-address">
            <span className="add">Address</span><br />
            300 Park Avenue, 16th Floor, New York,<br />
           NY 10022, 161 North Green Street,<br />
             4th Floor, Chicago, IL 60607.<br />
          investments@Astra.com</p>
        </div>

        {/* Right side: Links in columns */}
        <div className="footer-right">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Properties</a></li>
              <li><a href="#">Contct Us</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Astra Funds</a></li>
              <li><a href="#">Deal-by-Deal</a></li>
              <li><a href="#">Secondary Market</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Properties</h4>
            <ul>
              <li><a href="#">The Astra Difference</a></li>
              <li><a href="#">Acquisitions Lifecycle</a></li>
              <li><a href="#">Asset Management Approach</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>FAQ</h4>
            <ul>
              <li><a href="#">Insights</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer-socials">
      <IconButton color="primary">
          <Facebook />
        </IconButton>
        <IconButton sx={{ color: "#E4405F" }}>
          <Instagram />
        </IconButton>
        <IconButton color="primary">
          <LinkedIn />
        </IconButton>
        <IconButton sx={{ color: "#FF0000" }}>
          <YouTube />
        </IconButton>
        <IconButton color="primary">
          <Twitter />
        </IconButton>
      </div>
      <hr/>
      <section className="last-footer text-center" style={{textAlign:"center"}}>
          
         
          <div className="footer">
            <span className="float-left pr-2">
              © {new Date().getFullYear()} All rights reserved 
            </span>
            <span className="float-left">
              {/* <i className="fas fa-heart" aria-hidden="true"></i>  */}
              <FontAwesomeIcon  style={{color:'red', paddingLeft:'5px', paddingRight:'5px'}} icon={faHeart} aria-hidden="true" />
              by {" "}
              <a href="https://iiiqbets.com" target="_blank" rel="noopener noreferrer">
                iiiQBets
              </a>
            </span>
          </div>
</section>
    </footer>
  );
}

export default Footer;
