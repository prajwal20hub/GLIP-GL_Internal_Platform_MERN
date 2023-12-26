import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationLogin from './validationLogin';
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
  SpanText,
  FormLinks
} from '../Register/forms.style.js';
import GLlogo from '../../../Utils/Images/GL-logo.jpg'

const Login = () => {
  const Base_URL = import.meta.env.VITE_BASE_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const { email, password } = user;

  var arrUserKeys = Object.keys(user);

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    for (let i = 0; i < n; i++) {
      if (Object.values(user)[i] === '') {
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

  const onSubmit = async(e) => {
    e.preventDefault();
    const loginError = validationLogin(user);             //validation

    if (loginError !== null) {
      setError(loginError);
      return;
    }
    else {
      setError(null);
      await axios.post(`${Base_URL}/api/users/login`, user)
        .then((res)=> {
          localStorage.token = res.data.accesstoken;   //set jwt token to localstorage
          dispatch({type: 'LOGIN'});
          Swal.fire("Congrats", res.message , "success");
          navigate(`/dashboard/${res.data.id}`);
          return;
        })
        .catch((err) => {
          console.log(err)
          Swal.fire("Oops!", err.response.data.message , "error");
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

  const formProp = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your Email',
      value: email,
      onChange: (e) => onInputChange(e, 0)
    }
  ]

  const formPass = [
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your Password',
      value: password,
      onChange: (e) => onInputChange(e, 1),
      showStatus: show,
      visibilityFunc: changeVisibility
    }
  ]

  return (
    <FormBackground>
      <Link to='/'>
        <FormLogo src={GLlogo} />
        </Link>
      <FormContainer>
        <FormHeading> Login </FormHeading>
        {formProp.map((obj) => (
          <>
            <FormLabel name={obj.name}>{obj.label}</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInput type="text" {...obj} />
          </>
        )
        )}

        {formPass.map((obj) => (
          <>
            <FormLabel name={obj.name}>{obj.label}</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInput type={obj.showStatus ? "text" : "password"} {...obj}
            />
            {obj.showStatus ? <VisibilityOffIcon onClick={obj.visibilityFunc} /> : <VisibilityIcon onClick={obj.visibilityFunc} />}
          </>
        )
        )}

        <FlexDiv>
          {error && <ErrorMessage className="errorMessage">{error}</ErrorMessage>}
        </FlexDiv>

        <FlexDiv>
          <SubmitButton onClick={e => onSubmit(e)}>Login</SubmitButton>
        </FlexDiv>

        <LinksDiv>
          <Link style={{ textDecoration: 'none' }}
            to="/forgotpassword">
            <FormLinks>Forgot Password</FormLinks>
          </Link>
        </LinksDiv>

        <LinksDiv>
        <SpanText>Not Registered?</SpanText>
          <Link style={{ textDecoration: 'none' }}
            to="/register">
            <FormLinks>Register</FormLinks>
          </Link>
        </LinksDiv>
      </FormContainer>
    </FormBackground>

  );
}

export default Login;