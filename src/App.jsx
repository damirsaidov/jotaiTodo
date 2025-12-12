import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import Sync from "./pages/sync";
import Async from "./pages/async";
import AboutId from "./pages/aboutId";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Sync />,
        },
        {
          path: "async",
          element: <Async />,
        },
        {
          path: "about/:id",
          element: <AboutId />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
