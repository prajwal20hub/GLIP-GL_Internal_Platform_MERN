import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import Navbar from '../../../Navbar/navbar';

import {
  FormHeading,
  ViewDetailsDiv,
  DivCloseButtonDiv,
} from '../../Leave-Management/Leave-Management-Admin/leave-manage-admin.style';

import {
  TasksTableDiv,
  TaskDetailsModalDiv,
  TaskDetailsHeadingDiv
} from './task-management-emp.styles'

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

const TaskManagementEmp = () => {
  const Base_URL = import.meta.env.VITE_BASE_URL;
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [tasks, setTasks] = useState([]);
  const [currTask, setCurrtask] = useState({});

  //----------------View task details modal----------------
  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get(`${Base_URL}/api/task`, {             //filter by user_id in backend
      headers: {
        'Authorization': `Bearer ${localStorage.token}` //for verification (IMP)
      }
    })
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  //--------------------Individual task data -----------
  const viewDetails = async (id) => {
    await axios.get(`${Base_URL}/api/task/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`//for verification (IMP)
      }
    })
      .then((res) => {
        setCurrtask(res.data);
        showModal();
      })
      .catch((err) => {
        console.log(err)
        Swal.fire("Oops!", err.response.data.message, "error");
      })
  }

  const tableHeaders = ['S No.', 'Assigned By', 'Assigned Date', 'Details'];

  const TaskDetailsHeaders = [
    {
      header: 'Assigned By(Manager)',
      value: currTask?.assignedBy
    },
    {
      header: 'Task',
      value: currTask?.task
    },
    {
      header: 'Date',
      value: currTask?.createdAt?.slice(0,10)
    }
  ];

  return (
    <>
      <Navbar />
      <TasksTableDiv>
        <FormHeading> Assigned Tasks </FormHeading>
        <Paper className={classes.root}
          style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }} >
          <TableContainer className={`${classes.container} ${classes.myDialog}`} >

            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableCell align="center"
                      style={{ backgroundColor: "#D3D3D3", fontSize: "1rem" }}>
                      <b>{header}</b>
                    </TableCell>
                  )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((obj, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        {index + 1}
                      </TableCell>

                      <TableCell align="center">
                        {obj.assignedBy}
                      </TableCell>

                      <TableCell align="center">
                        {obj.createdAt.slice(0, 10)}
                      </TableCell>

                      <TableCell align="center">
                        <Button onClick={() => viewDetails(obj._id)}>
                          <DescriptionIcon style={{ color: "#2550df" }} />
                        </Button>
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
            count={tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </TasksTableDiv>

      {modalval && (
        <ViewDetailsDiv className="position-absolute top-50 start-50 translate-middle">
          <TaskDetailsModalDiv>
            <TableContainer component={Paper} className={classes.myDialog}>
              <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <DivCloseButtonDiv>
                        <CloseRoundedIcon onClick={showModal} />
                      </DivCloseButtonDiv>
                      <TaskDetailsHeadingDiv>
                        Task Details
                      </TaskDetailsHeadingDiv>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {TaskDetailsHeaders.map((obj) => (
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
          </TaskDetailsModalDiv>
        </ViewDetailsDiv>
      )}
    </ >
  );
}

export default TaskManagementEmp;
