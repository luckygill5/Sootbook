import logo from './logo.svg';
import './App.css';
import AttributeManagment from './Components/AttributeManagment/AttributeManagment';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  useRoutes,
  Routes, Route, Link,
  useLocation
} from "react-router-dom";
import routes from './Route';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';




function App() {
  let headerMenuVisibility, footerVisibility;

  let location = useLocation();
  const element = useRoutes([...routes])


  function headerMenuRender(text) {
    switch (text) {
      case '/':
      case '/Services':
      case '/AboutUs':
      case '/Services':
      case '/Pricing':
      case '/Products':
      case '/Careers':
      case '/Blog':
      case '/Contactus':
      case '/JobSingle':
      case '/Article':
      case '/POS':
        return headerMenuVisibility = true;
        break;
      default:
        return headerMenuVisibility = false;


    }
  }

  function headerFooterRender(text) {
    switch (text) {
      case '/':
      case '/Services':
      case "/AboutUs":
      case '/Services':
      case '/Pricing':
      case '/Products':
      case '/Careers':
      case '/Blog':
      case '/Contactus':
      case '/JobSingle':
      case '/Article':
      case '/POS':
        return footerVisibility = true;
        break;
      default:
        return footerVisibility = false;


    }
  }
  return (
    <div className="App">
      {headerMenuRender(location?.pathname) ?
        <Header /> : ''}
      {element}
      {headerFooterRender(location?.pathname) ?
        <Footer /> : ''}
    </div>

  );
}

export default App;
