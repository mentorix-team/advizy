import { Routes, Route } from "react-router-dom";
import ExpertDashboardRoutes from "./routes/ExpertDashboardRoutes";
import UserDashboardRoutes from "./routes/UserDashboardRoutes";
import ExpertDetailPage from "./components/Expert/ExpertDetailProfile/ExpertDetailPage";
import Scheduling from "./components/Dashboard/User/Scheduling/Scheduling";
import OrderSummary from "./components/Dashboard/User/OrderSummary";
import BookingConfirmation from "./components/Dashboard/Expert/Meetings/BookingConfirmation";
import Meeting from "./components/Meeting/Meeting";
import HomePage from "./components/Home/pages/HomePage";
import BecomeExpertPage from "./components/Home/pages/BecomeExpertPage";
import Homees from "./components/Explore/Homees";
import ReScheduling from "./components/Dashboard/User/Scheduling/ReScheduling";
import ProtectedRoute from "./Protected/ProtectedRoute";
import GoogleAuthSuccess from "./components/Auth/GoogleAuthSuccess";
import Error404 from "./Protected/Error404";
import AboutUs from './../src/components/Home/pages/AboutUs'
import CookiePolicy from "./components/Home/pages/policies/CookiePolicy";
import PrivacyPolicy from "./components/Home/pages/policies/PrivacyPolicy";
import RefundPolicy from "./components/Home/pages/policies/RefundPolicy";
import TermsOfService from "./components/Home/pages/policies/TermsOfService";
import ProfileDetails from "@/components/Dashboard/Expert/Profile/App";


const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/become-expert" element={<BecomeExpertPage />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/expert-onboarding" element={<ProtectedRoute />} >
          <Route path="/expert-onboarding" element={<ProfileDetails />} />
        </Route>
        <Route path="/explore" element={<Homees />} />
        <Route path="/expert/:id" element={<ExpertDetailPage />} />
        <Route path="/expert/scheduling/:serviceId" element={<Scheduling />} />
        <Route path="/expert/rescheduling/:updatemeetingtoken" element={<ReScheduling />} />
        <Route path="/expert/order-summary/" element={<OrderSummary/>} />
        <Route path="/payment-success" element={<BookingConfirmation />} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />

        {/* Add a route for the Meeting component */}
        <Route path="/meeting" element={<Meeting />} />

        {/* User Dashboard Routes */}
        {/* <Route path="/dashboard/user/*" element={<UserDashboardRoutes />} />
        <Route path="/dashboard/expert/*" element={<ExpertDashboardRoutes />} /> */}
        <Route path="/dashboard/user/*" element={<ProtectedRoute />}>
          <Route path="/dashboard/user/*" element={<UserDashboardRoutes />} />
        </Route>
         <Route path="/dashboard/expert" element={<ProtectedRoute requireExpert={true} />}>
          <Route path="/dashboard/expert/*" element={<ExpertDashboardRoutes />} />
        </Route>
        <Route path="*" element={<Error404/> } />
      </Routes>
    </div>
  );
};

export default App;
