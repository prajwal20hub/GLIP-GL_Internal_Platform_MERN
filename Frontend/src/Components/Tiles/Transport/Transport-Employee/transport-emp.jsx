import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../../Navbar/navbar'
import CountWeekdays from './count-week-days';
import {
  TranspEmpBody,
  FormContainer,
  FormHeading,
  FormLabel,
  FormInput,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
  //--------------------------//
  EmpTranspReqsTableDiv,
  TranspDetailsModalDiv,
  TranspDetailsHeadingDiv,
  ViewDetailsDiv,
  DivCloseButtonDiv
} from './transport-emp.style.js';

import { TextField } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers';
import ValidateEmpTranspRequest from './validate-emp-transp-request';

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

const TransportEmp = () => {
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
  const [locations, setLocations] = useState([]);         //imp
  const currUser = useSelector((state) => state.currUser);

  const [transRequest, setTransRequest] = useState(() => {
    var localStore = JSON.parse(localStorage.getItem("transpData"));
    if (localStore) {
      localStore.startDate = new Date(localStore.startDate)
      localStore.endDate = new Date(localStore.endDate)
    }
    return localStore || {
      empName: `${currUser.fname} ${currUser.lname}`,
      empID: currUser.empID,
      location: currUser.workLocation,
      pickupLocation: '',
      pickupAddress: '',
      dropLocation: '',
      dropAddress: '',
      startDate: '',
      endDate: '',
      returnTrip: '',
      weekDays: '',
      actionBy: '-',
      rejectReason: '',
      status: 'Pending'
    }
  });

  const { empName, empID, location, pickupLocation, pickupAddress, dropLocation, dropAddress, startDate, endDate, returnTrip, weekDays, status } = transRequest;

  const [totalTranspReqs, setTotalTranspReqs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);                          //only once when load

  const fetchData = async () => {
    await axios.get(`${Base_URL}/api/transport-request/empID/${empID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        // setTotalTranspReqs(res.data.filter((obj) => currUser.empID === obj.empID))
        setTotalTranspReqs(res.data)
      })
      .catch((err) => {
        console.log(err)
      });

    await axios.get(`${Base_URL}/api/locations`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  //store single transport-req obj of that row
  const [transpDetails, setTranspDetails] = useState({})

  const viewTranspDetails = async (uid) => {
    await axios.get(`${Base_URL}/api/transport-request/${uid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setTranspDetails(res.data);
        showModal();
      })
      .catch((err) => {
        console.log(err)
        Swal.fire("Oops!", err.response.data.message, "error");
      })
  }

  const onInputChange = (e) => {
    setTransRequest({ ...transRequest, [e.target.name]: e.target.value })

    if (e.target.name === 'pickupLocation') {
      if (e.target.value === 'Home') {
        locations.forEach((loc) => {
          if (loc.city === location) {
            setTransRequest({
              ...transRequest,
              'pickupLocation': 'Home',
              'pickupAddress': currUser.address,
              'dropLocation': 'Office',
              'dropAddress': loc.officeAddress
            })
          }
        })
      }
      else if (e.target.value === 'Office') {
        locations.forEach((loc) => {
          if (loc.city === location) {
            setTransRequest({
              ...transRequest,
              'pickupLocation': 'Office',
              'pickupAddress': loc.officeAddress,
              'dropLocation': 'Home',
              'dropAddress': currUser.address
            })
          }
        })
      }
    }
  }

  const [error, setError] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    const transportEmpError = ValidateEmpTranspRequest(transRequest);

    if (transportEmpError !== null) {
      setError(transportEmpError);
    }
    else {
      setError(null);
      await axios.post(`${Base_URL}/api/transport-request`, transRequest, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
        }
      })
        .then((res) => {
          Swal.fire("Congrats", "You have sent Transport Request Successfully.", "success");
          localStorage.removeItem('transpData');   //clear Transport Request Form Data
          navigate(`/dashboard/${id}`);
        })
        .catch((err) => {
          console.log(err)
          Swal.fire("Oops!", err.response.data.message, "error");
        })
    }
  }

  const formProps1 = [
    {
      label: 'Employee ID',
      name: 'empID',
      value: empID,
    },
    {
      label: 'Employee Name',
      name: 'empName',
      value: empName,
    },
    {
      label: 'Work Location',
      name: 'location',
      value: location
    },
    {
      label: 'Pickup Location',
      name: 'pickupLocation',
      value: pickupLocation,
      onChange: (e) => onInputChange(e),
    },
    {
      label: 'Pickup Address',
      name: 'pickupAddress',
      placeholder: 'Automatically Fetch on Selecting Pickup Location',
      value: pickupAddress
    },
    {
      name: 'dropLocation',
      label: 'Drop Location',
      placeholder: 'Automatically Fetch on Selecting Pickup Location',
      value: dropLocation
    },
    {
      label: 'Drop Address',
      name: 'dropAddress',
      placeholder: 'Automatically Fetch on Selecting Pickup Location',
      value: dropAddress
    }
  ]

  const datesData = [
    {
      label: 'Start Date',
      name: 'startDate',
      value: startDate
    },
    {
      label: 'End Date',
      name: 'endDate',
      value: endDate
    }
  ]
  const returnTripProp = ['Yes', 'No'];
  const pickupLocOpts = ['Home', 'Office'];

  const TranspRecordHeaders = ['S No.', 'Location', 'Start Date', 'End Date', 'View Details', 'Status'];

  const TranspDetailsHeaders = [
    {
      header: 'Location',
      value: transpDetails?.location
    },
    {
      header: 'Pickup Addresss',
      value: transpDetails?.pickupAddress
    },
    {
      header: 'Drop Address',
      value: transpDetails?.dropAddress
    },
    {
      header: 'Start Date',
      value: transpDetails?.startDate?.slice(0, 10)
    },
    {
      header: 'End Date',
      value: transpDetails?.endDate?.slice(0, 10)
    },
    {
      header: 'Week Days',
      value: transpDetails?.weekDays
    },
    {
      header: 'Return Trip',
      value: transpDetails?.returnTrip
    },
    {
      header: 'Status',
      value: transpDetails?.status
    },
    {
      header: 'Action By',
      value: transpDetails?.actionBy
    },
    {
      header: 'Reject Reason',
      value: transpDetails?.rejectReason
    }
  ];

  useEffect(() => {
    if (startDate && endDate) {
      if (endDate < startDate) {
        setError('End Date must be after Start Date!')
        setTransRequest({
          ...transRequest, 'weekDays': "Error"
        })
        return;
      }
      else {
        setError(null)
        setTransRequest({
          ...transRequest, 'weekDays': CountWeekdays(startDate, endDate)
        })
      }
    }
  }, [startDate, endDate])

  const onCancel = () => {
    setTransRequest({
      ...transRequest,
      pickupLocation: '',
      pickupAddress: '',
      dropLocation: '',
      dropAddress: '',
      startDate: '',
      endDate: '',
      returnTrip: '',
      weekDays: ''
    })
    localStorage.removeItem('transpData');   //clear Transport Request Form Data
  }

  const onSave = () => {
    localStorage.setItem("transpData", JSON.stringify(transRequest));
    Swal.fire("Congrats", "Saved as Draft Successfully.", "success");
  }

  return (
    <>
      <Navbar />
      <FormHeading> Transport Request </FormHeading>
      <TranspEmpBody>
        <FormContainer>

          {formProps1.map((obj, index) => {
            if (obj.name === 'pickupLocation') {
              return (
                <>
                  <FormLabel name={obj.name} > {obj.label} </FormLabel>
                  <FormAstric>*</FormAstric> <br />
                  <Select
                    style={{ width: '97%', height: '3rem' }}
                    name={obj.name} onChange={obj.onChange}
                    value={pickupLocation}
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#F37037',
                      },
                      '.MuiSvgIcon-root ': {
                        fill: "#F37037",
                      }
                    }}
                  >
                    {pickupLocOpts.map((opt, ind) => (
                      <MenuItem value={opt} >
                        {opt}
                      </MenuItem>
                    ))}

                  </Select >
                  <br /><br />
                </>
              )
            }
            return (
              <>
                <FormLabel name={obj.name}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric>
                <FormInput type="text" {...obj}
                />
              </>
            )
          }
          )}

          {datesData.map((obj) => (
            <>
              <FormLabel name={obj.name}>{obj.label}</FormLabel>
              <FormAstric>*</FormAstric> <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker disablePast
                  sx={{
                    svg: { color: "#F37037" },
                  }}
                  className="myDatePicker"
                  slotProps={{ textField: { fullWidth: true } }}
                  renderinput={(params) => <TextField {...params} />}
                  value={obj.value ? obj.value : null}
                  onChange={(newValue) => {
                    setTransRequest({
                      ...transRequest, [obj.name]: newValue
                    })
                  }}
                />
                <br /><br />
              </LocalizationProvider>
            </>
          ))}

          <>
            <FormLabel>Week Days</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInput type="text" placeholder='Calculate Automatically'
              style={{ color: weekDays === 'Error' && 'red' }} name='weekDays' value={weekDays} />
          </>

          {/* ----------------------------------------------------------------------- */}
          <FormLabel>Return Trip</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup
            row
            name="returnTrip"
            value={returnTrip}
            onChange={(e) => onInputChange(e)}
          >
            {returnTripProp.map((opt) => (
              <FormControlLabel
                label={opt} value={opt}
                control={<Radio
                  sx={{
                    '&, &.Mui-checked': {
                      color: '#F37037',
                    },
                  }}
                />}
              />
            ))}
          </RadioGroup>

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
      </TranspEmpBody >

      {/* ------------------------------------------------- */}
      <EmpTranspReqsTableDiv>
        <FormHeading style={{ marginTop: '3rem' }}> My Transport Requests Record </FormHeading>
        <Paper
          className={classes.root}
          style={{
            boxShadow: "0.5px 0.5px  10px rgb(65 64 66)",
          }}>
          <TableContainer className={`${classes.container} ${classes.myDialog}`} >

            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {TranspRecordHeaders.map(
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
                {totalTranspReqs
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
                          {obj.location}
                        </TableCell>

                        <TableCell align="center">
                          {obj.startDate.slice(0, 10)}
                        </TableCell>

                        <TableCell align="center">
                          {obj.endDate.slice(0, 10)}
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            onClick={() => viewTranspDetails(obj._id)}
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
            count={totalTranspReqs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </EmpTranspReqsTableDiv>

      {modalval && (
        <ViewDetailsDiv className="position-absolute top-50 start-50 translate-middle">
          <TranspDetailsModalDiv>
            <TableContainer component={Paper} className={classes.myDialog}>
              <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <DivCloseButtonDiv>
                        <CloseButton onClick={showModal} />
                      </DivCloseButtonDiv>
                      <TranspDetailsHeadingDiv>
                        Transport Request Details
                      </TranspDetailsHeadingDiv>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TranspDetailsHeaders.map((obj) => (
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
          </TranspDetailsModalDiv>
        </ViewDetailsDiv>
      )}
    </>
  )
}

export default TransportEmp