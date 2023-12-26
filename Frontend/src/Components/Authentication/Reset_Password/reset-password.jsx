import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationResetPass from './reset-passwordValidation';
import { Link } from 'react-router-dom';
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
  LinksDiv,
  FormLinks
} from '../Register/forms.style.js';
import GLlogo from '../../../Utils/Images/GL-logo.jpg'

const ResetPassword = () => {
  const Base_URL = import.meta.env.VITE_BASE_URL;
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({         //objects
    password: '',
    confirmPass: ''
  })

  const { password, confirmPass } = user;

  var arrUserKeys = Object.keys(user);
  var arrUservalues = Object.values(user)

  useEffect(() => {
    arrUservalues = Object.values(user)
  }, [user])

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value });          //single object

    for (let i = 0; i < n; i++) {
      if (arrUservalues[i] === '') {
        (document.getElementsByName(arrUserKeys[i]))[0].style.color = "red";
        (document.getElementsByName(arrUserKeys[i]))[1].style.borderBottom = "2px solid red";
      }
    }

    if (e.target.value === '') {
      e.target.style.borderBottom = "2px solid red";
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = "red";
    }
    else {
      e.target.style.borderBottom = null;
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = null;
    }
  }

  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();       //PREVENT REFRESH OF PAGE
    const resetPassError = validationResetPass(user);

    if (resetPassError !== null) {
      setError(resetPassError);
    }
    else {
      await axios.put(`${Base_URL}/api/users/reset-password`, { password }, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then((res) => {
          setError(null)
          Swal.fire("Congrats", "You have Successfully Reset Your Password!", "success");
          navigate(`/dashboard/${id}`);
        })
        .catch((err) => {
          console.log(err)
          Swal.fire("Oops!", err.response.data.message, "error");
          setError(err.response.data.message)
        })
    }
  }

  //password hide & show
  const [show, setShow] = useState(false);
  const changeVisibility = (e) => {
    e.preventDefault();
    setShow(current => !current);
  }
  //confirm password hide & show
  const [showCP, setShowCP] = useState(false);
  const changeVisibilityCP = (e) => {
    e.preventDefault();
    setShowCP(current => !current);
  }

  const formPass = [
    {
      name: 'password',
      label: 'New Password',
      placeholder: 'Enter your New Password',
      value: password,
      onChange: (e) => onInputChange(e, 0),
      showStatus: show,
      visibilityFunc: changeVisibility
    },
    {
      name: 'confirmPass',
      label: 'Confirm New Password',
      placeholder: 'Enter your Confirm New Password',
      value: confirmPass,
      onChange: (e) => onInputChange(e, 1),
      showStatus: showCP,
      visibilityFunc: changeVisibilityCP
    }
  ];

  return (
    <FormBackground>
      <Link to='/'>
        <FormLogo src={GLlogo} />
      </Link>
      <FormContainer>
        <FormHeading> Reset Password </FormHeading>

        {formPass.map((obj) => (
          <>
            <FormLabel name={obj.name}> {obj.label} </FormLabel>
            <FormAstric className='required-astric'>*</FormAstric>
            <FormInput type={obj.showStatus ? "text" : "password"} {...obj}
            />
            {obj.showStatus ? <VisibilityOffIcon onClick={obj.visibilityFunc} /> : <VisibilityIcon onClick={obj.visibilityFunc} />}
          </>
        )
        )}

        <FlexDiv>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FlexDiv>

        <FlexDiv>
          <SubmitButton onClick={e => onSubmit(e)}>Reset Password</SubmitButton>
        </FlexDiv>

        <LinksDiv>
          <Link style={{ textDecoration: 'none' }}
            to={`/dashboard/${id}`}>
            <FormLinks>Go to Dashboard</FormLinks>
          </Link>
        </LinksDiv>

        {/* <LinksDiv>
          <Link style={{ textDecoration: 'none' }}
            to={`/deactivate/${id}`}>
            <FormLinks>Deactivate Account</FormLinks>
          </Link>
        </LinksDiv> */}

      </FormContainer>
    </FormBackground>

  )
}

export default ResetPassword