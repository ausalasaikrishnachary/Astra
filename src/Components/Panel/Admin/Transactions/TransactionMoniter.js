import React, { useEffect, useState } from "react";
import "./../Transactions/TransactionMoniter.css"
import {
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../Shared/Navbar/Navbar";
import axios from "axios";

const Tmoniter = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://46.37.122.105:91/property/")
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const summaryCardsData = [
    {
      title: "Total Transactions",
      value: "1274",
      subtext: "Last 7 Days",
    },
    {
      title: "Success Rate",
      value: "99.5%",
      subtext: "+2.3% from last week",
    },
    {
      title: "Total Volume",
      value: "2cr",
      subtext: "+12% increase",
    },
  ];

  const filteredProperties = properties.filter((property) =>
    property.property_name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { field: "property_id", headerName: "Property ID", width: 120 },
    { field: "property_name", headerName: "Property Name", width: 200 },
    { field: "property_type", headerName: "Type", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      renderCell: (params) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      width: 250,
      renderCell: (params) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {params.value}
        </Typography>
      ),
    },

    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "postal_code", headerName: "Postal_code", width: 100 },
    { field: "latitude", headerName: "Latitude", width: 100 },
    { field: "longitude", headerName: "Longitude", width: 100 },
    { field: "total_units", headerName: "Total Units", width: 120 },
    { field: "available_units", headerName: "Available Units", width: 150 },
    { field: "area_sqft", headerName: "Area_sqft", width: 100 },
    { field: "price_per_sqft", headerName: "Price_per_sqft", width: 150 },
    { field: "total_price", headerName: "Total Price", width: 150 },
    { field: "ownership_type", headerName: "Ownership_type", width: 150 },
    { field: "rental_yield", headerName: "Rental_yield", width: 150 },
    { field: "expected_roi", headerName: "expected_roi", width: 150 },
    { field: "legal_status", headerName: "legal_status", width: 150 },
    { field: "regulatory_approvals", headerName: "regulatory_approvals", width: 150 },
    { field: "tax_identification_number", headerName: "tax_identification_number", width: 150 },
    { field: "amenities", headerName: "amenities", width: 150 },
    { field: "parking_spaces", headerName: "parking_spaces", width: 150 },
    { field: "security_features", headerName: "security_features", width: 150 },
    { field: "furnished_status", headerName: "furnished_status", width: 150 },
    { field: "property_img", headerName: "property_img", width: 150 },
    { field: "additional_images", headerName: "additional_images", width: 150 },
    { field: "legal_documents", headerName: "legal_documents", width: 150 },
    { field: "listing_status", headerName: "listing_status", width: 150 },
    { field: "created_at", headerName: "created_at", width: 150 },
    { field: "updated_at", headerName: "updated_at", width: 150 },
    { field: "agent", headerName: "agent", width: 150 },
    { field: "investors", headerName: "investors", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: () => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <IconButton size="small">
            <VisibilityIcon />
          </IconButton>
          <IconButton size="small">
            <EditIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: "red" }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Container sx={{ pt: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: "center" }}>
          Transaction Monitor
        </Typography>

        <Grid container spacing={2}>
          {summaryCardsData.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ backgroundColor: "#f8f9fa", textAlign: "center", p: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" sx={{ color: "rgb(30,10,80)" }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2">{card.subtext}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", mt: 3, mb: 2 }}>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{ width: "250px" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FormControl size="small" sx={{ width: "120px" }}>
            <Select defaultValue="Latest">
              <MenuItem value="Latest">Latest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" sx={{ width: "120px", fontSize: "14px", textTransform: "none" }}>
            Filters
          </Button>
        </Box>

        <Box sx={{ height: 400, width: "100%", mt: 3 }}>
          <DataGrid
            rows={filteredProperties}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            pagination
            paginationMode="client"
            autoHeight
            disableSelectionOnClick
            loading={loading}
            getRowId={(row) => row.property_id}
          />

        </Box>
      </Container>
    </>
  );
};

export default Tmoniter;
