import React, { useRef, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Admin.css"
const UserSearch = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [userlist, setUserList] = useState([]);

  const debouncedSearch = useRef(
    debounce((searchValue) => {
      axios
        .post("http://127.0.0.1:8000/api/searchCompany", {
          search: searchValue,
        })
        .then((response) => {
          const data = response.data.exportProducts.data;
          setUserList(data);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 600)
  ).current;

  const handleSearchChange = () => {
    const searchValue = inputRef.current.value.trim();

    // If there is no search term, fetch all companies
    if (!searchValue) {
     setUserList([])
    }

    debouncedSearch(searchValue); // Pass the search term directly
  };

  const navigateToCompany = (id) => {
    navigate(`/usermanger/${id}`);
  };

  return (
    <div>
      <div className="search">
        <div className="search-box">
          <input
            type="text"
            className="input-bar"
            ref={inputRef}
            onChange={handleSearchChange}
            placeholder="Search"
          />
          <span></span>
        </div>
      </div>
    <div className="find-companies-table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ minWidth: 650, background: "lightgray" }}>
            <TableRow >
              <TableCell>Name</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {userlist.map((user) => (
              <TableRow
                key={user.id}
                hover
                onClick={() => navigateToCompany(user.id)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: "pointer",
            }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="right">{user.country}</TableCell>
                <TableCell align="right">{user.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
};


export default UserSearch