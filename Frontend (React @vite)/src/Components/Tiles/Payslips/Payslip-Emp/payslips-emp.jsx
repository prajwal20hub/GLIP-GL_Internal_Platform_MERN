import React from "react";
import { useState, useEffect, useRef } from "react";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from 'react-redux';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
    FormHeading,
    ParentPayslipEmpDiv,
    ComponentsParentPayslipEmpDiv,
    ComponentPayslipEmpDiv1,
    ComponentPayslipEmpDiv2,
    Component1HeadingDiv,
    Component2HeadingDiv,
    Component1BodyDiv,
    PayslipEmpDownloadButton,
    PayslipEmpPreviewButton,
    InfoP,
    ComponentsButton,
    Component2BodyDiv,
    Component2BodyChild1Div,
    Component2BodyChild2Div,
    PayslipEmpSubmitButton,
    CurrentYearDiv,
    CurrentYearLable,
    NotAvailableErrorDiv,
    ShowMonthYearDiv,
    PdfParentDiv,
    DivCloseButtonDiv,
    ViewDetailsSpan,
    TransportDetailsModalDiv,
    ViewTransportDetailsHeadingDiv,
} from "./payslip-emp.styled";
import Navbar from '../../../Navbar/navbar'

const PayslipsEmp = () => {
    const Base_URL = import.meta.env.VITE_BASE_URL;
  
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [yearCheck, setyearCheck] = useState(false);
    const [checkedVal, setcheckedVal] = useState(true);
    const [payslips, setpayslips] = useState([]);
    const [thisMonthPayslip, setThisMonthPayslip] = useState();
    const [prevMonthPayslip, setPrevMonthPayslip] = useState();
    const [previousFlag, setpreviousFlag] = useState(false);
    const [pdfVal, setpdfVal] = useState(false);
    const [pdfValCondition, setpdfValCondition] = useState(true);
    const [downloadVal, setdownloadVal] = useState(false)

    const currUser = useSelector((state) => state.currUser);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await axios.get(`${Base_URL}/api/payslip/curr_emp`, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
            .then((res) => {
                setpayslips(res.data);
                getCurrPayslip(res.data)
                getPayslips(res.data, new Date());
            })
            .catch((err) => {
                console.log(err)
            })
    };

    //Current Payslips (Render on page load)
    const getCurrPayslip = (pays) => {
        const currDateArr = new Date().toISOString().split(/[-,"]+/);

        const payslip = pays.filter((obj) =>
            (obj.month == currDateArr[1] && obj.year == currDateArr[0])       //return array of signle obj
        );
        setThisMonthPayslip(payslip[0])       //store 1st obj
    };

    //Previous Payslips after on Submit Button Click
    const getPayslips = (payslips, currDate) => {
        const currDateArr = currDate.toISOString().split(/[-,"]+/);
        const payslip = payslips.filter((obj) =>
            (obj.month == currDateArr[1] && obj.year == currDateArr[0]) //return array of signle obj
        );
        setPrevMonthPayslip(payslip[0])       //store 1st obj
        { payslip.length == 0 ? setpreviousFlag(true) : setpreviousFlag(false); }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //view year component
    const showYearInput = (e) => {
        yearCheck ? setyearCheck(false) : setyearCheck(true);
        setcheckedVal(e.target.checked);
    };

    //show pdf on preview click
    const showPdf = async () => {
        setpdfValCondition(true)
        setpdfVal(!pdfVal);
        setdownloadVal(!downloadVal);
    };

    //show pdf on preview click second div
    const showPdfInner = async () => {
        setpdfValCondition(false)
        setpdfVal(!pdfVal);
        setdownloadVal(!downloadVal);
    };

    //download PDF on click
    const printDocument = () => {
        const input = document.getElementById("divToPrint");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.save("payslip.pdf");
        });
    };

    const pdfTable = [
        { Header: "Employee ID", Value: pdfValCondition ? currUser.empID : prevMonthPayslip.empID },
        { Header: "Name", Value: pdfValCondition ? thisMonthPayslip?.empName : prevMonthPayslip.empName },
        { Header: "Designation", Value: pdfValCondition ? thisMonthPayslip?.designation : prevMonthPayslip.designation },
        { Header: "Month", Value: pdfValCondition ? thisMonthPayslip?.month : prevMonthPayslip.month },
        { Header: "Year", Value: pdfValCondition ? thisMonthPayslip?.year : prevMonthPayslip.year },
        { Header: "Salary", Value: pdfValCondition ? thisMonthPayslip?.salary : prevMonthPayslip.salary },
        { Header: "Deduction", Value: pdfValCondition ? thisMonthPayslip?.deduction : prevMonthPayslip.deduction },
        { Header: "Total", Value: thisMonthPayslip?.salary - thisMonthPayslip?.deduction, }
    ];

    return (
        <>
            <Navbar />
            <ParentPayslipEmpDiv>
                <FormHeading> Your Payslips </FormHeading>
                {/* --------------Left Component--------------- */}
                <ComponentsParentPayslipEmpDiv>
                    <ComponentPayslipEmpDiv1>
                        <Component1HeadingDiv>This Month</Component1HeadingDiv>
                        {/* -----------Left component fields------------ */}
                        <Component1BodyDiv>
                            <InfoP>
                                Salary: {"  " + thisMonthPayslip?.salary}
                            </InfoP>
                            <InfoP>
                                Deduction: {"  " + thisMonthPayslip?.deduction}
                            </InfoP>
                            <InfoP>
                                Total: {"  " +
                                    thisMonthPayslip?.salary - thisMonthPayslip?.deduction
                                }
                            </InfoP>
                            <ComponentsButton>
                                {/* -----------------------------left component buttons---------- */}
                                <PayslipEmpPreviewButton onClick={showPdf}>
                                    Preview
                                </PayslipEmpPreviewButton>
                            </ComponentsButton>
                        </Component1BodyDiv>
                    </ComponentPayslipEmpDiv1>
                    {/* ---------------------------------Right Component---------------------- */}

                    <ComponentPayslipEmpDiv2>
                        <Component2HeadingDiv>
                            Previous Payslips
                        </Component2HeadingDiv>

                        <Component2BodyDiv>
                            {/* -----------------------------------child1------------------- */}
                            <Component2BodyChild1Div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        sx={{
                                            svg: { color: "#F37037" },
                                        }}
                                        disableToolbar
                                        format="MM"
                                        views={["month"]}
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Select Month"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />

                                    <br />

                                    <CurrentYearDiv>
                                        <input
                                            id="current-year"
                                            type="checkbox"
                                            onChange={showYearInput}
                                            checked={checkedVal}
                                        />
                                        <CurrentYearLable>
                                            Current Year
                                        </CurrentYearLable>
                                    </CurrentYearDiv>
                                    <br />

                                    {yearCheck && (
                                        <KeyboardDatePicker
                                            sx={{
                                                svg: { color: "#F37037" },
                                            }}
                                            disableToolbar
                                            format="yyyy"
                                            views={["year"]}
                                            margin="normal"
                                            label="Select Year"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    )}
                                </MuiPickersUtilsProvider>
                                <PayslipEmpSubmitButton
                                    onClick={()=> {getPayslips(payslips, selectedDate)}}>
                                    Submit
                                </PayslipEmpSubmitButton>
                            </Component2BodyChild1Div>

                            {/*---------------------------------child 2--------------------------------------*/}
                            <Component2BodyChild2Div>
                                <Component1BodyDiv>
                                    <ShowMonthYearDiv>
                                        {[prevMonthPayslip?.month]}
                                        {prevMonthPayslip && "/"}
                                        {prevMonthPayslip?.year}
                                    </ShowMonthYearDiv>
                                    <InfoP>
                                        Salary:
                                        {prevMonthPayslip &&
                                            prevMonthPayslip?.salary}
                                    </InfoP>
                                    <InfoP>
                                        Deductions:
                                        {prevMonthPayslip &&
                                            prevMonthPayslip?.deduction}
                                    </InfoP>
                                    <InfoP>
                                        Total:
                                        {prevMonthPayslip &&
                                            prevMonthPayslip?.salary -
                                            prevMonthPayslip?.deduction}
                                    </InfoP>
                                    <ComponentsButton>

                                        <PayslipEmpDownloadButton onClick={showPdfInner}>
                                            Preview
                                        </PayslipEmpDownloadButton>
                                    </ComponentsButton>
                                </Component1BodyDiv>
                            </Component2BodyChild2Div>
                        </Component2BodyDiv>
                    </ComponentPayslipEmpDiv2>
                </ComponentsParentPayslipEmpDiv>
                <NotAvailableErrorDiv>
                    {previousFlag && "Not available"}
                </NotAvailableErrorDiv>

                {pdfVal && (
                    <ViewDetailsSpan className="position-absolute top-50 start-50 translate-middle">
                        <TransportDetailsModalDiv>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    stickyHeader
                                    aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={3}>
                                                <DivCloseButtonDiv>
                                                    <CloseButton
                                                        onClick={showPdf}
                                                    />
                                                </DivCloseButtonDiv>
                                                <ViewTransportDetailsHeadingDiv>
                                                    Payslip Details
                                                </ViewTransportDetailsHeadingDiv>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pdfTable.map((e) => (
                                            <TableRow>

                                                <TableCell>
                                                    <b>{e.Header}</b>
                                                </TableCell>
                                                <TableCell>{e.Value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableRow>
                                        <TableCell
                                            align="center"
                                            colSpan={3}>

                                            <PayslipEmpDownloadButton onClick={printDocument}>
                                                Download
                                            </PayslipEmpDownloadButton>
                                        </TableCell>
                                    </TableRow>

                                </Table>
                            </TableContainer>
                        </TransportDetailsModalDiv>
                    </ViewDetailsSpan>
                )}
            </ParentPayslipEmpDiv>
            <div id="divToPrint">{downloadVal && (
                <TransportDetailsModalDiv>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650 }}
                            stickyHeader
                            aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        colSpan={3}>
                                        <DivCloseButtonDiv>
                                            <CloseButton
                                                onClick={showPdf}
                                            />
                                        </DivCloseButtonDiv>
                                        <ViewTransportDetailsHeadingDiv>
                                            Payslip Details
                                        </ViewTransportDetailsHeadingDiv>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pdfTable.map((e) => (
                                    <TableRow>
                                        <TableCell>
                                            <b>{e.Header}</b>
                                        </TableCell>
                                        <TableCell>{e.Value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TransportDetailsModalDiv>
            )}</div>
        </>
    );
};

export default PayslipsEmp;