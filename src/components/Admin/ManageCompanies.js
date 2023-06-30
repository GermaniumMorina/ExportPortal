import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ManageCompanies.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { BsFillFileEarmarkBreakFill } from "react-icons/bs";
import { MdOutlineDoneOutline } from "react-icons/md";
import { ImNotification } from "react-icons/im";
import { SiQuicklook } from "react-icons/si";
import axios from "axios";
import alertify from "alertifyjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

const ManageCompanies = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = (value) => {
    axios
      .put(`http://127.0.0.1:8000/api/updateStatus/${id}`, { status_id: value })
      .then((response) => {
        console.log(response);
        alertify.success(response.data);
        handleClose();
      })
      .catch((error) => {
        alertify.error("Status change failed");
        console.error(error);
      });
  };

  const handleCompanyDelete = () => {
    alertify
      .confirm()
      .setting({
        label: "Delete",
        message: "Delete the company?",
        onok: function () {
          deleteCompany();
        },
        oncancel: function () {
        },
      })
      .show();
  };

  const deleteCompany = () => {
    const companyId = id; 
    axios
      .delete(`http://127.0.0.1:8000/api/deleteCompany/${companyId}`)
      .then((response) => {
        console.log(response);
        alertify.success("Company deleted successfully.");
      })
      .catch((error) => {
        alertify.error("Failed to delete company.");
        console.error(error);
      });
  };

  const [formData, setFormData] = useState({
    name: "",
    keywords: "",
    country_id: "",
    country:"",
    web_address: "",
    more_info: "",
    membership: "",
    category: "",
    subcategory: ""
  });
  const [countryList, setCountryList] = useState([]);

  const handleFormSubmit = () => {
    axios
      .put(`http://127.0.0.1:8000/api/updateCompany/${id}`, formData)
      .then((response) => {
        console.log(response);
        alertify.success("Company updated successfully.");
      })
      .catch((error) => {
        alertify.error("Failed to update company.");
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    // Fetch company details from the API
    axios
      .get(`http://127.0.0.1:8000/api/company_details/${id}`)
      .then((response) => {
        console.log(response);
        const companyData = response.data[0];
        setFormData({
          name: companyData.name,
          keywords: companyData.keywords,
          country_id: companyData.country_id,
          country: companyData.country,

          web_address: companyData.web_address,
          more_info: companyData.more_info,
          membership: companyData.membership,
          category: companyData.category,
          subcategory: companyData.subcategory
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/country");
      console.log(response)
      setCountryList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mc-grid-container">
      <div className="mc-left-column">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="mc-edit-form">
            <TextField
              required
              id="filled-required"
              label="Name"
              name="name"
              value={formData.name}
              variant="filled"
              onChange={handleInputChange}
            />
            <br/>
            <TextField
              required
              id="filled-required"
              label="Keywords"
              name="keywords"
              value={formData.keywords}
              variant="filled"
              onChange={handleInputChange}
            />
                        <br/>

            <FormControl required sx={{ m: 1, width: "25ch" }}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                input={<OutlinedInput label="Country" />}
              >
                {countryList.map((country) => (
                  <MenuItem key={country.id} value={country.id} >
                    {country.country}
                  </MenuItem>
                ))}
              </Select>
              <span>Country: {formData.country}</span>
            </FormControl>
                        <br/>

            <TextField
              required
              id="filled-required"
              label="Web Address"
              name="web_address"
              value={formData.web_address}
              variant="filled"
              onChange={handleInputChange}
            />
                        <br/>

            <TextField
              required
              id="filled-required"
              label="More Info"
              name="more_info"
              value={formData.more_info}
              variant="filled"
              onChange={handleInputChange}
            />
                        <br/>

            <TextField
              required
              id="filled-required"
              label="Membership"
              name="membership"
              value={formData.membership}
              variant="filled"
              onChange={handleInputChange}
            />
                        <br/>

            <TextField
              required
              id="filled-required"
              label="Category"
              name="category"
              value={formData.category}
              variant="filled"
              onChange={handleInputChange}
            />
                        <br/>

            <TextField
              required
              id="filled-required"
              label="Subcategory"
              name="subcategory"
              value={formData.subcategory}
              variant="filled"
              onChange={handleInputChange}
            />
  <br/>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              Update Company
            </Button>
          </div>
        </Box>
      </div>
      <div className="mc-right-column">
        <div className="mc-row">
          <p className="mc-text">Manage the company application status</p>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Status
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {/* ... */}
            <div className="main-announcments-div">
              <div
                className="company-status is-preparing"
                onClick={() => updateStatus(1)}
              >
                <SiQuicklook />
                <span>Preparing </span>
              </div>

              <div
                className="company-status is-under"
                onClick={() => updateStatus(2)}
              >
                <BsFillFileEarmarkBreakFill />
                <span>Under Reviewal</span>
              </div>
              <div
                className="company-status is-approved"
                onClick={() => updateStatus(3)}
              >
                <MdOutlineDoneOutline />
                <span>Approved</span>
              </div>

              <div
                className="company-status is-disapproved"
                onClick={() => updateStatus(4)}
              >
                <ImNotification />
                <span>Disapproved</span>
              </div>
            </div>
          </Menu>
        </div>
        <div className="mc-row-2" onClick={handleCompanyDelete}>
          <p className="mc-text">DELETE</p>
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;
