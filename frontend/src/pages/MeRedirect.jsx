import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MeRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signup");
        return;
      }

      try {
        const res = await fetch("http://localhost:3021/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          navigate("/dashboard");
        } else {
          localStorage.removeItem("token");
          navigate("/signup");
        }
      } catch (err) {
        console.error("Error validating user", err);
        localStorage.removeItem("token");
        navigate("/signup");
      }
    };

    checkAuth();
  }, [navigate]);

  return <div>Checking authentication...</div>;
}

export default MeRedirect;
