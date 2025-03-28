import React, { useState } from "react";
import UsersList from "./components/UserList";
import Login from "./components/Login";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="app">
      {token ? <UsersList onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;