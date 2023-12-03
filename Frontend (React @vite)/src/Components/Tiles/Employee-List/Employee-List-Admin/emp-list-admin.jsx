import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  EmployeeListTable,
  ButtonDiv,
  SubmitButton,
  TableHeading,
  EmployeeDetailsModal,
  ViewEmployeeDetailsHeading,
  DivCloseButton,
  EmployeeDetailsModalParent,
  TableContainer2,
} from "./employee-list-admin.styles";
import Navbar from '../../../Navbar/navbar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: '55vh'
  },
  myDialog: {
    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '10px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '4px'
    }
  }
}));

function EmpListAdmin() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //------------Filter Component--------------
  let [users, setUsers] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  //------------FilterDiv ---------------------
  const [state, setState] = useState({
    top: false,
  });
  //------------EmployeeDetails----------------------
  const [currUser, setCurrUser] = useState({});
  //----------------view details modal----------------
  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
  };
  //---------------New user details-------------
  const [selectOption, setSelectOption] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get("/api/users")
      .then((res) => {
        setUsers(res.data);
      })
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  // ----------------Filter Component states-----------------
  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  }

  const filteredEmployees = users.filter((obj) => {
    var name = obj.fname + obj.lname;
    // Filter the employee list based on the current filter values
    const nameMatch = name.toLowerCase().includes(nameFilter.toLowerCase());
    const designationMatch =
      designationFilter === "" || obj.designation === designationFilter;
    return nameMatch && designationMatch;
  });

  //-------------------DeleteUser-----------------
  const deleteUser = async (id) => {
    await axios.delete(`/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err)
        Swal.fire("Oops!", err.response.data.message, "error");
      })
  }

  //--------------------Individual data -----------
  const viewDetails = async (id) => {
    await axios(`/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setCurrUser(res.data);
        setSelectOption(res.data.designation)
        showModal();
      })
      .catch((err) => {
        console.log(err)
        Swal.fire("Oops!", err.response.data.message, "error");
      })
  }

  //-----------------ChangeDesignation------------------
  const ChangeDesignation = async (id) => {
    setmodalval(false);
    if (selectOption !== currUser.designation) {
      await axios.put(`/api/users/designation/${id}`, {
        designation: selectOption,   //new designation
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
        }
      })
        .then((res) => {
          Swal.fire("Congrats", "Designation Updated successfully.", "success");
          fetchData();
          setSelectOption(null);
        })
        .catch((err) => {
          console.log(err)
          Swal.fire("Oops!", err.response.data.message, "error");
        })
    }
    else {
      setmodalval(true);
    }
  }
  //-----------------Filter Drawer-------------------
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "300px" : 300 }}
      role="presentation"
      style={{
        width: "100%",
        height: "4.5rem",
        float: "right",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "rgba(230 231 232)",
      }} >
      <div
        style={{
          width: "30%",
          float: "right",
          display: "flex",
          justifyContent: "space-evenly",
        }}>
        <h3>
          <span style={{ fontWeight: "bold", color: "rgb(65 64 66)" }}>
            Filter Employees
          </span>
        </h3>
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Designation</InputLabel>
          <Select
            value={designationFilter}
            onChange={(e) => { setDesignationFilter(e.target.value) }}
            sx={{
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#F37037',
              },
              '.MuiSvgIcon-root ': {
                fill: "#F37037",
              }
            }}
          >
            {desigantionProps.map((props, ind) => (
              <MenuItem {...props} >
                {props.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Name"
            variant="standard"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />
        </Box>
      </div>
      <Button variant="elevated" onClick={toggleDrawer("top", false)}>
        <CloseRoundedIcon />
      </Button>
    </Box>
  );

  function ClearFilter() {
    setDesignationFilter("");
    setNameFilter("");
  }

  const desigantionProps = [
    { label: 'Intern', value: 'Intern' },
    { label: 'Associate Software Engineer', value: 'Associate Software Engineer' },
    { label: 'Software Engineer', value: 'Software Engineer' },
    { label: 'Senior Software Engineer', value: 'Senior Software Engineer' },
    { label: 'Manager', value: 'Manager' },
    { label: 'HR', value: 'HR' },
    { label: 'Transport Emp', value: 'Transport' },
    { label: 'Payroll Emp', value: 'Payroll' }
  ]

  const tableHeaders = ['S No.', 'Employee ID', 'Name', 'Designation', 'Email', 'Action'];

  return (
    <>
      <Navbar />
      <TableHeading> Employee List </TableHeading>
      <EmployeeListTable>
        <div style={{ display: "flex" }}>
          <div style={{ float: "left", width: "50%" }}>
            <span
              style={{
                padding: "0.5rem",
                fontSize: "1rem",
                float: "left",
                fontWeight: "bold",
              }}>
              TOTAL : {filteredEmployees.length}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "right",
            }}>
            <IconButton variant="oulined" onClick={toggleDrawer("top", true)}>
              <Icon
                icon="mdi:filter"
                width="22"
                height="23"
                color=" rgba(0, 0, 0, 0.54)"
              />
            </IconButton>
            <Drawer
              anchor={"top"}
              open={state["top"]}
              onClose={toggleDrawer("top", false)}>
              {list("top")}
            </Drawer>
            <IconButton type="button" onClick={ClearFilter}>
              <Icon
                icon="mdi:filter-remove"
                color=" rgba(0, 0, 0,0.54)"
                width="21"
                height="23"
              />
            </IconButton>
          </div>
        </div>

        <Paper className={classes.root}
          style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }} >
          <TableContainer className={`${classes.container} ${classes.myDialog}`}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: "#D3D3D3",
                        fontWeight: 'bold'
                      }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((emp, index) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={index}>

                        <TableCell align="center" style={{ fontWeight: "bold" }}>
                          {index + 1}
                        </TableCell>

                        <TableCell align="center">
                          {emp.empID}
                        </TableCell>

                        <TableCell align="center">
                          {emp.fname} {emp.lname}
                        </TableCell>

                        <TableCell align="center">
                          {emp.designation}
                        </TableCell>

                        <TableCell align="center">
                          {emp.email}
                        </TableCell>

                        <TableCell align="center">
                          <Button onClick={() => viewDetails(emp._id)}>
                            <EditRoundedIcon style={{ color: "#3b0d92" }} />
                          </Button>
                          <Button onClick={() => deleteUser(emp._id)}>
                            <DeleteRoundedIcon style={{ color: "#df2525" }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </EmployeeListTable>

      {/* show details */}
      {modalval && (
        <EmployeeDetailsModalParent>
          <EmployeeDetailsModal>
            <TableContainer component={Paper}>
              <DivCloseButton>
                <CloseRoundedIcon onClick={showModal} />
              </DivCloseButton>
              <ViewEmployeeDetailsHeading>
                <AccountCircleRoundedIcon
                  style={{ width: "100px", height: "100px" }}
                />
              </ViewEmployeeDetailsHeading>
              <TableContainer2 className="table-container">
                <Table
                  sx={{ minWidth: "400px", width: "100%" }}
                  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>
                        Employee ID
                      </TableCell>
                      <TableCell>{currUser?.empID}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>
                        Employee Name
                      </TableCell>
                      <TableCell>
                        {currUser?.fname} {currUser?.lname}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>
                        Designation
                      </TableCell>
                      <TableCell>
                        <Select
                          style={{ width: '20vw' }}
                          value={selectOption}
                          onChange={(e) => {
                            setSelectOption(e.target.value);
                            setOpen(false);
                          }}
                          sx={{
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#F37037',
                            },
                            '.MuiSvgIcon-root ': {
                              fill: "#F37037",
                            }
                          }}
                        >
                          {desigantionProps.map((prop, ind) => (
                            <MenuItem {...prop} >
                              {prop.label}
                            </MenuItem>
                          ))}

                        </Select >
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>
                        Email
                      </TableCell>
                      <TableCell>{currUser?.email}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer2>

              <ButtonDiv>
                <SubmitButton
                  onClick={() => ChangeDesignation(currUser._id)}
                >
                  Submit
                </SubmitButton>
              </ButtonDiv>
            </TableContainer>
          </EmployeeDetailsModal>
        </EmployeeDetailsModalParent>
      )}
    </>
  );
}

export default EmpListAdmin;