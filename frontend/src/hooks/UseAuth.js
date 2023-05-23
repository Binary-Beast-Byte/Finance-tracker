import { useEffect, useState } from "react";
import axios from "../helpers/axios";

const useCheckAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("auth/login/success");
        if (res.data.error) {
          setUser(null);
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
        setAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return { isAuthenticated, user };
};

export default useCheckAuth;
