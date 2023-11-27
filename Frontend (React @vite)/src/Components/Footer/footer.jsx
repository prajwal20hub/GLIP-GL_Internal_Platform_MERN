import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";
import { useSelector } from "react-redux";

import {
    Para,
    TermsAndConditions,
    TermsAndConditionsText,
    Flex,
    DivTnC,
    DivNoE,
    Button,
    ButtonTnC,
    UL,
    Li,
    FooterA,
    ButtonCloseTnC,
    DivCloseButton,
    BottomDiv,
    ParaNoOfEmployee,
} from "./footer.style";

const Footer = () => {
    const isloggedin = useSelector((state)=> state.isloggedin)

    const [modalval, setmodalval] = useState(false);
    const showTnC = () => {
        modalval ? setmodalval(false) : setmodalval(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    // -------------------------------------------------------------- //
    const dispatch = useDispatch();
    const [totalReg, setTotalReg] = useState()

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`/api/total-registrations`)
            .then((res) => {
                setTotalReg(res.data.total_registrations)
                dispatch({
                    type: "TOTAL_REGISTERED",
                    payload: res.data.total_registrations
                });
            })
            .catch((err)=> {
                console.log(err)
                setTotalReg('Error')
            })
    }

    const termsAndCondtionsObj = [ 
        "1. Intellectual Property: All the Content, Logo, Images and Visual Media is owned by GLIP", 
        "2. Copywrite : All of the property in website is protected by Copywrite and Governing laws in India", 
        "3. Termination : Use of abusive language, Inappropriate behavior and violating laws leads to termination of user account", 
        "4. Link to other Websites : GLIP is not taking a responsibility of clicking on third party links", 
        "5. Multiple Accounts : To Create multiple accounts for the purpose of voting for against users' Visual Content", 
        "6. Spam URL: To create or transmit unwanted 'spam' to any person or any URL", 
        "7. Reward: Rewards may be taxable, depending on the value of the item and the federal, state, and local tax laws applicable to Member." ]
       
    return (
        <>
            <div>
                <Flex className="row">
                    <div className="col-md-3">
                        <UL>
                            {!isloggedin && 
                                <Li>
                                <Link to="/login" style={{ textDecoration: "none" }}><FooterA>Login</FooterA></Link>
                            </Li>
                            }
                            <Li>
                                <Link to="/aboutus" style={{ textDecoration: "none" }}><FooterA>About Us</FooterA></Link>
                            </Li>

                            <Li>
                                <Link to="/careers" style={{ textDecoration: "none" }}>
                                    <FooterA>Careers</FooterA>
                                </Link>
                            </Li>

                        </UL>
                    </div>

                    <div className="col-md-9">
                        <div>
                            <BottomDiv>
                                <div>
                                    <DivTnC>
                                        <ButtonTnC onClick={showTnC}>
                                            Terms & Conditions
                                        </ButtonTnC>
                                        <Para>
                                            &copy; 2023 GlobalLogic Inc. All
                                            rights reserved
                                        </Para>
                                    </DivTnC>
                                </div>

                                <div>
                                    <DivNoE>Total Registrations
                                        <ParaNoOfEmployee>
                                            {totalReg}
                                        </ParaNoOfEmployee>
                                    </DivNoE>
                                </div>
                            </BottomDiv>
                        </div>
                    </div>
                </Flex>
            </div>

            {modalval && (
                <div className="position-absolute top-50 start-50 translate-middle col-sm-5 footer-home">
                    <TermsAndConditions>
                        <div>
                            <DivCloseButton>
                                <CloseButton
                                    onClick={showTnC}
                                    style={ 
                                        { backgroundColor: "#f84f07",  
                                          borderColor: "#f84f07" }}
                                />
                            </DivCloseButton>
                            <TermsAndConditionsText>
                                {termsAndCondtionsObj?.map((point) => (
                                    <>  <div>{point}</div><br /></>
                                ))}
                            </TermsAndConditionsText>
                        </div>
                    </TermsAndConditions>
                </div>
            )}
        </>
    );
};

export default Footer;
