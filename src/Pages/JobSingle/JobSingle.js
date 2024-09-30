import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import locales from '../../Constants/en.json'
import Banner from '../../assets/images/jobsingle_page_banner.png'
import { ReactComponent as Usercog } from '../../assets/images/user-cog.svg'
import Upload from '../../assets/images/upload.svg'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Usflag from '../../assets/images/us_flag.png'
import UploadImage from '../../assets/images/upload_image.svg'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import MapPin from '../../assets/images/map-pin.svg'
import Clock from '../../assets/images/clock-9.svg'
// import Swiper JS
import Swiper from 'swiper'
// import Swiper styles
import 'swiper/css'
// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import './JobSingle.scss'

function JobSingle() {
    const [country, setCountry] = useState('')

    const handleChange = event => {
        setCountry(event.target.value)
    }

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
            navigation: false,

            // And if we need scrollbar
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
            modules: [Autoplay, Navigation, Pagination],
            slidesPerView: 2,
            spaceBetween: 20,
        })
    })

    const swiperData = [
        {
            professionInfo: 'Product Designer',
            status: 'Design',
            info: 'We’re looking for a Senior Product Designer to join our team.',
        },
        {
            professionInfo: 'Engineering manager',
            status: 'Software',
            info: 'We’re looking for a Senior Product Designer to join our team.',
        },
        {
            professionInfo: 'Product Designer',
            status: 'Design',
            info: 'We’re looking for a Senior Product Designer to join our team.',
        },
        {
            professionInfo: 'Engineering manager',
            status: 'Software',
            info: 'We’re looking for a Senior Product Designer to join our team.',
        },
        {
            professionInfo: 'Product Designer',
            status: 'Design',
            info: 'We’re looking for a Senior Product Designer to join our team.',
        },
        {
            professionInfo: 'Engineering manager',
            status: 'Software',
            info: 'We’re looking for a Senior Product Designer to join our team.',
        },
    ]

    return (
        <React.Fragment>
            <div className='jobSingle_page_container'>
                <div className='jobsingle_page_banner'>
                    <img src={Banner} alt='banner' className='banner_img'></img>
                </div>
                <div className='job_content_container'>
                    <div className='container'>
                        <div className='jobcontent_flexbox'>
                            <div className='job_content'>
                                <div className='content_box'>
                                    <h5 className='section_title'>Job Description</h5>
                                    <p className='description'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum Sed ut perspiciatis unde
                                        omnis iste natus error sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                        inventore veritatis et quasi architecto beatae vitae dicta
                                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                        aspernatur aut odit aut fugit, sed quia consequuntur magni
                                        dolores eos qui ratione voluptatem sequi nesciunt. Neque
                                        porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                        consectetur, adipisci velit
                                    </p>
                                </div>
                                <div className='content_box'>
                                    <h5 className='section_title'>Requirements</h5>
                                    <p className='description'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum Sed ut perspiciatis unde
                                        omnis iste natus error sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                        inventore veritatis et quasi architecto beatae vitae dicta
                                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                        aspernatur aut odit aut fugit, sed quia consequuntur magni
                                        dolores eos qui ratione voluptatem sequi nesciunt. Neque
                                        porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                        consectetur, adipisci velit
                                    </p>
                                    <ul className='requirement_point'>
                                        <li>Work experience</li>
                                        <li>Work experience</li>
                                        <li>Work experience</li>
                                    </ul>
                                </div>
                                <div className='content_box'>
                                    <h5 className='section_title'>We offer</h5>
                                    <p className='description'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt mollit anim id est laborum Sed ut perspiciatis unde
                                        omnis iste natus error sit voluptatem accusantium doloremque
                                        laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                        inventore veritatis et quasi architecto beatae vitae dicta
                                        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                        aspernatur aut odit aut fugit, sed quia consequuntur magni
                                        dolores eos qui ratione voluptatem sequi nesciunt. Neque
                                        porro quisquam est, qui dolorem ipsum quia dolor sit amet,
                                        consectetur, adipisci velit
                                    </p>
                                    <ul className='requirement_point'>
                                        <li>Work experience</li>
                                        <li>Work experience</li>
                                        <li>Work experience</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='job_details'>
                                <div className='head'>
                                    <h5 className='title'>{locales.Job_details_title}</h5>
                                    <button className='share_btn'>
                                        <span className='icon'>
                                            <img src={Upload} alt='icon'></img>
                                        </span>
                                        {locales.share_title}
                                    </button>
                                </div>
                                <div className='body'>
                                    <ul className='job_info_points'>
                                        <li>
                                            <span className='label'>
                                                <span className='icon'>
                                                    <Usercog />
                                                </span>
                                                Monthly salary
                                            </span>
                                            <span className='value'>$ 14,000-$ 25,000</span>
                                        </li>
                                        <li>
                                            <span className='label'>
                                                <span className='icon'>
                                                    <Usercog />
                                                </span>
                                                Experience
                                            </span>
                                            <span className='value'>2-3 years</span>
                                        </li>
                                        <li>
                                            <span className='label'>
                                                <span className='icon'>
                                                    <Usercog />
                                                </span>
                                                Address
                                            </span>
                                            <span className='value'>Yerevan, Armenia</span>
                                        </li>
                                        <li>
                                            <span className='label'>
                                                <span className='icon'>
                                                    <Usercog />
                                                </span>
                                                Jobe type
                                            </span>
                                            <span className='value'>Full time</span>
                                        </li>
                                    </ul>
                                    <button className='apply_job_Btn'>Apply for job</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='join_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Join</h5>
                        <h4 className='title'>Get In Touch</h4>
                        <span className='info'>We would love to hear from you!</span>
                        <div className='form_container'>
                            <form>
                                <div className='input_flexbox'>
                                    <div className='inputField'>
                                        <label>Your name</label>
                                        <input
                                            type='text'
                                            className='input_element'
                                            placeholder='Input'
                                        ></input>
                                    </div>
                                    <div className='inputField'>
                                        <label>Email</label>
                                        <input
                                            type='text'
                                            className='input_element'
                                            placeholder='you@example.com'
                                        ></input>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='inputField'>
                                        <label>Contact Number</label>
                                        <div className='country_selectBox'>
                                            <Select
                                                labelId='demo-simple-select-label'
                                                id='demo-simple-select'
                                                value={country}
                                                label='Age'
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'US'}>
                                                    <img
                                                        src={Usflag}
                                                        alt='flag'
                                                        className='flag_icon'
                                                    ></img>{' '}
                                                    US
                                                </MenuItem>
                                                <MenuItem value={'IND'}>IND</MenuItem>
                                                <MenuItem value={'ENG'}>ENG</MenuItem>
                                            </Select>
                                            <input
                                                type='text'
                                                className='country_input_element'
                                                placeholder='+1 (000) 000-0000'
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='upload_box'>
                                    <label>CV</label>
                                    <div className='drag_drop'>
                                        <div className='content'>
                                            <span className='upload_icon'>
                                                <img
                                                    src={UploadImage}
                                                    alt='upload_icon'
                                                    className='upload_img'
                                                ></img>
                                            </span>
                                            <div className='section-title'>
                                                Drop your files here or
                                                <span className='highlight'>browse</span>
                                            </div>
                                            <span className='max_limit'>Maximum size: 50MB</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='motivation_letterBox'>
                                    <label>Motivation letter</label>
                                    <textarea
                                        placeholder='you@email.com'
                                        className='textarea_box'
                                    ></textarea>
                                </div>
                                <div className='agree_termcheckBox_container'>
                                    <FormControlLabel
                                        className='agree_term'
                                        control={<Checkbox />}
                                        label='I agree that my submitted data is being collected and stored.'
                                    />
                                </div>
                                <button className='submit_btn'>{locales.submit_title}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='jobs_interest_section'>
                    <div className='container'>
                        <h4 className='title'>Jobs you may be interested in!</h4>
                        <p className='description'>
                            "Our philosophy is clear and direct: we believe in building a team of
                            diverse, passionate individuals and nurturing a culture that empowers
                            everyone to do their best work."
                        </p>
                        <div className='slider_container'>
                            <div class='swiper'>
                                <div class='swiper-wrapper'>
                                    {swiperData &&
                                        swiperData.length > 0 &&
                                        swiperData.map((item, index) => {
                                            return (
                                                <div class='swiper-slide'>
                                                    <div className='testimonial_card'>
                                                        <p className='details'>
                                                            <span className='slide-title'>
                                                                {item.professionInfo}
                                                            </span>
                                                            <span className='status'>
                                                                {item.status}
                                                            </span>{' '}
                                                            <Link className='viewjob_link'>
                                                                View job
                                                            </Link>
                                                        </p>
                                                        <div className='content'>
                                                            <p className='info'>{item.info}</p>
                                                            <ul className='list_type'>
                                                                <li>
                                                                    <span className='icon'>
                                                                        <img
                                                                            src={MapPin}
                                                                            alt='icon'
                                                                        ></img>
                                                                    </span>
                                                                    <span className='text'>
                                                                        Remote
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span className='icon'>
                                                                        <img
                                                                            src={Clock}
                                                                            alt='icon'
                                                                        ></img>
                                                                    </span>
                                                                    <span className='text'>
                                                                        Full-time
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>

                                <div class='swiper-pagination'></div>

                                <div class='swiper-button-prev'></div>
                                <div class='swiper-button-next'></div>

                                {/* <div class="swiper-scrollbar"></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default JobSingle
