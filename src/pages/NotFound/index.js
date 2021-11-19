import { useEffect } from "react";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);
  return null;
}

export default NotFound;
