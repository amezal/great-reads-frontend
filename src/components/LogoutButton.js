import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UnstyledButton } from '@mantine/core';


const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <UnstyledButton
      onClick={() => logout({ returnTo: window.location.origin })}
    // variant='subtle'
    >
      Log Out
    </UnstyledButton>
  );
};

export default LogoutButton;