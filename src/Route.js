import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AdminDashboardParent from './Pages/AdminDashboard/AdminDashboard.parent';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import Homepage from "./Pages/Home/Home";
import AboutUs from './Pages/AboutUs/AboutUs';
import Services from './Pages/Services/Services';
import Pricing from './Pages/Pricing/Pricing';
import Product from './Pages/Product/Product';
import Careers from './Pages/Carrers/Carrers';
import Blog from './Pages/Blog/Blog';
import ContactUs from './Pages/Contactus/Contactus';
import JobSingle from './Pages/JobSingle/JobSingle';
import Article from './Pages/Article/Article';
import POS from './Pages/POS/POS';

const routes = [
  {
    path: "/",
    element: <Homepage />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/SignIn",
    element: <SignIn />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/SignUp",
    element: <SignUp />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/dashBoard",
    element: <AdminDashboardParent />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/AboutUs",
    element: <AboutUs />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/Services",
    element: <Services />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/Pricing",
    element: <Pricing />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/Products",
    element: <Product />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/Careers",
    element: <Careers />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/Blog",
    element: <Blog />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/Contactus",
    element: <ContactUs />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/JobSingle",
    element: <JobSingle />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/Article",
    element: <Article />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
  {
    path: "/POS",
    element: <POS />,
    loader: '',
    children: [
      // {
      //   path: "team",
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
];

export default routes;