import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { StatsPage } from "./pages/StatsPage";

const router = createBrowserRouter([
  {
    path: "/stats/:codigo",
    element: <StatsPage />,
  },
  {
    path: "*",
    element: <Navigate to="/stats/PWqDH6" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
