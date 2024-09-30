import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import {
    Routes, Route, Link,
    useLocation,
    Navigate,
    useNavigate
} from "react-router-dom";
import { ReactComponent as RightArrow } from "../../assets/images/chevron-right.svg";
import BlogFooterBanner from "../../assets/images/blog_footer_banner.png"
import Upload from "../../assets/images/upload.svg";
import BlogPost1 from "../../assets/images/blog_post_1.png";
import BlogPost2 from "../../assets/images/blog_post_2.png";
import BlogPost3 from "../../assets/images/blog_post_3.png";
import BlogPost4 from "../../assets/images/blog_post_4.png";
import BlogAvatar1 from "../../assets/images/blog_avatar_1.png";
import BlogAvatar2 from "../../assets/images/blog_avatar_2.png";
import BlogAvatar3 from "../../assets/images/blog_avatar_3.png";
import BlogAvatar4 from "../../assets/images/blog_avatar_4.png";
import ArticleBanner1 from "../../assets/images/article_banner1.png";
import ArticleBanner2 from "../../assets/images/article_banner2.png";
import ArticleBanner3 from "../../assets/images/article_banner3.png";
import ArticleBanner4 from "../../assets/images/article_banner4.png";
import "./Article.scss";


function Article() {
    const navigate = useNavigate();

    const BlogPostData = [
        {
            image: BlogPost1,
            label: "Energy",
            duration: "5 min read",
            heading: "How to write content about your photographs",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar1,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost2,
            label: "Science",
            duration: "5 min read",
            heading: "How a visual artist redefines success in graphic design",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar2,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost3,
            label: "Travel",
            duration: "5 min read",
            heading: "Caring is the new marketing",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar3,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost4,
            label: "Education",
            duration: "5 min read",
            heading: "How to design your site footer like we did",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar4,
            profileName: "By Lauren Waller"
        },
    ]

    return (
        <React.Fragment>
            <div className='article_page_section'>
                <div className='header'>
                    <div className='container'>
                        <button className='back_btn' onClick={() => {
                            navigate("/blog")
                        }}>
                            <span className='icon'><RightArrow /></span> Back to blog
                        </button>
                    </div>
                </div>
                <div className='post_content_section'>
                    <div className='container'>
                        <div className='post_content_flexbox'>
                            <div className='left_content'>
                                <div className='upper_section'>
                                    <div className='sector_type'>Company News</div>
                                    <h2 className='section_title'>Announcing a free plan for small teams</h2>
                                    <ul className='profile_data'>
                                        <li>
                                            <span className='icon'>
                                                <img src={BlogAvatar1} alt="icon" className="profile_icon"></img>
                                            </span>
                                            By Lauren Waller
                                        </li>
                                        <li>
                                            January 28, 2023
                                        </li>
                                        <li>
                                            5 min read
                                        </li>
                                    </ul>
                                    <p className='description'>
                                        At preline, our mission has always been focused on bringing openness and transparency to the design process. We've always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow. At preline, our mission has always been focused on bringing openness and transparency to the design process. We've always believed that by providing a space where designers can share ongoing work not only empowers them to make better products, it also helps them grow.
                                    </p>
                                    <p className='description'>
                                        We're proud to be a part of creating a more open culture and to continue building a product that supports this vision.
                                    </p>
                                    <div className='thumbnail_section'>
                                        <div className='flexbox'>
                                            <div className='left_section'>
                                                <div className='thumbnail_box'>
                                                    <img src={ArticleBanner1} alt="thumb" className='img_block'></img>
                                                </div>
                                                <div className='thumbnail_box'>
                                                    <img src={ArticleBanner2} alt="thumb" className='img_block'></img>
                                                </div>
                                            </div>
                                            <div className='right_section'>
                                                <div className='thumbnail_box'>
                                                    <img src={ArticleBanner3} alt="thumb" className='img_block'></img>
                                                </div>
                                            </div>
                                        </div>
                                        <span className='process_type'>Cooking process</span>
                                    </div>
                                    <p className='description'>
                                        As we've grown, we've seen how Preline has helped companies such as Spotify, Microsoft, Airbnb, Facebook, and Intercom bring their designers closer together to create amazing things. We've also learned that when the culture of sharing is brought in earlier, the better teams adapt and communicate with one another.
                                    </p>
                                    <p className='description'>
                                        That's why we are excited to share that we now have a Lorem ipsum which will allow individual designers, startups and other small teams a chance to create a culture of openness early on.
                                    </p>
                                </div>
                                <div className='bottom_section'>
                                    <h3 className='section_title'>
                                        To say that switching to Preline has been life-changing is an understatement. My business has tripled and I got my life back.
                                    </h3>
                                    <span className='subtitle'>Nicole Grazioso</span>
                                    <div className='banner_block'>
                                        <img src={ArticleBanner4} alt="banner" className='banner_img'></img>
                                    </div>
                                    <span className='process'>Cooking process</span>
                                    <h5 className='second_title'>Bringing the culture of sharing to everyone</h5>
                                    <p className='description'>We know the power of sharing is real, and we want to create an opportunity for everyone to try Preline and explore how transformative open communication can be. Now you can have a team of one or two designers and unlimited spectators (think PMs, management, marketing, etc.) share work and explore the design process earlier.</p>
                                    <ul className='listing_point'>
                                        <li>Preline allows us to collaborate in real time and is a really great way for leadership on the team to stay up-to-date with what everybody is working on," said Stewart Scott-Curran, Intercom's Director of Brand Design.</li>
                                        <li>Preline opened a new way of sharing. It's a persistent way for everyone to see and absorb each other's work," said David Scott, Creative Director at Eventbrite.</li>
                                    </ul>
                                    <p className='description'>Small teams and individual designers need a space where they can watch the design process unfold, both for themselves and for the people they work with – no matter if it's a fellow designer, product manager, developer or client. Preline allows you to invite more people into the process, creating a central place for conversation around design. As those teams grow, transparency and collaboration becomes integrated in how they communicate and work together.</p>

                                    <div className='footer_flexbox'>
                                        <ul className='plan_points'>
                                            <li>Plan</li>
                                            <li>Web Development</li>
                                            <li>Free</li>
                                            <li>Team</li>
                                        </ul>
                                        <button className='share_btn'><span className='icon'><img src={Upload} alt="icon"></img></span>{locales.share_title}</button>
                                    </div>
                                </div>
                            </div>
                            <div className='right_post'>
                                <h4 className='section_title'>Featured posts</h4>
                                {
                                    BlogPostData &&
                                    BlogPostData.length > 0 &&
                                    BlogPostData.map((item, index) => {
                                        return (
                                            <div className='card_flexbox' key={index}>
                                                <div className='content'>
                                                    <h4 className='card_title'>{item.heading}</h4>
                                                    <div className='info_flex'>
                                                        <span className='label'>{item.label}</span>
                                                        <span className='duration'>{item.duration}</span>
                                                    </div>
                                                </div>
                                                <div className='thumbnail'>
                                                    <img src={item.image} alt="icon" className='img_block'></img>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='blog_post_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Our Values</h5>
                        <h4 className='title'>Popular posts</h4>
                        <span className='description'>
                            Stay informed with our latest blog posts.
                        </span>
                        <div className='flexbox'>
                            {
                                BlogPostData &&
                                BlogPostData.length > 0 &&
                                BlogPostData.map((item, index) => {
                                    return (
                                        <div className='column_card' key={index} onClick={() => {
                                            navigate("/Article")
                                        }}>
                                            <div className='thumbnail'>
                                                <img src={item.image} alt="icon"></img>
                                            </div>
                                            <div className='content'>
                                                <div className='label_flexbox'>
                                                    <span className='label'>{item.label}</span>
                                                    <span className='duration'>
                                                        {item.duration}
                                                    </span>
                                                </div>
                                                <h5 className='title'>{item.heading}</h5>
                                                <p className='description'>{item.describe}</p>
                                                <div className='profile_flexbox'>
                                                    <span className='profile_icon'><img src={item.profileIcon} alt="icon"></img></span>
                                                    <span className='profilename'>{item.profileName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
                <div className='blog_footer_banner'>
                    <img src={BlogFooterBanner} alt="banner" className='banner_img'></img>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Article;