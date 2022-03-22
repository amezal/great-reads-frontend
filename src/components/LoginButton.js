import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

function LoginButton() {
  const { loginWithPopup } = useAuth0();

  return <Button
    onClick={() => loginWithPopup()}
    variant='outline'
  >
    Log In
  </Button>;
}

export default LoginButton;
