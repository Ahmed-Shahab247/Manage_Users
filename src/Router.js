import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UsersList from "./pages/UsersList";
import PrivateRoute from "./components/PrivateRoute";

// This file is to handle the routing of the application
// The PrivateRoute component is used to protect the /users route
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protect the /users route */}
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UsersList />} />
        </Route>

        {/* Redirect unknown routes to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
