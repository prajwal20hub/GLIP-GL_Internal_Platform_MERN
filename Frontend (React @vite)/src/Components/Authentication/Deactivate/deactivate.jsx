import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import validationDeactivate from './validationDeactivate';
import { useSelector } from 'react-redux';

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
  ErrorMessage
} from '../Register/forms.style.js';
import GLlogo from '../../../Utils/Images/GL-logo.jpg'

const Deactivate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currUser = useSelector((state) => state.currUser);

  const [user, setUser] = useState({
    email: "",
  })

  const { email } = user;

  var arrUserKeys = Object.keys(user);
  var arrUservalues = Object.values(user);

  useEffect(() => {
    arrUservalues = Object.values(user);
  }, [user])

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value });

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
    e.preventDefault();
    const deactivateError = validationDeactivate(email)

    if (deactivateError !== null) {
      setError(deactivateError);
    }
    else if(currUser.email !== email){
      setError('Email is Incorrect!');
      Swal.fire("Oops!",'Email is Incorrect!', "error");
    }
    else {
      setError(null);
      await axios.delete(`/api/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`          //for verification (IMP)
        }
      })
        .then((res) => {
          Swal.fire("Congrats", "You have Deactivated Your Account Successfully.", "success");
          localStorage.clear();
          window.location.href = '/';
        })
        .catch((err) => {
          console.log(err)
          Swal.fire("Oops!", err.response.data.message, "error");
          setError(err.response.data.message)
        });
    }
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

  return (
    <FormBackground>
      <Link to='/'>
        <FormLogo src={GLlogo} />
      </Link>
      <FormContainer>
        <FormHeading> Deactivate </FormHeading>
        {formProp.map((obj, index) => (
          <>
            <FormLabel name={obj.name}>{obj.label}</FormLabel><FormAstric>*</FormAstric>
            <FormInput type="text" {...obj} />
          </>
        )
        )}

        <FlexDiv>
          {error && <ErrorMessage className="errorMessage">{error}</ErrorMessage>}
        </FlexDiv>

        <FlexDiv>
          <SubmitButton onClick={e => onSubmit(e)}>Deactivate</SubmitButton>
        </FlexDiv>

      </FormContainer>
    </FormBackground>

  );
}

export default Deactivate;