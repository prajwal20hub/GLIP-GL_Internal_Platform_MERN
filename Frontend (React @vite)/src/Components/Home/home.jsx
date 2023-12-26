import React from 'react'
import Navbar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import BackToTop from './back-to-top';
import {
    DivMainHome,
    DivMainHomeCarousel,
    ImgCarousel,
    DivBodyHome,
    PHomeTaglineGL1,
    PHomeTaglineGL2,
    PHomeTagDescription,
    PHomeTaglineGL2Letters,
} from "./home.style";
import corousel1 from "../../Utils/Images/Corousel-1.jpg";
import corousel2 from "../../Utils/Images/Corousel-2.jpg";
import corousel3 from "../../Utils/Images/Corousel-3.jpg";

const Home = () => {
    const headingGL = ["G", "l", "o", "b", "a", "l", "L", "o", "g", "i", "c"];
    const carousal = [
        {
            'src': corousel1,
            'classNameName': "d-block w-100",
            'alt': "Image not Available"
        },
        {
            'src': corousel2,
            'className': "d-block w-100",
            'alt': "Image not Available"
        },
        {
            'src': corousel3,
            'className': "d-block w-100",
            'alt': "Image not Available"
        }
    ]

    const carousButton = [
        {
            'type': "button",
            'data-bs-target': "#carouselExampleCaptions",
            'data-bs-slide-to': "0",
            'className': "active",
            'aria-current': "true",
            'aria-label': "Slide 1"
        },
        {
            'type': "button",
            'data-bs-target': "#carouselExampleCaptions",
            'data-bs-slide-to': "1",
            'aria-label': "Slide 2"
        },
        {
            'type': "button",
            'data-bs-target': "#carouselExampleCaptions",
            'data-bs-slide-to': "2",
            'aria-label': "Slide 3"
        }
    ]
return (
    <>
        <Navbar />
        <DivMainHome>
            <DivMainHomeCarousel>
                <div
                    id="carouselExampleCaptions"
                    className="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">       
                    {carousButton.map((cbtn)=> (
                         <button {...cbtn}></button>
                    ))}
                    </div>

                    <div className="carousel-inner">
                    {carousal.map((car,index) => (
                            <div
                                className= {index===0 ? "carousel-item active" :  "carousel-item"}
                                data-bs-interval="5000">
                                <ImgCarousel {...car} />
                            </div>
                    ))}
                     </div>
                </div>
            </DivMainHomeCarousel>
            <DivBodyHome>
                <PHomeTaglineGL1>

                    We are &nbsp;
                </PHomeTaglineGL1>
                <PHomeTaglineGL2>

                    {headingGL.map((letter) => (
                        <PHomeTaglineGL2Letters>
                            {letter}
                        </PHomeTaglineGL2Letters>
                    ))}

                </PHomeTaglineGL2>
                <PHomeTagDescription>
                    For over 20 years, GlobalLogic has partnered with
                    businesses across every major industry to make amazing
                    products and connect the dots between people, products,
                    and business opportunities. In 2021, GlobalLogic was
                    acquired by Hitachi Ltd. GlobalLogic’s capabilities,
                    combined with Hitachi’s Lumada, enables us to deploy
                    Hitachi’s extensive library of digital solutions to the
                    global market and to help customers and societies solve
                    their issues through Agile application development in
                    the cloud.
                </PHomeTagDescription>
            </DivBodyHome>
        </DivMainHome>
        <Footer />
        <BackToTop />
    </>
)
}

export default Home