import { Navigate } from "react-router-dom";
import Error from "../page/error";
import UnAuthorize from "../page/unAuthorize";
import LogIn from "../page/user/login";
import AppLayout from "../component/layout/AppLayout";
import { appRoot } from "./constant/CONSTANTS";

import DeliveryPerson from "../page/app/delivery-person";
import Inquiry from "../page/app/inquiry";
import Request from "../page/app/request";

export const ROUTES = {

  REQUEST: "/request",
  DELIVERY_PERSON: "/bill",
  INQUIRY: "/inquiry",

};

const LOGIN_ROUTES = [
  // {
  //   path: "/",
  //   element: <SidePage />,
  //   errorElement: <Error />,
  //   children: [
  //     {
  //       index: true,
  //       element: <LogIn />,
  //     },
  //     {
  //       path: "registration",
  //       element: <Registration />,
  //     },
  //   ],
  // },
  {
    index: true,
    element: <LogIn />,
  },
  // {
  //   path: "registration",
  //   element: <Registration />,
  // },
  // {
  //   path: ROUTES.FORGOT_PASSWORD,
  //   element: <ForgetPassword />,
  //   errorElement: <Error />,
  // },
];

const ALL_ROUTES = [
  ...LOGIN_ROUTES,

  {
    path: `${appRoot}`,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={`${appRoot}${ROUTES.DELIVERY_PERSON}`} />,
      },

      {
        path: `${appRoot}${ROUTES.DELIVERY_PERSON}`,
        element: <DeliveryPerson />,
      },


    ],

  },


  {
    path: "/error",
    element: <Error />,
  },
  {
    path: "/unAuthorize",
    element: <UnAuthorize />,
  },
  {
    path: "*",
    element: <Navigate to="/error" />,
  },
];

export default ALL_ROUTES;
