import React, { useState } from 'react';
import Coins from "../../../../../assets/images/coins.svg";
import FileWarm from "../../../../../assets/images/file-warning.svg";
import Dollar from "../../../../../assets/images/circle-dollar-sign.svg";
import { ReactComponent as Alert } from "../../../../../assets/images/alert-triangle.svg";
import { Select } from '../../../../common';
import Max from "../../../../../assets/images/maximize.svg";
import list from "../../../../../assets/images/list.svg";
import Star from "../../../../../assets/images/star.svg";
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import Team1 from "../../../../../assets/images/team_1.png";
import Team2 from "../../../../../assets/images/team_2.png";
import Team3 from "../../../../../assets/images/team_3.png";
import Team4 from "../../../../../assets/images/team_4.png";
import Draggable from 'react-draggable';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import './Sales&Purchase.scss'

function SalesPurchase() {
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

  const data = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        data: [12, 3, 25,],
        backgroundColor: [
          'rgb(229 231 235)',
          'rgb(0 152 89)',
          'rgb(0 119 70)',
        ],
        borderColor: 'rgb(242 245 250)', // White color for gaps
        borderWidth: 5, // Adjust this value for the gap size
        hoverBorderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    cutout: '70%', // Adjust this value for the thickness of the doughnut
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  const verticalBarThickData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '',
        data: [5, 10, 15, 25, 40, 5, 10, 15, 25, 40, 10, 15,],
        backgroundColor: ['rgb(0 119 70)', 'rgb(0 152 89)', 'rgb(51 185 129)'],
        borderColor: 'rgb(242 245 250)',
        borderWidth: 1,
        barThickness: 10, // Set the bar thickness here
      },
    ],
  };

  const verticalBaroptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the dataset labels
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // This will remove vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, values) {
            // Custom left vertical labels
            return `$${value}k`;
          },
        },
      },
    },
  };

  const saleProductdata = {
    labels: ['Amoxicillin', 'Benzonatate', 'Doxycycline', 'Cyclobenzaprine', 'Entresto', 'Cymbalta', 'Azithromycin', 'Amitriptyline', 'Biktarvy', 'Acetaminophen', 'Ativan'],
    datasets: [
      {
        label: 'My Dataset',
        data: [5, 10, 15, 25, 40, 5, 10, 15, 25, 40, 10,],
        backgroundColor: ['rgb(0 119 70)', 'rgb(0 152 89)', 'rgb(51 185 129)'],
        borderColor: 'rgb(242 245 250)',
        borderWidth: 1,
        barThickness: 10, // Set the bar thickness here
      },
    ],
  };

  const saleProductoptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the dataset labels
      },
    },
    indexAxis: 'y',
    scales: {
      y: {
        grid: {
          display: false, // Disable gridlines for the y-axis
        },

      },
      x: {
        grid: {
          display: true, // Optional: You can disable gridlines for the x-axis too
          borderDash: [2, 2], // Optional: Customize the border dash for gridlines
        },
        ticks: {
          callback: function (value, index, values) {
            // Custom left vertical labels
            return `${index * 10}%`;
          },
        },
      },
    },
  };



  const SaleCategorydata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(0 167 98)',
        tension: 0.1,
      },
    ],
  };

  const SaleCategoryoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the dataset labels
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // This removes the vertical grid lines
        },
      },
      y: {
        grid: {
          borderDash: [2, 2], // Optional: makes the horizontal grid lines dashed
        },
      },
    },
  };


  const ReturnGoodData = {
    // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
      {
        data: [12, 3, 25,],
        backgroundColor: [
          'rgb(229 231 235)',
          'rgb(0 152 89)',
          'rgb(0 119 70)',
        ],
        borderColor: 'rgb(242 245 250)', // White color for gaps
        borderWidth: 5, // Adjust this value for the gap size
        hoverBorderWidth: 0,
      },
    ],
  };

  const ReturnGoodoptions = {
    responsive: false,
    maintainAspectRatio: false,
    cutout: '70%', // Adjust this value for the thickness of the doughnut
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };


  const SaleGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '',
        data: [5, 10, 15, 25, 40, 5, 10, 15, 25, 40, 10, 15,],
        backgroundColor: ['rgb(0 119 70)', 'rgb(0 152 89)', 'rgb(51 185 129)'],
        borderColor: 'rgb(242 245 250)',
        borderWidth: 1,
        barThickness: 10, // Set the bar thickness here
      },
    ],
  };

  const SaleGrowthoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the dataset labels
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false, // This will remove vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, values) {
            // Custom left vertical labels
            return `$${value}k`;
          },
        },
      },
    },
  };

  const saleLeadersData = [
    {
      profilePic: Team1,
      profileName: "Manoj Lawaniya",
      position: "1st",
      SubData: [
        {
          Sales: `11k`,
          Bills: 798,
          GMData: `GM%`,
          Rating: `80%`
        }
      ]
    },
    {
      profilePic: Team2,
      profileName: "Manoj Lawaniya",
      position: "2nd",
      SubData: [
        {
          Sales: `11k`,
          Bills: 798,
          GMData: `GM%`,
          Rating: `80%`
        }
      ]
    },
    {
      profilePic: Team3,
      profileName: "Manoj Lawaniya",
      position: "3rd",
      SubData: [
        {
          Sales: `11k`,
          Bills: 798,
          GMData: `GM%`,
          Rating: `80%`
        }
      ]
    },
    {
      profilePic: Team4,
      profileName: "Manoj Lawaniya",
      position: "4th",
      SubData: [
        {
          Sales: `11k`,
          Bills: 798,
          GMData: `GM%`,
          Rating: `80%`
        }
      ]
    }
  ]

  return (
    <React.Fragment>
      <div className='salepurchase_dashboard'>
        <div className='upperStatus_flexbox'>
          <div className='selectYear'>
            <label className='label'>Select Year</label>
          </div>
          <div className='totalData_flexbox'>
            <div className='icon_block'>
              <img src={Coins} alt="coins_icon" className='icon-img'></img>
            </div>
            <div className='info'>
              <h5 className='title'>Total sale</h5>
              <span className='value'>900K</span>
            </div>
          </div>
          <div className='totalData_flexbox'>
            <div className='icon_block'>
              <img src={FileWarm} alt="filewarm_icon" className='icon-img'></img>
            </div>
            <div className='info'>
              <h5 className='title'>Total profit</h5>
              <span className='value'>10K</span>
            </div>
          </div>
          <div className='totalData_flexbox'>
            <div className='icon_block'>
              <img src={Dollar} alt="dollar_icon" className='icon-img'></img>
            </div>
            <div className='info'>
              <h5 className='title'>Revenue</h5>
              <span className='value'>10K</span>
            </div>
          </div>
          <div className='license_info'>
            <p className='msg'><span className='alert_icon'><Alert /></span><span className='text'>“Your License is Expiring on Dec 20, 2024“</span></p>
          </div>
        </div>
        <div className='draggable_flexContainer'>
          <Draggable bounds="parent">
            <div className='salechannel piechart'>
              <div className='max-view'>
                <span className='maximize'><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <h5 className='section_title'>Sale by channel</h5>
              <div className='chart_container'>
                <Doughnut data={data} options={options} />
              </div>
              <ul className='indicator_info'>
                <li className='indicator_item'>
                  <span className='circle dark-green'></span>
                  <span className='text'>Direct sales</span>
                </li>
                <li className='indicator_item'>
                  <span className='circle off-green'></span>
                  <span className='text'>Online</span>
                </li>
                <li className='indicator_item'>
                  <span className='circle off-gray'></span>
                  <span className='text'>Wholesaler</span>
                </li>
              </ul>
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <div className='salemonth'>
              <div className='max-view'>
                <span className='maximize'><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <div className='head_flexbox'>
                <h5 className='section_title'>Sales by month</h5>
                <div className='selectMonthBox'>
                  <Select
                    label={""}
                    name={"martial_status"}
                    options={[
                      { id: "Jan", value: "Jan" },
                      { id: "Feb", value: "Feb" },
                    ]}
                    wrapperClass={"col12"}
                    // value={values.martial_status}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <div className='indicator'><span className='mark green'></span><span className='text'>Quantity</span></div>
              <div className='chart_container'>
                <Bar data={verticalBarThickData} options={verticalBaroptions} />
              </div>
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <div className='saleProduct'>
              <div className='max-view'>
                <span className='maximize'><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <h5 className='section_title'>Sales by products</h5>
              <div className='chart_container'>
                <Bar data={saleProductdata} options={saleProductoptions} />
              </div>
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <div className='saleLeaders'>
              <div className='headerFlebox'>
                <h5 className='title'>Top sales leaders</h5>
                <button className='options'>
                  <img src={list} alt="list_icon" className='icon'></img>
                </button>
              </div>
              <ul className='saleLeader_listing'>
                {
                  saleLeadersData &&
                  saleLeadersData.length > 0 &&
                  saleLeadersData.map((item, index) => {
                    return (
                      <li className='list_item' key={index}>
                        <div className='flex_container'>
                          <div className='profile_img'><img src={item.profilePic} alt="profile_icon" className='icon'></img></div>
                          <div className='sale_info'>
                            <div className='upper_flexbox'>
                              <h5 className='title'>{item.profileName}</h5>
                              <span className='position'>{item.position}</span>
                            </div>
                            <div className='bottom-flexbox'>
                              <ul className='turnover_info'>
                                {
                                  item.SubData &&
                                  item.SubData.length > 0 &&
                                  item.SubData.map((label, index) => {
                                    return (
                                      <li className='item' key={index}>
                                        {label.Sales && <div className='dataBlock'><span className='label'>Sales :</span><span className='value'>{label.Sales}</span></div>}
                                        {label.Bills && <div className='dataBlock'><span className='label'>Bills :</span><span className='value'>{label.Bills}</span></div>}
                                        {label.GMData && <span className='gmValue'>{label.GMData}</span>}
                                        <span className='ratingPercent'><span className='icon'>
                                          <img src={Star} alt="star_icon"></img>
                                        </span>{label.Rating}</span>
                                      </li>
                                    )
                                  })
                                }

                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })

                }

              </ul>
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <div className='salecategory'>
              <div className='max-view'>
                <span className='maximize'><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <div className='head_flexbox'>
                <h5 className='section_title'>Sales by Category</h5>
                <div className='selectMonthBox'>
                  <Select
                    label={""}
                    name={"martial_status"}
                    options={[
                      { id: "Jan", value: "Jan" },
                      { id: "Feb", value: "Feb" },
                    ]}
                    wrapperClass={"col12"}
                    // value={values.martial_status}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <div className='chart_container'>
                <Line data={SaleCategorydata} options={SaleCategoryoptions} />
              </div>
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <div className='returnGoods piechart'>
              <div className='max-view'>
                <span className='maximize'><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <h5 className='section_title'>Return goods</h5>
              <div className='chart_container'>
                <Doughnut data={ReturnGoodData} options={ReturnGoodoptions} />
              </div>
              <ul className='indicator_info'>
                <li className='indicator_item'>
                  <span className='circle dark-green'></span>
                  <span className='text'>Direct sales</span>
                </li>
                <li className='indicator_item'>
                  <span className='circle off-green'></span>
                  <span className='text'>Online</span>
                </li>
                <li className='indicator_item'>
                  <span className='circle off-gray'></span>
                  <span className='text'>Wholesaler</span>
                </li>
              </ul>
            </div>
          </Draggable>
          <Draggable bounds="parent">
            <div className='salegrowth'>
              <div className='max-view'>
                <span className='maximize'><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <div className='head_flexbox'>
                <h5 className='section_title'>Sales Growth</h5>
                <div className='selectMonthBox'>
                  <Select
                    label={""}
                    name={"martial_status"}
                    options={[
                      { id: "Jan", value: "Jan" },
                      { id: "Feb", value: "Feb" },
                    ]}
                    wrapperClass={"col12"}
                    // value={values.martial_status}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <div className='chart_container'>
                <Bar data={SaleGrowthData} options={SaleGrowthoptions} />
              </div>
            </div>
          </Draggable>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SalesPurchase;