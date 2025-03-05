import React from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';
import './Properties.css'; // Import the CSS file

const Properties = () => {
  return (
    <Container className="properties">
      <div className="filters-container">
        <TextField
          className="search-bar"
          label="Search properties here..."
          variant="outlined"
        />

        <div className="buttons-container">
          <Button className="sort-button" sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
            Sort by: Latest
          </Button>
          <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>Filters</Button>
        </div>
      </div>

      <Typography variant="h4" className="mt-3">
        Industrial Properties:
      </Typography>
      <Grid container spacing={2}>
        {/* Property 1 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://media.istockphoto.com/id/1405246054/photo/empty-warehouse-in-logistic-center.jpg?s=612x612&w=0&k=20&c=G2GPj8tAeTs71u3hHD9qze_8F41KsoTpopbW94CcRYs="
              alt="Warehouse"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">LARGE WAREHOUSE</div>
              <p>Address: Industrial Area, Hyderabad, Telangana.</p>
              <p>Gross Entry Yield: 8.5% | Asset Value: ₹60,00,00,000 | Target IRR: 12.8%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>

        {/* Property 2 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://images.unsplash.com/photo-1610891015188-5369212db097?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFudWZhY3R1cmluZ3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Factory"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">MANUFACTURING FACILITY</div>
              <p>Address: Sector 15, Bangalore, Karnataka.</p>
              <p>Gross Entry Yield: 9.0% | Asset Value: ₹75,00,00,000 | Target IRR: 14.2%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>

        {/* Property 3 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://media.biltrax.com/wp-content/uploads/2023/12/News-Article-Cover-Images-28-1.png"
              alt="Logistics Hub"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">LOGISTICS HUB</div>
              <p>Address: Near National Highway, Mumbai, Maharashtra.</p>
              <p>Gross Entry Yield: 8.8% | Asset Value: ₹50,00,00,000 | Target IRR: 13.0%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>

        {/* Property 4 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://eu-images.contentstack.com/v3/assets/blt8eb3cdfc1fce5194/blt29d49d9dc2394b9c/66210a507963b40fc4ceec07/google_20data_20center_20cooling_20pipes.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale"
              alt="Data Center"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">DATA CENTER</div>
              <p>Address: IT Hub, Pune, Maharashtra.</p>
              <p>Gross Entry Yield: 9.2% | Asset Value: ₹60,00,00,000 | Target IRR: 14.0%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>

        </Grid>

        {/* Property 5 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://media.automotiveworld.com/app/uploads/2022/05/19084907/volkswagen-id-5-zwickau-plant.jpg"
              alt="Assembly Plant"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">ASSEMBLY PLANT</div>
              <p>Address: Industrial Zone, Chennai, Tamil Nadu.</p>
              <p>Gross Entry Yield: 9.2% | Asset Value: ₹65,00,00,000 | Target IRR: 14.0%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>

        {/* Property 6 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://mecaluxcom.cdnwm.com/documents/d/global/m41p03-almacenamiento-frio-estanterias?e=jpg&imwidth=1024&imdensity=1"
              alt="Cold Storage Facility"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">COLD STORAGE FACILITY</div>
              <p>Address: Refrigeration Park, Ahmedabad, Gujarat.</p>
              <p>Gross Entry Yield: 8.3% | Asset Value: ₹48,00,00,000 | Target IRR: 12.5%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>

        {/* Property 7 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDV8fHJlY3ljaWxlJTIwcGxhbnR8ZW58MHx8fHwxNjc2Nzc3MjM0&ixlib=rb-1.2.1&q=80&w=400"
              alt="Recycling Plant"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">RECYCLING PLANT</div>
              <p>Address: Eco Industrial Zone, Kolkata, West Bengal.</p>
              <p>Gross Entry Yield: 8.0% | Asset Value: ₹42,00,00,000 | Target IRR: 13.2%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>

        {/* Property 8 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://media.istockphoto.com/id/178631224/photo/multi-colored-yarns-in-the-textile-machine.jpg?s=612x612&w=0&k=20&c=toug9tSwN8sZyX76vomTUyAUt7IxemUIsps0n_ip3i0="
              alt="Textile Manufacturing Unit"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">TEXTILE MANUFACTURING</div>
              <p>Address: Industrial Estate, Surat, Gujarat.</p>
              <p>Gross Entry Yield: 8.9% | Asset Value: ₹58,00,00,000 | Target IRR: 13.8%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>

        {/* Property 9 */}
        <Grid item md={4} xs={12}>
          <div className="property-card">
            <img
              src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDl8fHJlbmV3YWJsZSUyMGVuZXJneSUyMGZhY3Rvcnl8ZW58MHx8fHwxNjc2Nzc3MzY5&ixlib=rb-1.2.1&q=80&w=400"
              alt="Renewable Energy Factory"
              className="property-img"
            />
            <div className="property-description">
              <div className="property-title">RENEWABLE ENERGY FACTORY</div>
              <p>Address: Techno Park, Noida, Uttar Pradesh.</p>
              <p>Gross Entry Yield: 9.1% | Asset Value: ₹70,00,00,000 | Target IRR: 14.5%</p>
            </div>
            <div className="btn-container">
              <Button className="btn-purple" variant="contained">
                Join in Wait List
              </Button>
              <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
                View Details
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Properties;
