import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false)
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;

  // useEffect(() => {
  //   console.log("ProtectedRoute mounted");

  //   return () => {
  //     console.log("ProtectedRoute unmounted");
  //   };
  // }, []);

  useEffect(() => {
    const verifyToken = async () => {
      try {

        setLoading(true);

        const token = sessionStorage.getItem("token");

        const res = await axios.post(
          `${BASE_URL}/api/user/verifyToken`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.log("ERROR:", error);
        if (error.response?.status === 401) {
          sessionStorage.removeItem("token");
        }
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute