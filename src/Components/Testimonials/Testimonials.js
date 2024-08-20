import React, { useEffect, useState } from 'react';
import locales from "../../Constants/en.json";
import './Testimonials.scss';
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Avatar from "../../assets/images/avatar-large.png";
function Testimonials() {

    const swiperData = [
        {
            info: "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.",
            image: Avatar,
            title: "Mark Villiams",
            profession: "Product Manager | Capsule"

        },
        {
            info: "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.",
            image: Avatar,
            title: "Mark Villiams",
            profession: "Product Manager | Capsule"

        },
        {
            info: "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.",
            image: Avatar,
            title: "Mark Villiams",
            profession: "Product Manager | Capsule"

        },
        {
            info: "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.",
            image: Avatar,
            title: "Mark Villiams",
            profession: "Product Manager | Capsule"

        },
        {
            info: "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.",
            image: Avatar,
            title: "Mark Villiams",
            profession: "Product Manager | Capsule"

        },
        {
            info: "I just wanted to say that I'm very happy with my purchase so far. The documentation is outstanding - clear and detailed.",
            image: Avatar,
            title: "Mark Villiams",
            profession: "Product Manager | Capsule"

        },
    ]

    useEffect(() => {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            // direction: 'vertical',
            loop: true,
    
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            autoplay: {
                delay: 5000,
              },
    
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
    
            // And if we need scrollbar
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
            modules: [Autoplay, Navigation, Pagination],
            slidesPerView: 2,
            spaceBetween: 20,
        });
    })

   

    return (
        <React.Fragment>
            <div className='testimonials_section'>
                <div className='container'>
                    <h5 className='subtitle'>Enhance</h5>
                    <h4 className='title'>Happy Customers</h4>
                    <p className='info'>Hear what our customers have to say about us</p>
                    <div className='slider_container'>
                        <div class="swiper" >
                            <div class="swiper-wrapper">
                                {
                                    swiperData &&
                                    swiperData.length > 0 &&
                                    swiperData.map((item, index) => {
                                        return (
                                            <div class="swiper-slide">
                                                <div className='testimonial_card'>
                                                    <p className='details'>{item.info}</p>
                                                    <div className='flexbox'>
                                                        <div className='img_block'>
                                                            <img src={item.image} alt="icon"></img>
                                                        </div>
                                                        <div className='content'>
                                                            <h4 className='title'>{item.title}</h4>
                                                            <span className='profession'>{item.profession}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div class="swiper-pagination"></div>


                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>


                            {/* <div class="swiper-scrollbar"></div> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Testimonials;