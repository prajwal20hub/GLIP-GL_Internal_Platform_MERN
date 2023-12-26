import { makeStyles } from "@material-ui/styles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../../Navbar/navbar";

import {
  TableHeading,
  PayslipAdminTable,
  DivCloseButton,
  PayslipDetailsModal,
  DivViewDetails,
  ViewPayslipDetailsHeading,
  ButtonSubmitData,
  SubmitButtonDiv
} from "./payslip-admin.styled";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Swal from "sweetalert2";
import CloseButton from "react-bootstrap/CloseButton";
import { TextField } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const useStyles = makeStyles(() => ({
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

function PayslipsAdmin() {
  const Base_URL = import.meta.env.VITE_BASE_URL;
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [payslipDetails, setpayslipDetails] = useState();
  const [payslipRequestDetails, setpayslipRequestDetails] = useState();
  const [getDateVal, setDateVal] = useState([]);


  const [sendData, setSendData] = useState({
    empID: "",
    empName: "",          
    user_id: "",
    designation: "",       
    salary: "",
    deduction: "",
    month: "",
    year: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${Base_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then((res) => {
        setpayslipDetails(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const viewDetails = async (id) => {
    await axios.get(`${Base_URL}/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then((res) => {
        setpayslipRequestDetails(res.data);
        setSendData({
          ...sendData,
          empName: `${res.data.fname} ${res.data.lname}`,
          empID: res.data.empID,
          user_id: res.data._id,
          designation: res.data.designation
        });
        showModal();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getDate = (date) => {
    setDateVal(date.toISOString().split(/[-,"]+/));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const tableHeaders = ['S.No', 'Employee ID', 'Name', 'Email', 'Designation', 'Upload'];

  const detailsHeaders = [
    {
      Header: "Employee ID",
      Value: payslipRequestDetails?.empID,
    },
    {
      Header: "Name",
      Value: `${payslipRequestDetails?.fname} ${payslipRequestDetails?.lname}`,
    },
    {
      Header: "Designation",
      Value: payslipRequestDetails?.designation,
    }
  ];

  const onInputChange = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const upObj = {
      empName: sendData?.empName,
      empID: sendData?.empID,
      user_id: sendData?.user_id,
      designation: sendData?.designation,
      salary: sendData?.salary,
      deduction: sendData?.deduction,
      year: getDateVal[0] ? getDateVal[0] : null,
      month: getDateVal[1] ? getDateVal[1] : null
    }

    await axios.post(`${Base_URL}/api/payslip`, upObj, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then(() => {
        Swal.fire("Congrats", "Data sent Successfully", "success")
        showModal();
      })
      .catch((err) => {
        Swal.fire("Oops!", err.response.data.message, "error")
        console.log(err.response.data.message)
        console.log(err)
      })
  }

  return (
    <>
      <Navbar />
      <TableHeading> Payroll Payslips </TableHeading>
      <PayslipAdminTable>
        <Paper className={classes.root}
          style={{ boxShadow: "0.5px 0.5px 10px rgb(65, 64, 66)" }} >
          <TableContainer className={`${classes.container} ${classes.myDialog}`} >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell align="center"
                      style={{ backgroundColor: "#D3D3D3", fontWeight: 'bold' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {payslipDetails?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((emp, ind) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={ind}>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>
                          {ind + 1}
                        </TableCell>

                        <TableCell align="center">
                          {emp.empID}
                        </TableCell>

                        <TableCell align="center">
                          {`${emp.fname} ${emp.lname}`}
                        </TableCell>

                        <TableCell align="center">
                          {emp.email}
                        </TableCell>

                        <TableCell align="center">
                          {emp.designation}
                        </TableCell>

                        <TableCell align="center">
                          <UploadFileIcon
                            style={{ color: "#F37037", cursor: "pointer" }}
                            onClick={() => viewDetails(emp._id)} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={payslipDetails?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </PayslipAdminTable>


      {modalval && (
        <DivViewDetails className="position-absolute top-50 start-50 translate-middle">
          <PayslipDetailsModal>
            <TableContainer component={Paper}
              className={`${classes.container} ${classes.myDialog}`}>
              <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={3}>
                      <DivCloseButton>
                        <CloseButton
                          onClick={showModal}
                        />
                      </DivCloseButton>
                      <ViewPayslipDetailsHeading>
                        Payslips Details
                      </ViewPayslipDetailsHeading>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailsHeaders.map((obj) => (
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>
                        {obj.Header}
                      </TableCell>

                      <TableCell>{obj.Value}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Salary
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="salary"
                        onChange={onInputChange}
                        type="number"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#F37037',
                            }
                          }
                        }}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Deduction
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="deduction"
                        onChange={onInputChange}
                        type="number"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                              borderColor: '#F37037',
                            }
                          }
                        }}

                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Date
                    </TableCell>
                    <TableCell style={{ width: "25rem" }}>
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}>
                        <DatePicker
                          slotProps={{ textField: { fullWidth: true } }}
                          sx={{
                            svg: { color: "#F37037" }
                          }}
                          className="myDatePicker"
                          onChange={getDate}
                        />
                      </LocalizationProvider>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <SubmitButtonDiv>
                <ButtonSubmitData onClick={onSubmit}>
                  Submit
                </ButtonSubmitData>
              </SubmitButtonDiv>
            </TableContainer>
          </PayslipDetailsModal>
        </DivViewDetails>
      )}
    </>
  );
}

export default PayslipsAdmin;