import React, { useEffect } from "react";
import { useAccount } from "shared/hooks";
import { useNavigate } from "react-router-dom";

export const AdminComponent: React.FC = () => {
  const { isLogged, setAsAdmin } = useAccount();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogged === null) return;
    if (!isLogged) return navigate("/login");

    setAsAdmin()
      .then(() => navigate("/"))
      .catch(() => navigate("/"));
  }, [isLogged, setAsAdmin]);

  return <></>;
};
