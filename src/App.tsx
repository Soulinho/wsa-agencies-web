import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AdminHome from './components/admin/Home'
import ManageUsers from './components/admin/manage-users'
import ManageVessels from './components/admin/manage-vessels'
import VesselDetails from './components/admin/vessel/VesselDetails'
import ManageClient from './components/admin/manage-client'
import ManageServices from './components/admin/manage-services'
import Login from './components/login/login'
import RecoverPassword from './components/login/RecoverPassword'
import SubServices from './components/admin/Services/sub-services'
import ServiceFields from './components/admin/Services/service-fields'
import OperatorHome from './components/operator/Home'
import ManageVesselsOperator from './components/operator/manage-vessels'
import VesselDetailsOperator from './components/operator/VesselDetailsOperator'
import CustomerHome from './components/customer/Home'
import ViewVessels from './components/customer/ViewVessels'
import VesselDetailsCustomer from './components/customer/VesselDetailsCustomer'
import GenerateReports from './components/admin/GenerateReports'
import AssistantHome from './components/assistant/Home'
import ManageVesselsAssistant from './components/assistant/manage-vessels'
import VesselDetailsAssistant from './components/assistant/VesselDetailsAssistant'
import AdministrativeHome from './components/administrative/Home'
import ViewVesselsAdministrative from './components/administrative/ViewVessels'
import VesselDetailsAdministrative from './components/administrative/VesselDetailsAdministrative'
import GenerateReportsAdministrative from './components/administrative/GenerateReports'
import VesselsByCountryReport from './components/admin/Reports/VesselsByCountryReport'
import VesselsByServicesReport from './components/admin/Reports/VesselsByServicesReport'
import VesselsByOperatorReport from './components/admin/Reports/VesselsByOperatorReport'
import VesselsByCustomerReport from './components/admin/Reports/VesselsByCustomerReport'
import TotalVesselsReport from './components/admin/Reports/TotalVesselsReport'
import VesselsReport from './components/admin/Reports/VesselsReport'
import TotalVesselsReportAdministrative from './components/administrative/Reports/TotalVesselsReport'
import VesselsByCountryReportAdministrative from './components/administrative/Reports/VesselsByCountryReport'
import VesselsByServicesReportAdministrative from './components/administrative/Reports/VesselsByServicesReport'
import VesselsByOperatorReportAdministrative from './components/administrative/Reports/VesselsByOperatorReport'
import VesselsByCustomerReportAdministrative from './components/administrative/Reports/VesselsByCustomerReport'
import VesselsReportAdministrative from './components/administrative/Reports/VesselsReport'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Redirección al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Resto de tus rutas */}
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-vessels" element={<ManageVessels />} />
          <Route path="/vessel/:id" element={<VesselDetails />} />
          <Route path="/admin/manage-client" element={<ManageClient />} />
          <Route path="/admin/manage-services" element={<ManageServices />} />
          <Route path="/admin/manage-services/:serviceName" element={<SubServices />} />
          <Route path="/admin/services/:serviceName/:subServiceName/fields" element={<ServiceFields />} />
          <Route path="/operator" element={<OperatorHome />} />
          <Route path="/operator/manage-vessels" element={<ManageVesselsOperator />} />
          <Route path="/operator/vessel-details/:id" element={<VesselDetailsOperator />} />
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/view-vessels" element={<ViewVessels />} />
          <Route path="/customer/vessel-details/:id" element={<VesselDetailsCustomer />} />
          <Route path="/admin/generate-reports" element={<GenerateReports />} />
          <Route path="/assistant" element={<AssistantHome />} />
          <Route path="/assistant/manage-vessels" element={<ManageVesselsAssistant />} />
          <Route path="/assistant/vessel-details/:id" element={<VesselDetailsAssistant />} />
          <Route path="/administrative" element={<AdministrativeHome />} />
          <Route path="/administrative/view-vessels" element={<ViewVesselsAdministrative />} />
          <Route path="/administrative/vessel-details/:id" element={<VesselDetailsAdministrative />} />
          <Route path="/administrative/generate-reports" element={<GenerateReportsAdministrative />} />
          <Route path="/admin/reports/vessels-by-country" element={<VesselsByCountryReport />} />
          <Route path="/admin/reports/vessels-by-services" element={<VesselsByServicesReport />} />
          <Route path="/admin/reports/vessels-by-operator" element={<VesselsByOperatorReport />} />
          <Route path="/admin/reports/vessels-by-customer" element={<VesselsByCustomerReport />} />
          <Route path="/admin/reports/total-vessels" element={<TotalVesselsReport />} />
          <Route path="/admin/reports/vessels" element={<VesselsReport />} />
          <Route path="/administrative/reports/total-vessels" element={<TotalVesselsReportAdministrative />} />
          <Route path="/administrative/reports/vessels-by-country" element={<VesselsByCountryReportAdministrative />} />
          <Route path="/administrative/reports/vessels-by-services" element={<VesselsByServicesReportAdministrative />} />
          <Route path="/administrative/reports/vessels-by-operator" element={<VesselsByOperatorReportAdministrative />} />
          <Route path="/administrative/reports/vessels-by-customer" element={<VesselsByCustomerReportAdministrative />} />
          <Route path="/administrative/reports/vessels" element={<VesselsReportAdministrative />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
