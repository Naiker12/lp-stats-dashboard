import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import { StatsPage } from "./pages/StatsPage";
import { StatsLookupPage } from "./pages/StatsLookupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StatsLookupPage />,
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
