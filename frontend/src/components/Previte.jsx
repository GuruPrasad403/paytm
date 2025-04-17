import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function Previte() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("PayTM-Token");
    if (!token) {
      navigate("/signin");
    } else {
      setLoading(false); // allow to render child route
    }
  }, [navigate]);

  if (loading) return null; // or <div>Loading...</div>

  return <Outlet />;
}

export default React.memo(Previte);
