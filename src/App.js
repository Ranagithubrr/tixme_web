import './App.css';
import './common/css/Common.css';
import './AppResponsive.css';
// Admin
import AdminDashboard from './pages/admin/Dashboard';
import AddCategory from './pages/admin/category/AddCategory';
import AllCategory from './pages/admin/category/AllCategory';
import AllCustomers from './pages/admin/customers/AllCustomers';
import AddEventtype from './pages/admin/eventtype/Add';
import AllEventtype from './pages/admin/eventtype/List';
import AdminManageTicket from './pages/admin/event/Manageticket';
import AdminTicketattendee from './pages/admin/event/ticketattendee';
import ActiveOrganizer from './pages/admin/organizer/ActiveOrganizer';
import PendingOrganizer from './pages/admin/organizer/PendingOrganizer';
import Supportlist from './pages/admin/support/Supportlist';
import AdminTicketView from './pages/admin/support/SupportReply';
import Contactlist from './pages/admin/contact/Contactlist';
import AllEventlist from './pages/admin/event/AllEventlist';
import Membership from './pages/admin/membership/Membership';
import AdminCustomerProfile from './pages/admin/CustomerProfile';
import AdminOrganizerProfile from './pages/admin/OrganizerProfile';
import AdminPayoutrequest from './pages/admin/payout/list';
import AdminLayout from './layout/admin/Layout'
// Customer
import CustomerDashboard from './pages/customer/Dashboard';
import CustomerSupportlist from './pages/customer/support/Supportlist';
import CustomerOrderlist from './pages/customer/events/Orderlist';
import FollowingList from './pages/customer/FollowingList';
import OrganizerEvents from './pages/customer/events/Organizerevents';
import SavedeventsList from './pages/customer/SavedeventsList';
import CustomerProfile from './pages/customer/CustomerProfile';
import Myrewards from './pages/customer/Myrewards';
import CustomerLayout from './layout/customer/Layout'
// Organizer
import Dashboard from './pages/organizer/Dashboard';
import Analytics from './pages/organizer/analytics';
import OrganizerSupportlist from './pages/organizer/support/Supportlist';
import EventType from './pages/organizer/Event/EventCreateForm';
import EditEvent from './pages/organizer/Event/EditEvent';
import EventView from './pages/organizer/Event/EventView';
import EventList from './pages/organizer/Event/List';
import Ticketlist from './pages/organizer/Event/ticketlist';
import Ticketattendee from './pages/organizer/Event/ticketattendee';
import TicketView from './pages/organizer/support/SupportReply';
import ManageTicket from './pages/organizer/Event/Manageticket';
import TicketSoldlist from './pages/organizer/ticketsold/List';
import PayoutList from './pages/organizer/payout/list';
import Tixmescanner from './pages/organizer/Tixmescanner';
import Tixmescannerpage from './pages/organizer/Tixmescannerpage';
import Qrvalidation from './pages/organizer/Qrvalidation';
import OrganizerProfile from './pages/organizer/OrganizerProfile';
import OrganizerLayout from './layout/organizer/Layout'
// auth
import CustomerLogin from './pages/website/auth/CustomerLogin';
import CustomerFpassword from './pages/website/auth/Customerfpassword';
import OrganizerFpassword from './pages/website/auth/Organizerfpassword';
import CustomerSignup from './pages/website/auth/CustomerSignup';
import OrganizerLogin from './pages/website/auth/OrganizerLogin';
import OrganizerSignup from './pages/website/auth/OrganizerSignup';
import AdminLogin from './pages/website/auth/AdminLogin';
// website
import WebsiteLayout from './layout/website/Layout'
import Home from './pages/website/Home';
import XYZ from './pages/website/XYZ';
import Scaner from './pages/website/Scaner';
import Event from './pages/website/Event';
import Aboutus from './pages/website/aboutus';
import Terms from './pages/website/Terms';
import Privacy from './pages/website/Privacy';
import Faq from './pages/website/Faq';
import Contact from './pages/website/Contact';
import Organizers from './pages/website/Organizers';
import OrganizerDetails from './pages/website/OrganizerDetails';
import Raiseticket from './pages/website/Raiseticket';
import CartDetails from './pages/website/CartDetails';
import OrderSuccessful from './pages/website/OrderSuccessful';
import OrderFailed from './pages/website/OrderFailed';
import Events from './pages/website/Events';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { app_url, organizer_url, admin_url, customer_url } from './common/Helpers';
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* auth */}
          <Route path={app_url + 'auth/customer/signup'} element={<WebsiteLayout> <CustomerSignup title={'Tixme'} /> </WebsiteLayout>} />
          <Route path={app_url + 'auth/customer/login'} element={<WebsiteLayout> <CustomerLogin title={'Tixme'} /> </WebsiteLayout>} />
          <Route path={app_url + 'auth/customer/forgot-password'} element={<WebsiteLayout> <CustomerFpassword title={'Tixme'} /> </WebsiteLayout>} />
          <Route path={app_url + 'auth/organizer/login'} element={<WebsiteLayout> <OrganizerLogin title={'Tixme'} /> </WebsiteLayout>} />
          <Route path={app_url + 'auth/organizer/signup'} element={<WebsiteLayout> <OrganizerSignup title={'Tixme'} /> </WebsiteLayout>} />
          <Route path={app_url + 'auth/organizer/forgot-password'} element={<WebsiteLayout> <OrganizerFpassword title={'Tixme'} /> </WebsiteLayout>} />
          <Route path={app_url + 'auth/admin/login'} element={<WebsiteLayout> <AdminLogin title={'Tixme'} /> </WebsiteLayout>} />
          {/* website */}
          <Route path={app_url} element={<WebsiteLayout> <Home title={'Tixme'} /> </WebsiteLayout>} />
          <Route path={app_url + 'test'} element={<XYZ title={'Tixme'} />} />
          <Route path={`${app_url}event/:id/:name`} element={<Event title={'Tixme'} />} />
          <Route path={app_url + 'aboutus'} element={<WebsiteLayout> <Aboutus title={'About Us'} /> </WebsiteLayout>} />
          <Route path={app_url + 'terms-and-conditions'} element={<WebsiteLayout> <Terms title={'Terms & conditions'} /> </WebsiteLayout>} />
          <Route path={app_url + 'privacy-policy'} element={<WebsiteLayout> <Privacy title={'Privacy policy'} /> </WebsiteLayout>} />
          <Route path={app_url + 'faq'} element={<WebsiteLayout> <Faq title={'FAQ'} /> </WebsiteLayout>} />
          <Route path={app_url + 'contact'} element={<WebsiteLayout> <Contact title={'Contact Us'} /> </WebsiteLayout>} />
          <Route path={app_url + 'organizers'} element={<WebsiteLayout> <Organizers title={'Organizers'} /> </WebsiteLayout>} />
          <Route path={app_url + 'raise-ticket'} element={<WebsiteLayout> <Raiseticket title={'Raise Ticket'} /> </WebsiteLayout>} />
          <Route path={app_url + 'events'} element={<WebsiteLayout> <Events title={'Events'} /> </WebsiteLayout>} />
          <Route path={`${app_url}organizer-profile/:id/:name`} element={<WebsiteLayout> <OrganizerDetails title={'Organizer Profile'} /> </WebsiteLayout>} />
          <Route path={app_url + 'cart-details'} element={<WebsiteLayout> <CartDetails title={'Your Cart'} /> </WebsiteLayout>} />
          <Route path={app_url + 'order-successful-page'} element={<WebsiteLayout> <OrderSuccessful title={'Payment status'} /> </WebsiteLayout>} />
          <Route path={app_url + 'order-failed-page'} element={<WebsiteLayout> <OrderFailed title={'Payment status'} /> </WebsiteLayout>} />
          <Route path={app_url + 'scanner'} element={<Scaner title={'Payment status'} />} />
          {/* Customer */}
          <Route path={customer_url + 'dashboard'} element={<CustomerLayout title={'Dashboard'}> <CustomerDashboard title={'Dashboard'} /> </CustomerLayout>} />
          <Route path={customer_url + 'support-tickets'} element={<CustomerLayout> <CustomerSupportlist title={'Support Tickets'} /> </CustomerLayout>} />
          <Route path={customer_url + 'my-order-list'} element={<CustomerLayout title={'Events'}> <CustomerOrderlist title={'All Order List'} /> </CustomerLayout>} />
          <Route path={customer_url + 'my-profile'} element={<CustomerLayout> <CustomerProfile title={'My profile'} /> </CustomerLayout>} />
          <Route path={customer_url + 'following'} element={<CustomerLayout title={'My following'}> <FollowingList title={'My following'} /> </CustomerLayout>} />
          <Route path={`${customer_url}organizer-events/:id`} element={<CustomerLayout title={'Organizer Events'}> <OrganizerEvents /> </CustomerLayout>} />
          <Route path={customer_url + 'savedevents'} element={<CustomerLayout title={'My saved event'}> <SavedeventsList title={'My saved event'} /> </CustomerLayout>} />
          <Route path={customer_url + 'my-rewards'} element={<CustomerLayout title={'My Rewards'}> <Myrewards title={'My Rewards'} /> </CustomerLayout>} />
          {/* Organizer */}
          <Route path={organizer_url + 'dashboard'} element={<OrganizerLayout> <Dashboard title={'Organizer Dashboard'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'event/add-event'} element={<OrganizerLayout> <EventType title={'Create new event'} /> </OrganizerLayout>} />
          <Route path={`${organizer_url}event/edit-event/:id/:name`} element={<OrganizerLayout title={'Edit event'}> <EditEvent /> </OrganizerLayout>} />
          <Route path={`${organizer_url}event/view-event/:id/:name`} element={<OrganizerLayout> <EventView title={'Event details'} /> </OrganizerLayout>} />
          <Route path={`${organizer_url}event/manage-ticket/:id/:name`} element={<OrganizerLayout title={'Mange Tickets'}> <ManageTicket title={'Mange Tickets'} /> </OrganizerLayout>} />
          <Route path={`${organizer_url}event/mange-attendee/:id/:name`} element={<OrganizerLayout title={'Mange Attendee'}> <Ticketattendee title={'Mange Attendee'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'event/all-event-list'} element={<OrganizerLayout title={'Event Management'}> <EventList title={'All event list'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'support-tickets'} element={<OrganizerLayout title={'Mange Tickets'}> <OrganizerSupportlist title={'Mange Tickets'} /> </OrganizerLayout>} />
          <Route path={`${organizer_url}view-support-ticket/:id`} element={<OrganizerLayout title={'Mange Tickets'}> <TicketView title={'Mange Tickets'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'ticket-sold-list'} element={<OrganizerLayout> <TicketSoldlist title={'Tickets sold list'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'tickets-list'} element={<OrganizerLayout> <Ticketlist title={'Tickets list'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'payout-request'} element={<OrganizerLayout> <PayoutList title={'Payout list'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'tixme-scanner'} element={<OrganizerLayout> <Tixmescanner title={'Tixme scanner'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'tixme-scanner-page'} element={<OrganizerLayout> <Tixmescannerpage title={'Tixme scanner'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'tixme-validate'} element={<OrganizerLayout> <Qrvalidation title={'QR validate'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'analytics'} element={<OrganizerLayout> <Analytics title={'Analytics'} /> </OrganizerLayout>} />
          <Route path={organizer_url + 'my-profile'} element={<OrganizerLayout> <OrganizerProfile title={'My profile'} /> </OrganizerLayout>} />
          {/* Admin */}
          <Route path={admin_url + 'dashboard'} element={<AdminLayout> <AdminDashboard title={'Admin Dashboard'} /> </AdminLayout>} />
          <Route path={admin_url + 'add-category'} element={<AdminLayout> <AddCategory title={'Add Category'} /> </AdminLayout>} />
          <Route path={admin_url + 'all-category'} element={<AdminLayout> <AllCategory title={'All Category'} /> </AdminLayout>} />
          <Route path={admin_url + 'add-event-type'} element={<AdminLayout> <AddEventtype title={'Add Event Type'} /> </AdminLayout>} />
          <Route path={admin_url + 'all-event-type'} element={<AdminLayout> <AllEventtype title={'All Event Type'} /> </AdminLayout>} />
          <Route path={admin_url + 'all-events-list'} element={<AdminLayout title={'All Events'}> <AllEventlist/> </AdminLayout>} />
          <Route path={`${admin_url}event/manage-ticket/:id/:name`} element={<AdminLayout title={'Mange Tickets'}> <AdminManageTicket title={'Mange Tickets'} /> </AdminLayout>} />
          <Route path={`${admin_url}event/mange-attendee/:id/:name`} element={<AdminLayout title={'Mange Attendee'}> <AdminTicketattendee title={'Mange Attendee'} /> </AdminLayout>} />
          <Route path={`${admin_url}event/edit-event/:id/:name`} element={<AdminLayout> <EditEvent title={'Edit event'} /> </AdminLayout>} />
          <Route path={admin_url + 'all-customers'} element={<AdminLayout> <AllCustomers title={'All Customers'} /> </AdminLayout>} />
          <Route path={`${admin_url}customers/:id/:name`} element={<AdminLayout> <AllCustomers title={'Customers'} /> </AdminLayout>} />
          <Route path={`${admin_url}user-details/:id/:name`} element={<AdminLayout> <AdminCustomerProfile title={'Customers'} /> </AdminLayout>} />
          <Route path={`${admin_url}organizer-details/:id/:name`} element={<AdminLayout> <AdminOrganizerProfile title={'Organizer'} /> </AdminLayout>} />
          <Route path={`${admin_url}payout-request/:id/:name`} element={<AdminLayout> <AdminPayoutrequest title={'Payout request'} /> </AdminLayout>} />
          <Route path={admin_url + 'active-organizer'} element={<AdminLayout> <ActiveOrganizer title={'Active Organizer'} /> </AdminLayout>} />
          <Route path={admin_url + 'pending-organizer'} element={<AdminLayout> <PendingOrganizer title={'Pending Organizer'} /> </AdminLayout>} />
          <Route path={admin_url + 'support-tickets'} element={<AdminLayout title={'Manage Tickets'}> <Supportlist title={'Support Tickets'} /> </AdminLayout>} />
          <Route path={admin_url + 'contact-us'} element={<AdminLayout> <Contactlist title={'Contact us list'} /> </AdminLayout>} />
          <Route path={admin_url + 'membership'} element={<AdminLayout> <Membership title={'Membership'} /> </AdminLayout>} />
          <Route path={`${admin_url}view-support-ticket/:id`} element={<AdminLayout title={'Mange Tickets'}> <AdminTicketView title={'Mange Tickets'} /> </AdminLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
