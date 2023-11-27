import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Navbar from '../../../Navbar/navbar';
import {
    AccessTableDiv,
    AccessDetailsModalDiv,
    AccessDetailsHeadingDiv,
    FormHeading,
    ViewDetailsDiv,
    DivCloseButtonDiv
} from './access-privilege-admin.style'

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
import { ResetTvSharp } from '@mui/icons-material';
import { useSelector } from 'react-redux';

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

function AccessPrivilegeAdmin() {
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

    const [totalAccess, setTotalAccess] = useState([]);
    const admin = useSelector((state) => state.currUser);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`/api/access-request`, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
            }
        })
            .then((res) => {
                setTotalAccess(res.data)
            });
    }

    // ---------------------------------------------------------------------------------

    //store single leave req obj of that row
    const [accessDetails, setAccessDetails] = useState({})

    const viewAccessDetails = (uid) => {
        axios.get(`/api/access-request/${uid}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
            }
        })
            .then((res) => {
                setAccessDetails(res.data)
                showModal()
            })
            .catch((err) => {
                console.log(err)
                Swal.fire("Oops!", err.response.data.message, "error");
            })
    }

    // ---------------------------------------------------------------------------------

    const approveAccessRequest = async (uid) => {
        let reqObj = {
            actionBy: `${admin.fname} ${admin.lname}`,        //admin's name updated          
            rejectReason: '-',
            status: 'Approved',                                //this is updated
        }
        await axios.put(`/api/access-request/${uid}`, reqObj, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
            }
        })
            .then(async (res) => {
                await axios.put(`/api/users/update-user_type/${res.data.empID}`, {
                    user_type: res.data.requestFor
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
                    }
                })
                    .then((res) => {
                        Swal.fire("Done", "Request Approved Successfully.", "success");
                        fetchData();
                    })
                    .catch((err) => {
                        console.log(err)
                        Swal.fire("Oops!", err.response.data.message, "error");
                    })
            })
            .catch((err) => {
                console.log(err)
                Swal.fire("Oops!", err.response.data.message, "error");
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

    // here accessReqid & uid refer to same (i.e leave request id)
    const [accessReqid, setAccessReqid] = useState();               //store row id of access request(access ID)

    const showDialogBox = (uid) => {             // for rejection
        handleClickOpen();
        setAccessReqid(uid);
    }

    const postRejectReason = async () => {
        let reqObj = {
            actionBy: `${admin.fname} ${admin.lname}`,        //admin's name updated          
            rejectReason: rejectReason,                               //this is updated
            status: 'Rejected'                                            //this is updated
        }
        await axios.put(`/api/access-request/${accessReqid}`, reqObj, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
            }
        })
            .then((res) => {
                Swal.fire("Done", "Request Rejected Successfully.", "success");
                handleClose();
                fetchData();
            })
            .catch((err)=> {
                console.log(err)
                Swal.fire("Oops!", err.response.data.message, "error");
            })
    }

    const AccessRecordHeaders = ['S No.', 'Emp ID', 'Name', 'Request For', 'Manager', 'date', 'Status', 'Action'];
    const AccessDetailsHeaders = [
        {
            header: 'Accesss Request ID',
            value: accessDetails?._id
        },
        {
            header: 'Name',
            value: accessDetails?.empName
        },
        {
            header: 'Employee ID',
            value: accessDetails?.empID
        },
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
            header: 'ActionBy',
            value: accessDetails?.actionBy
        },
        {
            header: 'Status',
            value: accessDetails?.status
        },
        {
            header: 'Reject Reason',
            value: accessDetails?.rejectReason
        }
    ];

    return (
        <>
            <Navbar />
            <AccessTableDiv>
                <FormHeading> Access Privileges </FormHeading>
                <Paper className={classes.root}
                    style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }} >
                    <TableContainer className={`${classes.container} ${classes.myDialog}`} >

                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {AccessRecordHeaders.map((header) => (
                                        <TableCell align="center"
                                            style={{ backgroundColor: "#D3D3D3", fontSize: "1rem" }}>
                                            <b>{header}</b>
                                        </TableCell>
                                    )
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {totalAccess?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                {obj.requestFor}
                                            </TableCell>

                                            <TableCell align="center">
                                                {obj.manager}
                                            </TableCell>

                                            <TableCell align="center">
                                                {obj.date.slice(0, 10)}
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

                                                <Button onClick={() => viewAccessDetails(obj._id)}>
                                                    <DescriptionIcon style={{ color: "#2550df" }} />
                                                </Button>
                                                {(obj.status === 'Pending') &&
                                                    <>
                                                        <Button onClick={() => approveAccessRequest(obj._id)}>
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
                        count={totalAccess.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </AccessTableDiv>

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
                                                Leave Details
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

export default AccessPrivilegeAdmin;