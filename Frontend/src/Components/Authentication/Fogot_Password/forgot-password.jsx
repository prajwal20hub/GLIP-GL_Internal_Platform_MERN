import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import validateEmail from "./validate-email";
import validatePassword from "./validate-password";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  FormBackground,
  FormLogo,
  FormContainer,
  FormHeading,
  FormLabel,
  FormInput,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
} from "../Register/forms.style";
import {
  OtpInputModal,
  ModalParentDiv,
  TableHeading,
  DivCloseButton
} from "./forgot-password.styles";
import GLlogo from "../../../Utils/Images/GL-logo.jpg";
import OTPInput, { ResendOTP } from "otp-input-react";

const ForgotPassword = () => {
  const Base_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [newDiv, setNewDiv] = useState(false);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(null);
  const [errorOtp, setErrorOtp] = useState(null);

  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPass: ''
  });

  const { email, password, confirmPass } = user;

  var arrUserKeys = Object.keys(user);

  const handleSubmitOTP = async () => {
    debugger;
    await axios.post(`${Base_URL}/api/otp/verify-otp`, { email, otp: otp.toString() })
      .then((res) => {
        debugger;
        Swal.fire("Congrats", res.data.message, "success");
        setShowModal(false);
        setNewDiv(true);
        setErrorOtp(null);
      })
      .catch((err) => {
        debugger;
        setErrorOtp(err.response.data.message);
        Swal.fire("Oops!", err.response.data.message, "error");
      });
  };

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value }); //single object

    for (let i = 0; i < n; i++) {
      if (Object.values(user)[i] === "") {
        document.getElementsByName(arrUserKeys[i])[0].style.color = "red";
        document.getElementsByName(arrUserKeys[i])[1].style.borderBottom = "2px solid red";
      }
    }

    if (e.target.value === "") {
      e.target.style.borderBottom = "2px solid red";
      document.getElementsByName(arrUserKeys[n])[0].style.color = "red";
    } else {
      e.target.style.borderBottom = null;
      document.getElementsByName(arrUserKeys[n])[0].style.color = null;
    }
  };

  const onResend = async () => {
    setErrorOtp(null);
    setFlag(null);
    setOtp(null);
    await axios.get(`${Base_URL}/api/otp/email/${email}`);  //new otp set in db
  };

  const onSubmit1 = async (e) => {
    e.preventDefault(); //PREVENT REFRESH OF PAGE

    const EmailError = validateEmail(user); //validation
    if (EmailError !== null) {
      setError(EmailError);
    }
    else {
      setError(null);
      await axios.get(`${Base_URL}/api/otp/email/${email}`)
        .then((res) => {
          setCurrUser(res.data);
          setShowModal(true);
        })
        .catch((err) => {
          setError(err.response.data.message);
          Swal.fire("Oops!", err.response.data.message, "error");
        })
    }
  };

  const onSubmit2 = async (e) => {
    e.preventDefault(); //PREVENT REFRESH OF PAGE
    const PassError = validatePassword(user); //validation

    if (PassError !== null) {
      setError(PassError);
    }
    else {
      setError(null);
      if (newDiv === true) {
        await axios.put(`${Base_URL}/api/users/forgot-password/${currUser._id}`, { password })
          .then((res) => {
            Swal.fire("Congrats", "You have Successfully changed your Password!", "success");
            navigate("/login");
          })
          .catch((err) => {
            setError(err.response.data.message);
            Swal.fire("Oops!", err.response.data.message, "error");
          })
      }
    }
  }

  // password hide & show
  const [show, setShow] = useState(false);
  const changeVisibility = (e) => {
    e.preventDefault();
    setShow((current) => !current);
  };
  // confirm password hide & show
  const [showCP, setShowCP] = useState(false);
  const changeVisibilityCP = (e) => {
    e.preventDefault();
    setShowCP((current) => !current);
  };

  const formProp = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your Email",
      value: email,
      onChange: (e) => onInputChange(e, 0),
    },
  ];

  const formPass = [
    {
      name: "password",
      label: "New Password",
      placeholder: "Enter your New Password",
      value: password,
      onChange: (e) => onInputChange(e, 1),
      showStatus: show,
      visibilityFunc: changeVisibility
    },
    {
      name: "confirmPass",
      label: "Confirm New Password",
      placeholder: "Enter your Confirm New Password",
      value: confirmPass,
      onChange: (e) => onInputChange(e, 2),
      showStatus: showCP,
      visibilityFunc: changeVisibilityCP
    }
  ];
  return (
    <>
      <FormBackground>
        <Link to="/">
          <FormLogo src={GLlogo} />
        </Link>
        <FormContainer>
          <FormHeading> Forgot password </FormHeading>

          {!newDiv &&
            formProp.map((obj) => (
              <>
                <FormLabel name={obj.name}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric>
                <FormInput type="text" {...obj} />
              </>
            ))}

          {newDiv &&
            formPass.map((obj) => (
              <>
                <FormLabel name={obj.name}> {obj.label} </FormLabel>
                <FormAstric className="required-astric">*</FormAstric>
                <FormInput
                  type={obj.showStatus ? "text" : "password"}
                  {...obj}
                />
                {obj.showStatus ? (
                  <VisibilityOffIcon onClick={obj.visibilityFunc} />
                ) : (
                  <VisibilityIcon onClick={obj.visibilityFunc} />
                )}
              </>
            ))}

          <FlexDiv>{error && <ErrorMessage>{error}</ErrorMessage>}</FlexDiv>

          <FlexDiv>
            {newDiv ? (
              <SubmitButton onClick={(e) => onSubmit2(e)}>Submit</SubmitButton>
            ) : (
              <SubmitButton onClick={(e) => onSubmit1(e)}>
                Generate OTP
              </SubmitButton>
            )}
          </FlexDiv>
        </FormContainer>
      </FormBackground>
      {showModal && (
        <ModalParentDiv>
          <OtpInputModal
            className="card"
            style={{ width: "20%", height: "50vh" }}>

            <DivCloseButton>
              <CloseRoundedIcon onClick={() => { setShowModal(false) }} />
            </DivCloseButton>
            <TableHeading>Enter OTP</TableHeading>

            <p>OTP is sent on your Email</p>
            <OTPInput
              value={otp}
              onChange={setOtp}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure
            />

              <ResendOTP
                style={{ color: "green" }}
                value="Resend"
                inputStyles={{}}
                className="abc"
                maxTime={120}
                onResendClick={() => onResend()}
              />
            <FlexDiv>
              {!flag && errorOtp && <ErrorMessage>{errorOtp}</ErrorMessage>}
            </FlexDiv>
            <SubmitButton onClick={(e) => handleSubmitOTP(e)}>
              Submit
            </SubmitButton>
          </OtpInputModal>
        </ModalParentDiv>
      )}
    </>
  );
};

export default ForgotPassword;