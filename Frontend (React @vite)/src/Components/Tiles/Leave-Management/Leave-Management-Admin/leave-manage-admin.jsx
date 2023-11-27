import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Navbar from '../../../Navbar/navbar'
import { useSelector } from 'react-redux';
import {
  FormHeading,
  LeavesReqsTableDiv,
  ViewDetailsDiv,
  LeaveDetailsModalDiv,
  DivCloseButtonDiv,
  LeaveDetailsHeadingDiv
} from './leave-manage-admin.style'

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
import Button from "@mui/material/Button";
import CloseButton from "react-bootstrap/CloseButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
      width: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.4)',
      borderRadius: '4px'
    }
  }
}));

const LeaveManageAdmin = () => {
  const { id } = useParams();               //admin's id from url
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

  //----------------view details modal----------------
  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [totalLeaves, setTotalLeaves] = useState([]);
  const admin = useSelector((state) => state.currUser);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await axios.get(`/api/leave-request`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then((res) => {
        setTotalLeaves(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // ---------------------------------------------------------------------------------

  //store single leave req obj of that row
  const [leaveDetails, setLeaveDetails] = useState({})
  const [leavesRemain, setLeavesRemain] = useState({})

  const viewLeaveDetails = async (uid) => {
    await axios.get(`/api/leave-request/${uid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then(async (res) => {
        setLeaveDetails(res.data)
        await axios.get(`/api/leaves-remain/empID/${res.data.empID}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
          }
        })
          .then((resp) => {
            setLeavesRemain(resp.data)
          })
          .catch((err) => {
            console.log(err)
            Swal.fire("Oops!", err.response.data.message, "error");
          });
        showModal()
      })
      .catch((err) => {
        console.log(err)
        Swal.fire("Oops!", err.response.data.message, "error");
      })
  }

  // ---------------------------------------------------------------------------------

  const approveLeaveRequest = async (uid) => {
    const leaveData = await axios.get(`/api/leave-request/${uid}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    });

    let reqObj = {
      actionBy: `${admin.fname} ${admin.lname}`,        //admin's name updated
      rejectReason: '-',
      status: 'Approved',                                //this is updated
    }
    await axios.put(`/api/leave-request/${uid}`, reqObj, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })

    await axios.get(`/api/leaves-remain/empID/${leaveData.data.empID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then(async (res) => {
        var sl = res.data.sickLeaves
        var cl = res.data.casualLeaves
        var pl = res.data.paidLeaves

        switch (leaveData.data.leaveType) {
          case 'Sick Leave':
            sl = sl - leaveData.data.duration;
            break;
          case 'Casual Leave':
            cl = cl - leaveData.data.duration;
            break;
          case 'Paid Leave':
            pl = pl - leaveData.data.duration;
            break;
          default:
        }
        const leavesRemainObj = {
          casualLeaves: cl,
          sickLeaves: sl,
          paidLeaves: pl
        }
        await axios.put(`/api/leaves-remain/empID/${leaveData.data.empID}`, leavesRemainObj, {
          headers: {
            'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
          }
        })
          .then(() => {
            Swal.fire("Done", "Request Approved Successfully.", "success");
            fetchData();
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // -----------------------------------------------------------------------------------------

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [rejectReason, setRejectReason] = useState();

  // here leaveid & uid refer to same (i.e leave request id)
  const [leaveid, setLeaveid] = useState();               //store row id of leave request(leave ID)

  const showDialogBox = (uid) => {             // for rejection
    handleClickOpen();
    setLeaveid(uid);
  }

  const postRejectReason = async () => {
    let reqObj = {
      actionBy: `${admin.fname} ${admin.lname}`,                  //admin's name updated
      rejectReason: rejectReason,                               //this is updated
      status: 'Rejected',                                            //this is updated
    }
    await axios.put(`/api/leave-request/${leaveid}`, reqObj, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
      }
    })
      .then(() => {
        handleClose();
        fetchData();
      })
      .catch((err) => {
        console.log(err)
        Swal.fire("Oops!", err.response.data.message, "error");
      })
  }

  const LeavesRecordHeaders = ['S No.', 'Emp ID', 'Name', 'Start Date', 'End Date', 'Status', 'Action'];
  const LeavesDetailsHeaders = [
    {
      header: 'Leave ID',
      value: leaveDetails?._id
    },
    {
      header: 'Name',
      value: leaveDetails?.empName
    },
    {
      header: 'Leave Type',
      value: leaveDetails?.leaveType
    },
    {
      header: 'Reason',
      value: leaveDetails?.reason
    },
    {
      header: 'Start Date',
      value: leaveDetails?.startDate?.slice(0, 10)
    },
    {
      header: 'End Date',
      value: leaveDetails?.endDate?.slice(0, 10)
    },
    {   //if 'Yes' add () to date & if 'N0' then don't add () as we do not have date
      header: 'Is Half Day Leave',
      value: leaveDetails?.isHalfDay === 'Yes' ?
        `${leaveDetails?.isHalfDay} (${leaveDetails?.halfDayDate?.slice(0, 10)})` :
        `${leaveDetails?.isHalfDay}`
    },
    {
      header: 'Duration',
      value: `${leaveDetails?.duration} Days`
    },
    {
      header: 'Reject Reason',
      value: leaveDetails?.rejectReason
    },

    {
      header: 'Casual Leaves (Left)',
      value: leavesRemain?.casualLeaves
    },
    {
      header: 'Sick Leaves (Left)',
      value: leavesRemain?.sickLeaves
    },
    {
      header: 'Paid Leaves (Left)',
      value: leavesRemain?.paidLeaves
    }
  ];

  return (
    <>
      <Navbar />
      <LeavesReqsTableDiv>
        <FormHeading> Leaves Management </FormHeading>
        <Paper className={classes.root}
          style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }} >
          <TableContainer className={`${classes.container} ${classes.myDialog}`} >

            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {LeavesRecordHeaders.map((header) => (
                    <TableCell align="center"
                      style={{ backgroundColor: "#D3D3D3", fontSize: "1rem" }}>
                      <b>{header}</b>
                    </TableCell>
                  )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {totalLeaves?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((obj, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        {index + 1}
                      </TableCell>

                      <TableCell align="center">
                        {obj.empID}
                      </TableCell>

                      <TableCell align="center">
                        {obj.empName}
                      </TableCell>

                      <TableCell align="center">
                        {obj.startDate.slice(0, 10)}
                      </TableCell>

                      <TableCell align="center">
                        {obj.endDate.slice(0, 10)}
                      </TableCell>

                      <TableCell align="center">
                        {obj.status === 'Pending' && <> Pending </>}
                        {obj.status === 'Approved' &&
                          <CheckBoxRoundedIcon style={{ color: "#15ca05" }} />
                        }
                        {obj.status === 'Rejected' &&
                          <DisabledByDefaultIcon style={{ color: "#df2525", }} />
                        }
                      </TableCell>

                      <TableCell align="center">

                        <Button onClick={() => viewLeaveDetails(obj._id)}>
                          <DescriptionIcon style={{ color: "#2550df" }} />
                        </Button>
                        {(obj.status === 'Pending') &&
                          <>
                            <Button onClick={() => approveLeaveRequest(obj._id)}>
                              <CheckBoxRoundedIcon style={{ color: "#15ca05" }} />
                            </Button>

                            <Button onClick={() => showDialogBox(obj._id)} >
                              <DisabledByDefaultIcon style={{ color: "#df2525" }} />
                            </Button>
                          </>
                        }
                      </TableCell>
                    </TableRow>
                  )
                  )}
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
      </LeavesReqsTableDiv>

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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reason</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Give Reason for your Decision
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Write Reason Here"
            type="text"
            fullWidth
            variant="standard"
            name="reason"
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postRejectReason}> Reject </Button>
        </DialogActions>
      </Dialog>
    </ >
  );
}

export default LeaveManageAdmin