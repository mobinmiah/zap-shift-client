import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import Loading from "../components/Loading/Loading";
import About from "../pages/About/About";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthPages/Login/Login";
import Register from "../pages/AuthPages/Register/Register";
import Rider from "../pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import Services from "../pages/Home/Services/Services";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproverRidres from "../pages/Dashboard/ApproverRidres/ApproverRidres";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import AssignedDeliveriesToRiders from "../pages/Dashboard/AssignedDeliveriesToRiders/AssignedDeliveriesToRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import RiderRoute from "./RiderRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "services",
        Component: Services,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceBranches.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceBranches.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceBranches.json").then((res) => res.json()),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "addParsel",
        element: <></>,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproverRidres></ApproverRidres>
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "assigned-deliveries-to-riders",
        element: (
          <AdminRoute>
            <AssignedDeliveriesToRiders></AssignedDeliveriesToRiders>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries></AssignedDeliveries>
          </RiderRoute>
        ),
      },
    ],
  },
]);

// export default router;
