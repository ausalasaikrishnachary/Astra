import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, TextField, Button, Card, Grid, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, YouTube, Twitter } from "@mui/icons-material";
import "./Footer.css";
import Logo from '../../Images/Logo File.png';
import Divider from '@mui/material/Divider';
import { Container, Navbar, Nav, Row, Col, Form, } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (

    <footer className="footer-custom">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <img
              src="http://175.29.21.7:84/static/media/Logo%20File.78893cdbe11c7dfa5f45.png"
              alt="Astra Logo"
              className="footer-logo"
            />
            <p className="mt-3">Premium commercial real estate investments for discerning investors. Discover exceptional opportunities in prime locations nationwide.</p>
            <div className="social-links mt-3">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <div className="footer-links">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Properties</a></li>
                <li><a href="#">Why Astra</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </Col>
          <Col md={2} className="mb-4 mb-md-0">
            <div className="footer-links">
              <h5>Properties</h5>
              <ul>
                <li><a href="#">Warehouses</a></li>
                <li><a href="#">Office Spaces</a></li>
                <li><a href="#">Retail</a></li>
                <li><a href="#">Industrial</a></li>
                <li><a href="#">Mixed Use</a></li>
              </ul>
            </div>
          </Col>
          <Col md={4}>
            <div className="footer-links">
              <h5>Newsletter</h5>
              <p>Subscribe to our newsletter for the latest property listings and market insights.</p>
              <Form className="mt-3">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: 0 }}>
                        <Form.Control
                          type="email"
                          placeholder="Your Email"
                          style={{
                            borderRadius: '4px 0 0 4px',
                            borderRight: 'none',
                            width: '100%'
                          }}
                        />
                      </td>
                      <td style={{ width: '1%', padding: 0 }}>
                        <Button
                          variant="light"
                          type="submit"
                          style={{
                            borderRadius: '0 4px 4px 0',
                            whiteSpace: 'nowrap',
                            marginTop: '-20px',
                            border: '1px solid #21a0ea'
                          }}
                          className="newsletter-btn"
                        >
                          Subscribe
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form>
            </div>
          </Col>
        </Row>
        <hr className="mt-4 mb-4 footer-divider" />
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">&copy; 2025 Astra Commercial Real Estate. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">
              <a href="#" className="text-white me-3">Privacy Policy</a>
              <a href="#" className="text-white me-3">Terms of Service</a>
              <a href="#" className="text-white">Sitemap</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>

    //     <footer className="footer">
    //       <hr style={{ width: '100%', margin: 0, border: 'none', borderTop: '1px solid #e0e0e0' }} />

    //       {/* Container that holds both left and right sections side-by-side */}
    //       <div className="footer-content">

    //         {/* Left side: Logo, addresses, email, socials */}
    //         <div className="footer-left" style={{display:"flex"}}>
    //           {/* <h2 className="footer-logo">ASTRA</h2> */}
    //           <img
    //                     src={Logo}
    //                     alt="logo"
    //                     style={{
    //                       height: '90px',
    //                       width: 'auto',
    //                       maxWidth: '150px',
    //                       transform: 'scale(2.8)',
    //                       // marginLeft:"10%"
    //                     }}
    //                   />

    //           <p className="footer-address">
    //             <span className="add">Address</span><br />
    //             300 Park Avenue, 16th Floor, New York,<br />
    //            NY 10022, 161 North Green Street,<br />
    //              4th Floor, Chicago, IL 60607.<br />
    //           investments@Astra.com</p>
    //         </div>

    //         {/* Right side: Links in columns */}
    //         <div className="footer-right">
    //           <div className="footer-column">
    //             <h4>Company</h4>
    //             <ul>
    //               <li><a href="#">About Us</a></li>
    //               <li><a href="#">Properties</a></li>
    //               <li><a href="#">Contct Us</a></li>
    //               <li><a href="#">FAQ</a></li>
    //             </ul>
    //           </div>
    //           <div className="footer-column">
    //             <h4>FAQ</h4>
    //             <ul>
    //               <li><a href="#">Insights</a></li>
    //               <li><a href="#">News</a></li>
    //               <li><a href="#">FAQ</a></li>
    //             </ul>
    //           </div>
    //           <div className="footer-column">
    //             <h4>Contact Us</h4>
    //             <ul>
    //               <li><a href="#">About Us</a></li>
    //               <li><a href="#">Our Team</a></li>
    //             </ul>
    //           </div>
    //         </div>

    //       </div>

    //       <div className="footer-socials">
    //       <IconButton color="primary">
    //           <Facebook />
    //         </IconButton>
    //         <IconButton sx={{ color: "#E4405F" }}>
    //           <Instagram />
    //         </IconButton>
    //         <IconButton color="primary">
    //           <LinkedIn />
    //         </IconButton>
    //         <IconButton sx={{ color: "#FF0000" }}>
    //           <YouTube />
    //         </IconButton>
    //         <IconButton color="primary">
    //           <Twitter />
    //         </IconButton>
    //       </div>
    //       <hr/>
    //       <section className="last-footer text-center" style={{textAlign:"center"}}>


    //           <div className="footer">
    //             <span className="float-left pr-2">
    //               © {new Date().getFullYear()} All rights reserved 
    //             </span>
    //             <span className="float-left">
    //               {/* <i className="fas fa-heart" aria-hidden="true"></i>  */}
    //               <FontAwesomeIcon  style={{color:'red', paddingLeft:'5px', paddingRight:'5px'}} icon={faHeart} aria-hidden="true" />
    //               by {" "}
    //               <a href="https://iiiqbets.com" target="_blank" rel="noopener noreferrer">
    //                 iiiQBets
    //               </a>
    //             </span>
    //           </div>
    // </section>
    //     </footer>
  );
}

export default Footer;
