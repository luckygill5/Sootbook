import React, { useState } from 'react';
import Coins from "../../../../../assets/images/coins.svg";
import FileWarm from "../../../../../assets/images/file-warning.svg";
import Dollar from "../../../../../assets/images/circle-dollar-sign.svg";
import { ReactComponent as Alert } from "../../../../../assets/images/alert-triangle.svg";
import { Select } from '../../../../common';
import { ReactComponent as Close } from "../../../../../assets/images/x.svg";
import { ReactComponent as Calendar } from "../../../../../assets/images/calendar4-range.svg";
import Max from "../../../../../assets/images/maximize.svg";
import list from "../../../../../assets/images/list.svg";
import Star from "../../../../../assets/images/star.svg";
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import Team1 from "../../../../../assets/images/team_1.png";
import Team2 from "../../../../../assets/images/team_2.png";
import Team3 from "../../../../../assets/images/team_3.png";
import Team4 from "../../../../../assets/images/team_4.png";
import Team5 from "../../../../../assets/images/team_5.png";
import Team6 from "../../../../../assets/images/team_6.png";
import Draggable from 'react-draggable';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, InputAdornment } from '@mui/material';
import dayjs from 'dayjs';
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


function SalesPurchase({ ChartFilter, ChartFilterClose }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const [Charttype, setCharttype] = useState('');
  const [ChartData, setChartData] = useState("");
  const [ChartOptions, setChartOptions] = useState('');
  const [ChartTitle, setChartTitle] = useState('');
  const [ChartRender, setChartRender] = useState({
    channelChart: '',
    saleMonthChart: '',
    saleProductChart: '',
    SaleCategorydataChart: '',
    ReturnGoodsChart: '',
    SaleGrowthChart: '',
    TopSaleLeaderChart: ''
  });
  const [chartvisible, setChartVisible] = useState(true);
  const [emptySelection, setEmptySelection] = useState(false)
  const [selectedChart, setSelectedChart] = useState(["channelChart", "saleMonthChart", "saleProductChart", "SaleCategorydataChart", "ReturnGoodsChart", "SaleGrowthChart", "TopSaleLeaderChart"]);
  const [month, setMonth] = useState({
    growthMonth: "",
    saleMonth:"",
    categoryMonth:""
  });
  const [dragStart, setDraStart] = useState(false)


  const handleChange = (event) => {
    const { name, value } = event.target;
    setMonth(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);


    // Data for the Pie chart
    const Piedata = {
      datasets: [
        {
          data: [12, 3, 25,],
          backgroundColor: [
            'rgb(229 231 235)',
            'rgb(0 152 89)',
            'rgb(0 119 70)',
          ],
          borderColor: 'rgb(242 245 250)', // White color for gaps
          borderWidth: 1, // Adjust this value for the gap size
          hoverBorderWidth: 0,
        },
      ],
    };

      // Options for the chart (you can customize it)
  const Pieoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

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
    responsive: true,
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
        ticks : {
          font: {
            size: 10, // Reduce the font size of y-axis labels
          }, 
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, values) {
            // Custom left vertical labels
            return `$${value}k`;
          },
          font: {
            size: 10, // Reduce the font size of y-axis labels
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
        barThickness: 7, // Set the bar thickness here
      },
    ],
  };

  const saleProductoptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the dataset labels
        labels: {
          font: {
            size: 5, // Reduce the font size of the legend
          },
        },
      },
     
    },
    indexAxis: 'y',
    scales: {
      y: {
        grid: {
          display: false, // Disable gridlines for the y-axis
        },
        ticks : {
          font: {
            size: 10, // Reduce the font size of y-axis labels
          }, 
        }
      },
      x: {
        grid: {
          display: true, // Optional: You can disable gridlines for the x-axis too
          borderDash: [2, 2], // Optional: Customize the border dash for gridlines
        },

        ticks: {
          font: {
            size: 10, // Reduce the font size of y-axis labels
          },
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
        ticks : {
          font: {
            size: 10, // Reduce the font size of y-axis labels
          }, 
        }
      },
      y: {
        grid: {
          borderDash: [2, 2], // Optional: makes the horizontal grid lines dashed
        },
        ticks : {
          font: {
            size: 10, // Reduce the font size of y-axis labels
          }, 
        }
      },
    },
  };


  // const ReturnGoodData = {
  //   // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  //   datasets: [
  //     {
  //       data: [12, 3, 25,],
  //       backgroundColor: [
  //         'rgb(229 231 235)',
  //         'rgb(0 152 89)',
  //         'rgb(0 119 70)',
  //       ],
  //       borderColor: 'rgb(242 245 250)', // White color for gaps
  //       borderWidth: 5, // Adjust this value for the gap size
  //       hoverBorderWidth: 0,
  //     },
  //   ],
  // };

  // const ReturnGoodoptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   cutout: '70%', // Adjust this value for the thickness of the doughnut
  //   plugins: {
  //     legend: {
  //       position: 'bottom',
  //     },
  //   },
  // };


      // Data for the Pie chart
      const ReturnGoodData = {
        datasets: [
          {
            data: [12, 3, 25,],
            backgroundColor: [
              'rgb(229 231 235)',
              'rgb(0 152 89)',
              'rgb(0 119 70)',
            ],
            borderColor: 'rgb(242 245 250)', // White color for gaps
            borderWidth: 1, // Adjust this value for the gap size
            hoverBorderWidth: 0,
          },
        ],
      };
  
        // Options for the chart (you can customize it)
    const ReturnGoodoptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top', // Position the legend at the top
          display: false,
        },
        tooltip: {
          enabled: true,
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
        ticks : {
          font: {
            size: 10, // Reduce the font size of y-axis labels
          }, 
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value, index, values) {
            // Custom left vertical labels
            return `$${value}k`;
          },
          font: {
            size: 10, // Reduce the font size of y-axis labels
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
    },
    {
      profilePic: Team5,
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
    },
    {
      profilePic: Team6,
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
    },
    {
      profilePic: Team1,
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

  const handleClose = () => {
    setOpen(false);
  };



  const handleZoomChart = (type, data, options, title) => {
    setCharttype(type);
    setChartData(data);
    setChartOptions(options);
    setChartTitle(title)
    setOpen(true)
  }

  const renderChart = () => {
    switch (Charttype) {
      case "Pie" : 
      return <Pie data={ChartData} options={ChartOptions} />;
      break;
      case 'Doughnut':
        return <Doughnut data={ChartData} options={ChartOptions} />;
        break;
      case 'Bar':
        return <Bar data={ChartData} options={ChartOptions} />;
        break;
      case 'Line':
        return <Line data={ChartData} options={ChartOptions} />;
        break;
        case 'saleLeaders' : 
        return ( <ul className='saleLeader_listing'>
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
        </ul>)
         break;
      default:
        return <h1>404 - Not Found</h1>;
    }
  }

  const ChartFilterDataList = [
    {
      title: 'Sale by Channel',
      name: "channelChart"
    },
    {
      title: 'Sales by Month',
      name: "saleMonthChart"
    },
    {
      title: 'Sales by Products',
      name: "saleProductChart"
    },
    {
      title: 'Sales by Category',
      name: "SaleCategorydataChart"
    },
    {
      title: 'Return Goods',
      name: "ReturnGoodsChart"
    },
    {
      title: 'Sales Growth',
      name: "SaleGrowthChart"
    },
    {
      title: "Top sales Leader",
      name: "TopSaleLeaderChart"
    }

  ]

  const handleFitlerChange = (event) => {

    const { name, checked } = event.target;
    if (checked) {
      setSelectedChart([...selectedChart, name])
      setEmptySelection(false)
    }
    if (checked == false && selectedChart.includes(name)) {
      let filterArray;
      filterArray = selectedChart.filter(item => {
        if (item !== name) {
          return item
        }
      })
      setSelectedChart(filterArray)
      setEmptySelection(false)
    }

    // setChartRender((prevState) => ({
    //   ...prevState,
    //   [name]: checked
    // }))

  }

  const handleApplyFilter = (event) => {
    // if (selectedChart.length > 0) {
    //   setChartVisible(false);
    // }
    // ChartFilterClose()
    if (selectedChart.length > 0) {
      setChartVisible(false);

      setChartRender((prevState) => ({
        channelChart: '',
        saleMonthChart: '',
        saleProductChart: '',
        SaleCategorydataChart: '',
        ReturnGoodsChart: '',
        SaleGrowthChart: '',
        TopSaleLeaderChart: ""
      }))

      event &&
        event.length > 0 &&
        event.map(item => {
          switch (item) {
            case 'channelChart':
              setChartRender((prevState) => ({
                ...prevState,
                channelChart: item == 'channelChart' ? true : false
              }))
              break;

            case 'saleMonthChart':
              setChartRender(prevState => ({
                ...prevState,
                saleMonthChart: item == 'saleMonthChart' ? true : false
              }));
              break;

            case 'saleProductChart':
              setChartRender(prevState => ({
                ...prevState,
                saleProductChart: item == 'saleProductChart' ? true : false
              }));
              break;

            case 'SaleCategorydataChart':
              setChartRender(prevState => ({
                ...prevState,
                SaleCategorydataChart: item == 'SaleCategorydataChart' ? true : false
              }));
              break;

            case 'ReturnGoodsChart':
              setChartRender(prevState => ({
                ...prevState,
                ReturnGoodsChart: item == 'ReturnGoodsChart' ? true : false
              }));
              break;

            case 'SaleGrowthChart':
              setChartRender(prevState => ({
                ...prevState,
                SaleGrowthChart: item == 'SaleGrowthChart' ? true : false
              }));
              break;
            case 'TopSaleLeaderChart':
              setChartRender(prevState => ({
                ...prevState,
                TopSaleLeaderChart: item == 'TopSaleLeaderChart' ? true : false
              }));
              break;

            default:
              break;
          }

        })
      ChartFilterClose()
    }
    else if (selectedChart.length == 0) {
      setEmptySelection(true)
    }
  }

  const handleClear = () => {
    setChartVisible(true);
    setSelectedChart(["channelChart", "saleMonthChart", "saleProductChart", "SaleCategorydataChart", "ReturnGoodsChart", "SaleGrowthChart", "TopSaleLeaderChart"]);
    setChartRender(prevState => ({
      channelChart: false,
      saleMonthChart: false,
      saleProductChart: false,
      SaleCategorydataChart: false,
      ReturnGoodsChart: false,
      SaleGrowthChart: false,
      TopSaleLeaderChart: false
    }))
  }

  const handleResetChart = () => {
    if(dragStart){
      const elements = document.querySelectorAll(".chartFlexbox ")
      Array.from(elements).forEach(element => {
        element.setAttribute("style", 'transform:translate(0px,0px)')
      });
      setDraStart(!dragStart)
    }

  }

  const handleDrag = (e, data) => {
    if(!dragStart){
      setDraStart(!dragStart)
    }
  }
  return (
    <React.Fragment>
      <div className='salepurchase_dashboard'>
        <div className='upperStatus_flexbox'>
          <div className='selectYear'>
            <label className='label'>Select Year</label>
            <div className='flexbox col6'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                className='dateFilter'
                renderInput={(params) => <TextField placeholder='Select'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Calendar />
                      </InputAdornment>
                    ),
                  }} {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                value={selectedDate}
                onChange={handleDateChange}
                className='dateFilter'
                renderInput={(params) => <TextField placeholder='Select'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Calendar />
                      </InputAdornment>
                    ),
                  }} {...params} />}
              />
            </LocalizationProvider>
            </div>
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
            <div className="resetOpt"><span className={`resetBtn ${dragStart && 'active'}`} onClick={() => handleResetChart()}>Reset</span></div>
          </div>
        </div>
        <div className='draggable_flexContainer'>
          {
            (ChartRender.channelChart || chartvisible) ? <Draggable onDrag={handleDrag} bounds="parent">
              <div className='salechannel chartFlexbox'>
                <div className='max-view' >
                  <span className='maximize' onClick={() => handleZoomChart("Pie", data, options, `Sale by channel`)}><img src={Max} alt="maximize_icon" className='icon'></img></span>
                </div>
                <h5 className='section_title'>Sale by Channel</h5>
                <div className='chart_container'>
                  {/* <Doughnut data={data} options={options} /> */}
                  <Pie data={Piedata} options={Pieoptions} />
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
            </Draggable> : null
          }
          {
            (ChartRender.saleMonthChart || chartvisible) ? <Draggable  onDrag={handleDrag} bounds="parent">
              <div className='salemonth chartFlexbox'>
                <div className='max-view'>
                  <span className='maximize' onClick={() => handleZoomChart("Bar", verticalBarThickData, verticalBaroptions, `Sales by month`)}><img src={Max} alt="maximize_icon" className='icon'></img></span>
                </div>
                <div className='head_flexbox'>
                  <h5 className='section_title'>Sales by Month</h5>
                  <div className='selectMonthBox'>
                    <Select
                      label={""}
                      name={"saleMonth"}
                      options={[
                        { id: "Jan", value: "Jan" },
                        { id: "Feb", value: "Feb" },
                      ]}
                      wrapperClass={`col12 ${month.saleMonth? 'active' : ''}`}
                      value={month.saleMonth}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='indicator'><span className='mark green'></span><span className='text'>Quantity</span></div>
                <div className='chart_container'>
                  <Bar data={verticalBarThickData} options={verticalBaroptions} />
                </div>
              </div>
            </Draggable> : null
          }
          {
            (ChartRender.saleProductChart || chartvisible) ? <Draggable onDrag={handleDrag} bounds="parent">
              <div className='saleProduct chartFlexbox'>
                <div className='max-view'>
                  <span className='maximize' onClick={() => handleZoomChart("Bar", saleProductdata, saleProductoptions, `Sales by products`)}><img src={Max} alt="maximize_icon" className='icon'></img></span>
                </div>
                <h5 className='section_title'>Sales by Products</h5>
                <div className='chart_container'>
                  <Bar data={saleProductdata} options={saleProductoptions} />
                </div>
              </div>
            </Draggable> : null
          }

          {(ChartRender.TopSaleLeaderChart || chartvisible) ? <Draggable onDrag={handleDrag} bounds="parent">
            <div className='saleLeaders chartFlexbox'>
              <div className='head_flexbox'>
                <h5 className='section_title'>Top sales Leaders</h5>
                <button className='options' onClick={() => handleZoomChart('saleLeaders' , '', '', `Top sales Leaders`)}>
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
          </Draggable> : null}
          {(ChartRender.SaleCategorydataChart || chartvisible) ? <Draggable  onDrag={handleDrag} bounds="parent">
            <div className='salecategory chartFlexbox'>
              <div className='max-view'>
                <span className='maximize' onClick={() => handleZoomChart("Line", SaleCategorydata, SaleCategoryoptions, `Sales by Category`)}><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <div className='head_flexbox'>
                <h5 className='section_title'>Sales by Category</h5>
                <div className='selectMonthBox'>
                  <Select
                    label={""}
                    name={"categoryMonth"}
                    options={[
                      { id: "Jan", value: "Jan" },
                      { id: "Feb", value: "Feb" },
                    ]}
                    wrapperClass={`col12 ${month.categoryMonth? 'active' : ''}`}
                    value={month.categoryMonth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='chart_container'>
                <Line data={SaleCategorydata} options={SaleCategoryoptions} />
              </div>
            </div>
          </Draggable> : null}
          {(ChartRender.ReturnGoodsChart || chartvisible) ? <Draggable  onDrag={handleDrag} bounds="parent">
            <div className='returnGoods chartFlexbox'>
              <div className='max-view'>
                <span className='maximize' onClick={() => handleZoomChart("Doughnut", ReturnGoodData, ReturnGoodoptions, `Return goods`)}><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <h5 className='section_title'>Return Goods</h5>
              <div className='chart_container'>
                {/* <Doughnut data={ReturnGoodData} options={ReturnGoodoptions} /> */}
                <Pie data={ReturnGoodData} options={ReturnGoodoptions} />
              </div>
              <ul className='indicator_info'>
                <li className='indicator_item'>
                  <span className='circle dark-green'></span>
                  <span className='text'>Direct Sales</span>
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
          </Draggable> : null}
          {(ChartRender.SaleGrowthChart || chartvisible) ? <Draggable  onDrag={handleDrag} bounds="parent">
            <div className='salegrowth chartFlexbox'>
              <div className='max-view'>
                <span className='maximize' onClick={() => handleZoomChart("Bar", SaleGrowthData, SaleGrowthoptions, `Sales Growth`)}><img src={Max} alt="maximize_icon" className='icon'></img></span>
              </div>
              <div className='head_flexbox'>
                <h5 className='section_title'>Sales Growth</h5>
                <div className='selectMonthBox'>
                  <Select
                    label={""}
                    name={"growthMonth"}
                    options={[
                      { id: "Jan", value: "Jan" },
                      { id: "Feb", value: "Feb" },
                    ]}
                    wrapperClass={`col12 ${month.growthMonth? 'active' : ''}`}
                    value={month.growthMonth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='chart_container'>
                <Bar data={SaleGrowthData} options={SaleGrowthoptions} />
              </div>
            </div>
          </Draggable> : null}
        </div>
      </div>

      {
        open &&
        <Dialog onClose={handleClose} className={`chartZoomModal ${(ChartTitle == "Sale by channel" || ChartTitle == "Return goods") ? 'autoHeight' : ""})`} open={open}>
          <div className='modal_body'>
            <button className='close_btn' onClick={handleClose}><Close /></button>
            <DialogTitle className='modal_title'>{ChartTitle}</DialogTitle>
            <div className='chart_container'>
              {
                renderChart()
              }
            </div>
            {
              (ChartTitle == "Sale by channel" || ChartTitle == "Return goods") ? <ul className='indicator_info'>
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
              </ul> : null
            }
          </div>
        </Dialog>
      }

      {
        ChartFilter &&
        <Dialog onClose={() => {
          // setChartFilterOpen(false)
          ChartFilterClose()
        }} className='chartFilterModal' open={ChartFilter}>
          <div className='modal_body'>
            <button className='close_btn' onClick={() => {
              // setChartFilterOpen(false)
              ChartFilterClose()
            }}><Close /></button>
            <DialogTitle className='modal_title'>All Filters</DialogTitle>
            <ul className='filter_listing'>
              {
                ChartFilterDataList &&
                ChartFilterDataList.length > 0 &&
                ChartFilterDataList.map((item, index) => {
                  return (
                    <li className='list_item'>
                      <FormControlLabel control={<Checkbox name={item.name} onChange={handleFitlerChange} checked={selectedChart.includes(item.name) ? true : false} />} label={item.title} />
                    </li>
                  )
                })

              }

            </ul>
            {
              emptySelection && <span className='empty-error'>Please select atleast one</span>
            }
            <div className='action_flexbox'>
              <button type='button' className='clearBtn' onClick={() => handleClear()}>Reset</button>
              <button type='button' className='applyBtn' onClick={() => handleApplyFilter(selectedChart)}>Apply</button>
            </div>

          </div>
        </Dialog>
      }
    </React.Fragment>
  )
}

export default SalesPurchase;