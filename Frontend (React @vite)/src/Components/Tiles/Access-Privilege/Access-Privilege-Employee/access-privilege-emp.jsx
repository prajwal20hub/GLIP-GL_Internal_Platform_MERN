import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../Navbar/navbar'
import ValidateEmpAccess from './validate-emp-access';
import { useSelector } from 'react-redux';

import {
  AccessEmpBody,
  EmpAccessReqsTableDiv,
  AccessDetailsModalDiv,
  AccessDetailsHeadingDiv
} from './access-privilege-emp.style'

import {
  FormContainer,
  FormHeading,
  FormLabel,
  FormInput,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
  FormInputArea,
  //--------------------------//
  ViewDetailsDiv,
  DivCloseButtonDiv,
} from '../../Transport/Transport-Employee/transport-emp.style';


import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers';

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { makeStyles } from "@material-ui/styles";

import Button from "@mui/material/Button";
import CloseButton from "react-bootstrap/CloseButton";

import DescriptionIcon from "@mui/icons-material/Description";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

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

const AccessPrivilegeEmp = () => {
  const Base_URL = import.meta.env.VITE_BASE_URL;
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //----------------select rows
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //----------------next page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // --------------------------------------------------------------------- //

  //----------------view details modal----------------
  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [managerList, setManagerList] = useState([]);
  const currUser = useSelector((state) => state.currUser);

  const [accessRequest, setAccessRequest] = useState(() => {
    var localStore = JSON.parse(localStorage.getItem("accessData"));
    if (localStore) {
      localStore.date = new Date(localStore.date)
    }
    return localStore || {
      empName: `${currUser.fname} ${currUser.lname}`,
      empID: currUser.empID,
      requestFor: '',
      manager: '',
      reason: '',
      date: '',
      actionBy: '-',
      rejectReason: '',
      status: 'Pending'
    }
  });

  const { empName, empID, manager, requestFor, reason, date, status } = accessRequest;

  const [totalAccess, setTotalAccess] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${Base_URL}/api/access-request/empID/${empID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        // setTotalAccess(res.data.filter((obj) => currUser.empID === obj.empID))
        setTotalAccess(res.data)
      })

    await axios.get(`${Base_URL}/api/users/managers`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setManagerList(res.data)
      })
  }

  //store single leave req obj of that row
  const [accessDetails, setAccessDetails] = useState({})

  const viewAccessDetails = async (uid) => {
    await axios.get(`${Base_URL}/api/access-request/${uid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setAccessDetails(res.data);
        showModal();
      })
  }

  const onInputChange = (e) => {
    setAccessRequest({ ...accessRequest, [e.target.name]: e.target.value });
  }

  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const accessReqError = ValidateEmpAccess(accessRequest);

    if (accessReqError !== null) {
      setError(accessReqError);
      return;
    }
    else {
      setError(null);
      await axios.post(`${Base_URL}/api/access-request`, accessRequest, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
        }
      })
        .then((res) => {
          Swal.fire("Congrats", "You have sent Access Privilege Request Successfully.", "success");
          localStorage.removeItem('accessData');   //clear Access Privilege Form Data
          navigate(`/dashboard/${id}`);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const formProps1 = [
    {
      label: 'Employee ID',
      name: 'empID',
      value: empID
    },
    {
      label: 'Employee Name',
      name: 'empName',
      value: empName
    },
    {
      label: 'Raise Access for Role',
      name: 'requestFor',
      value: requestFor,
      options: ['Admin', 'Transport Admin', 'HR Admin', 'Payroll Admin', 'Manager Admin'],
    },
    {
      label: 'Select Manager',
      name: 'manager',
      value: manager,
      options: managerList,
    },
    {
      label: 'Reason',
      name: 'reason',
      placeholder: 'Please Fill Reason',
      value: reason,
      onChange: (e) => onInputChange(e)
    }
  ];

  const AccessRecordHeaders = ['S No.', 'Request For', 'Manager', 'Date', 'View Details', 'Status'];

  const AccessDetailsHeaders = [
    {
      header: 'Request For',
      value: accessDetails?.requestFor
    },
    {
      header: 'Manager',
      value: accessDetails?.manager
    },
    {
      header: 'Reason',
      value: accessDetails?.reason
    },
    {
      header: 'Date',
      value: accessDetails?.date?.slice(0, 10)
    },
    {
      header: 'Status',
      value: accessDetails?.status
    },
    {
      header: 'Action By',
      value: accessDetails?.actionBy
    },
    {
      header: 'Reject Reason',
      value: accessDetails?.rejectReason
    }
  ];


  const onCancel = () => {
    setAccessRequest({
      ...accessRequest,
      requestFor: '',
      manager: '',
      reason: '',
      date: '',
    })
    localStorage.removeItem('accessData');   //clear Access Privilege Form Data
  }

  const onSave = () => {
    localStorage.setItem("accessData", JSON.stringify(accessRequest));
    Swal.fire("Congrats", "Saved as Draft Successfully.", "success");
  }

  return (
    <>
      <Navbar />
      <FormHeading> Access Privilege Request </FormHeading>
      <AccessEmpBody>
        <FormContainer>

          {formProps1.map((obj, index) => {
            if (obj.name === 'requestFor' || obj.name === 'manager') {
              return (
                <>
                  <FormLabel> {obj.label} </FormLabel>
                  <FormAstric>*</FormAstric> <br />
                  {obj.name === 'requestFor' ?
                    <Select
                      value={obj.value}
                      style={{ width: '100%', height: '3rem', marginTop: '0.4rem' }}
                      name={obj.name}
                      onChange={(e) => onInputChange(e)}
                      sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#F37037',
                        },
                        '.MuiSvgIcon-root ': {
                          fill: "#F37037",
                        }
                      }}
                    >
                      {obj.options.map((opt) => (
                        <MenuItem value={opt} >
                          {opt}
                        </MenuItem>
                      ))}
                    </Select> :

                    <Select
                      value={obj.value}
                      style={{ width: '100%', height: '3rem', marginTop: '0.4rem' }}
                      name={obj.name}
                      onChange={(e) => onInputChange(e)}
                      sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#F37037',
                        },
                        '.MuiSvgIcon-root ': {
                          fill: "#F37037",
                        }
                      }}
                    >
                      {obj.options.map((man) => (
                        <MenuItem value={`${man.fname} ${man.lname}`} >
                          {man.fname} {man.lname}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  <br /><br />
                </>
              )
            }
            return (
              <>
                <FormLabel name={obj.name}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric>
                {index !== 4 ?
                  <FormInput type="text" {...obj} /> :
                  <FormInputArea type="text" {...obj} />
                }
              </>
            )
          }
          )}
          <FormLabel name='date'>Date</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker disablePast
              sx={{
                svg: { color: "#F37037" }
              }}
              className="myDatePicker"
              value={date ? date : null}
              slotProps={{ textField: { fullWidth: true } }}
              renderinput={(params) => <TextField {...params} />}
              onChange={(newValue) => {
                setAccessRequest({
                  ...accessRequest, 'date': newValue
                })
              }}
            />
            <br /><br />
          </LocalizationProvider>

          <FlexDiv>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FlexDiv>

          <FlexDiv>
            <SubmitButton onClick={e => onSubmit(e)}>
              Make Request
            </SubmitButton>
            <SubmitButton onClick={e => onCancel(e)}>
              Cancel
            </SubmitButton>
            <SubmitButton onClick={e => onSave(e)}>
              Save as Draft
            </SubmitButton>
          </FlexDiv>
        </FormContainer>
      </AccessEmpBody >

      {/* ------------------------------------------------- */}
      <EmpAccessReqsTableDiv>
        <FormHeading style={{ marginTop: '3rem' }}> My Access Requests Record </FormHeading>
        <Paper
          className={classes.root}
          style={{
            boxShadow: "0.5px 0.5px  10px rgb(65 64 66)",
          }}>
          <TableContainer className={`${classes.container} ${classes.myDialog}`} >

            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {AccessRecordHeaders.map(
                    (header) => (
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor:
                            "#D3D3D3",
                          fontSize: "1rem",
                        }}>
                        <b>{header}</b>
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {totalAccess
                  ?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((obj, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}>
                        <TableCell
                          align="center"
                          style={{
                            fontWeight: "bold",
                          }}>
                          {index + 1}
                        </TableCell>

                        <TableCell align="center">
                          {obj.requestFor}
                        </TableCell>

                        <TableCell align="center">
                          {obj.manager}
                        </TableCell>

                        <TableCell align="center">
                          {obj.date.slice(0, 10)}
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            onClick={() => viewAccessDetails(obj._id)}
                          >
                            <DescriptionIcon style={{ color: "#2550df" }} />
                          </Button>
                        </TableCell>

                        <TableCell align="center">
                          {obj.status === 'Pending' &&
                            <> {status} </>
                          }
                          {obj.status === 'Approved' &&
                            <CheckBoxRoundedIcon
                              style={{
                                color: "#15ca05",
                              }}
                            />
                          }
                          {obj.status === 'Rejected' &&
                            <DisabledByDefaultIcon
                              style={{
                                color: "#df2525",
                              }}
                            />
                          }
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
            count={totalAccess.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </EmpAccessReqsTableDiv>

      {modalval && (
        <ViewDetailsDiv className="position-absolute top-50 start-50 translate-middle">
          <AccessDetailsModalDiv>
            <TableContainer component={Paper} className={classes.myDialog}>
              <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <DivCloseButtonDiv>
                        <CloseButton onClick={showModal} />
                      </DivCloseButtonDiv>
                      <AccessDetailsHeadingDiv>
                        Access Request Details
                      </AccessDetailsHeadingDiv>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {AccessDetailsHeaders.map((obj) => (
                    <TableRow>
                      <TableCell align="center" style={{ fontWeight: 'bolder' }}>
                        {obj.header}
                      </TableCell>
                      <TableCell align="center">{obj.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccessDetailsModalDiv>
        </ViewDetailsDiv>
      )}
    </>
  )
}

export default AccessPrivilegeEmp