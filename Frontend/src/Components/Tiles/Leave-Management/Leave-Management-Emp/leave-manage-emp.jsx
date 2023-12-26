import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Navbar from '../../../Navbar/navbar'
import ValidateLeaveEmp from './validate-leave-emp'

import {
  EmpLeavesReqsTableDiv,
  LeaveEmpBody,
  FormContainer,
  DataContainer,
  FormHeading,
  FormLabel,
  FormInputArea,
  FormInput,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
  // LinksDiv,
  // FormLinks
  LeaveRecordDiv,
  LeaveFormDiv,
  LightBox,
  InnerBox,
  Values,
  // --------------------------
  ViewDetailsDiv,
  LeaveDetailsModalDiv,
  DivCloseButtonDiv,
  LeaveDetailsHeadingDiv
} from './leave-manage-emp.style.js';

import { TextField } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { makeStyles } from "@material-ui/styles";

import DescriptionIcon from "@mui/icons-material/Description";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CountWeekdays from '../../Transport/Transport-Employee/count-week-days';

import Button from "@mui/material/Button";
import CloseButton from "react-bootstrap/CloseButton";

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

const LeaveManageEmp = () => {
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
  const navigate = useNavigate();
  const { id } = useParams();
  const currUser = useSelector((state) => state.currUser);
  const [totalLeaves, setTotalLeaves] = useState([]);
  const [leavesRemain, setLeavesRemain] = useState({});

  const [leaveRequest, setLeaveRequest] = useState(() => {
    var localStotage = JSON.parse(localStorage.getItem("LeaveEmpData"));
    if (localStotage) {
      localStotage.startDate = new Date(localStotage.startDate)
      localStotage.endDate = new Date(localStotage.endDate)

      if (localStotage.isHalfDay === 'Yes') {
        localStotage.halfDayDate = new Date(localStotage.halfDayDate)
      }
    }
    return localStotage || {
      empName: `${currUser.fname} ${currUser.lname}`,
      empID: currUser.empID,
      leaveType: '',
      startDate: '',
      endDate: '',
      duration: '',
      isHalfDay: '',
      halfDayDate: '',
      reason: '',
      actionBy: '-',
      rejectReason: '',
      status: 'Pending'
    }
  });

  const { empID, leaveType, startDate, endDate, duration, isHalfDay, halfDayDate, reason} = leaveRequest;

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = async () => {
    await axios.get(`${Base_URL}/api/leaves-remain/empID/${empID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setLeavesRemain(res.data);
      })
      .catch((err) => {
        console.log(err)
      });

    await axios.get(`${Base_URL}/api/leave-request/empID/${empID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setTotalLeaves(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const { casualLeaves, sickLeaves, paidLeaves } = leavesRemain;

  //----------------view details modal----------------
  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };

  //store single leave req obj of that row
  const [leaveDetails, setLeaveDetails] = useState({})

  const viewLeaveDetails = async (uid) => {
    await axios.get(`${Base_URL}/api/leave-request/${uid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setLeaveDetails(res.data)
        showModal()
      })
      .catch((err) => {
        console.log(err)
        Swal.fire("Oops!", err.response.data.message, "error");
      })
  }

  const onInputChange = (e) => {
    //if 'isHalfDay' is set to 'No' then remove the halfDayDate otherwise previously selected persists.
    if (e.target.name === 'isHalfDay' && e.target.value === 'No') {
      setLeaveRequest({ ...leaveRequest, 'halfDayDate': '', [e.target.name]: e.target.value })
      return
    }
    setLeaveRequest({ ...leaveRequest, [e.target.name]: e.target.value })
  }

  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const leaveEmpError = ValidateLeaveEmp(leaveRequest);

    if (leaveEmpError !== null) {
      setError(leaveEmpError);
      return;
    }
    else {
      setError(null);
      await axios.post(`${Base_URL}/api/leave-request`, leaveRequest, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
        }
      })
        .then((res) => {
          Swal.fire("Congrats", "You have sent Leave Request Successfully.", "success");
          localStorage.removeItem('LeaveEmpData');
          navigate(`/dashboard/${id}`);
          onCancel();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const onCancel = () => {
    setLeaveRequest({
      ...leaveRequest,
      leaveType: '',
      startDate: '',
      endDate: '',
      duration: '',
      isHalfDay: '',
      halfDayDate: '',
      reason: '',
    })
    localStorage.removeItem('LeaveEmpData');   //clear Leave Request Form Data
  }

  const onSave = () => {
    localStorage.setItem("LeaveEmpData", JSON.stringify(leaveRequest));
    Swal.fire("Congrats", "Saved as Draft Successfully.", "success");
  }

  const leaveTypeProps = [
    { label: 'Sick Leave', value: 'Sick Leave' },
    { label: 'Casual Leave', value: 'Casual Leave' },
    { label: 'Paid Leave', value: 'Paid Leave' },
  ]

  const halfDayProps = [
    {
      name: 'isHalfDay',
      label: 'Yes',
      value: 'Yes',
      onChange: (e) => onInputChange(e)
    },
    {
      name: 'isHalfDay',
      label: 'No',
      value: 'No',
      onChange: (e) => onInputChange(e)
    }
  ]

  const LeavesRecordHeaders = ['S No.', 'Start Date', 'End Date', 'Half Day Leaves', 'Type of Leave', 'View Details', 'Status'];

  const datesData = [
    {
      name: 'startDate',
      label: 'Start Date',
      value: startDate
    },
    {
      name: 'endDate',
      label: 'End Date',
      value: endDate
    }
  ]

  var res;
  useEffect(() => {
    if (startDate && endDate) {
      res = CountWeekdays(startDate, endDate);

      if (endDate < startDate) {
        setError('End Date must be after Start Date!')
        setLeaveRequest({
          ...leaveRequest, 'duration': "Error"
        })
        return;
      }
      else {
        setError(null)
        setLeaveRequest({
          ...leaveRequest, 'duration': ''
        })
      }

      if (isHalfDay === 'No') {
        setLeaveRequest({
          ...leaveRequest, 'duration': res
        })
      }

      if (isHalfDay === 'Yes') {
        if (halfDayDate === '') {
          setLeaveRequest({
            ...leaveRequest, 'duration': ''
          })
        }
        else {
          if (halfDayDate >= startDate && halfDayDate <= endDate) {
            res = res - 0.5;
          }
          else {
            res = res + 0.5;
          }
          setLeaveRequest({
            ...leaveRequest, 'duration': res
          })
        }
      }
    }
  }, [startDate, endDate, halfDayDate, isHalfDay])

  const LeavesDetailsHeaders = [
    {
      header: 'Leave Type',
      value: leaveDetails?.leaveType
    },
    {
      header: 'Reason',
      value: leaveDetails?.reason
    },
    {
      header: 'Duration',
      value: `${leaveDetails?.duration} Days`
    },
    {
      header: 'Status',
      value: leaveDetails?.status
    },
    {
      header: 'Action By',
      value: leaveDetails?.actionBy
    },
    {
      header: 'Reject Reason',
      value: leaveDetails?.rejectReason
    }
  ];
  return (
    <>
      <Navbar />
      <LeaveEmpBody>
        <LeaveRecordDiv>
          <FormHeading style={{ fontSize: '2.2rem' }}> My Balance Leaves </FormHeading>
          <DataContainer>
            <LightBox>
              <InnerBox>Casual Leaves </InnerBox> <Values>{casualLeaves} </Values>
            </LightBox>
            <LightBox>
              <InnerBox>Sick Leaves </InnerBox> <Values> {sickLeaves} </Values>
            </LightBox>
            <LightBox>
              <InnerBox>Paid Leaves </InnerBox> <Values> {paidLeaves} </Values>
            </LightBox>
            <hr />
            <LightBox>
              <InnerBox>Total Leave Balance </InnerBox>
              <Values> {sickLeaves + casualLeaves + paidLeaves} </Values>
            </LightBox>
          </DataContainer>
        </LeaveRecordDiv>

        <LeaveFormDiv>
          <FormHeading> Leave Request </FormHeading>
          <FormContainer>
            <FormLabel name='leaveType' > Leave Type </FormLabel>
            <FormAstric>*</FormAstric> <br />
            <Select
              value={leaveType}
              style={{ width: '100%', height: '3rem', marginTop: '0.4rem' }}
              name='leaveType' onChange={(e) => onInputChange(e)}
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#F37037',
                },
                '.MuiSvgIcon-root ': {
                  fill: "#F37037",
                }
              }}
            >
              {leaveTypeProps.map((prop) => (
                <MenuItem {...prop} >
                  {prop.label}
                </MenuItem>
              ))}
            </Select>
            <br /><br />

            {datesData.map((obj) => (
              <>
                <FormLabel name={obj.name}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric> <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker disablePast
                    value={obj.value ? obj.value : null}
                    sx={{
                      svg: { color: "#F37037" },
                    }}
                    className="myDatePicker"
                    slotProps={{ textField: { fullWidth: true } }}
                    renderinput={(params) => <TextField {...params} />}
                    onChange={(newValue) => {
                      setLeaveRequest({ ...leaveRequest, [obj.name]: newValue })
                    }}
                  />
                  <br /><br />
                </LocalizationProvider>
              </>
            ))}

            <FormLabel name='isHalfDay'>Is Half Day Leave</FormLabel>
            <FormAstric>*</FormAstric> <br />
            <RadioGroup style={{ marginBottom: '1rem' }}
              row
              name="isHalfDay"
              value={isHalfDay}
            >
              {halfDayProps.map((obj) => (
                <FormControlLabel
                  {...obj}
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

            {isHalfDay === 'Yes' &&
              <>
                <FormLabel name='halfDayDate'>Half Day Date</FormLabel>
                <FormAstric>*</FormAstric> <br />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker disablePast
                    sx={{
                      svg: { color: "#F37037" }
                    }}
                    className="myDatePicker"
                    value={halfDayDate ? halfDayDate : null}
                    slotProps={{ textField: { fullWidth: true } }}
                    renderinput={(params) => <TextField {...params} />}
                    onChange={(newValue) => {
                      setLeaveRequest({
                        ...leaveRequest, 'halfDayDate': newValue
                      })
                    }}
                  />
                  <br /><br />
                </LocalizationProvider>
              </>
            }

            {/* ------------------------------------------------ */}

            <FormLabel name='duration'>Duration (In Days)</FormLabel>
            <FormAstric>*</FormAstric>

            <FormInput style={{ color: duration === 'Error' && 'red' }} type="text" placeholder='Week Days Generate Automatically'
              name='duration' value={duration} readonly />

            <FormLabel name='reason'>Reason</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInputArea type="text"
              name='reason'
              label='Reason'
              placeholder='Please Fill Reason'
              onChange={(e) => onInputChange(e)}
              value={reason}
            />

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
        </LeaveFormDiv>

      </LeaveEmpBody >

      {/* ------------------------------------------------- */}
      <EmpLeavesReqsTableDiv>
        <FormHeading style={{ marginTop: '3rem' }}> My Leaves Record </FormHeading>
        <Paper
          className={classes.root}
          style={{
            boxShadow: "0.5px 0.5px  10px rgb(65 64 66)",
          }}>
          <TableContainer className={`${classes.container} ${classes.myDialog}`} >

            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {LeavesRecordHeaders.map(
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
                {totalLeaves
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
                          {obj.startDate.slice(0, 10)}
                        </TableCell>

                        <TableCell align="center">
                          {obj.endDate.slice(0, 10)}
                        </TableCell>

                        <TableCell align="center">
                          {obj.isHalfDay} {obj.isHalfDay === 'Yes' &&
                            <> ({obj.halfDayDate.slice(0, 10)}) </>}
                        </TableCell>

                        <TableCell align="center">
                          {obj.leaveType}
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            onClick={() => viewLeaveDetails(obj._id)}
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
            count={totalLeaves.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </EmpLeavesReqsTableDiv>

      {modalval && (
        <ViewDetailsDiv className="position-absolute top-50 start-50 translate-middle">
          <LeaveDetailsModalDiv>
            <TableContainer component={Paper} className={classes.myDialog}>
              <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <DivCloseButtonDiv>
                        <CloseButton onClick={showModal} />
                      </DivCloseButtonDiv>
                      <LeaveDetailsHeadingDiv>
                        Leave Details
                      </LeaveDetailsHeadingDiv>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {LeavesDetailsHeaders.map((obj) => (
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
          </LeaveDetailsModalDiv>
        </ViewDetailsDiv>
      )}
    </>
  )
}

export default LeaveManageEmp