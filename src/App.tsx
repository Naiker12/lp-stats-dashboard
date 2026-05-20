import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { StatsPage } from "./pages/StatsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StatsPage />,
  },
  {
    path: "/stats",
    element: <StatsPage />,
  },
  {
    path: "/stats/:codigo",
    element: <StatsPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
