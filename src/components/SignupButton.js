import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';

function SignupButton() {
  const { loginWithPopup } = useAuth0();

  return <Button
    onClick={() => loginWithPopup({ screen_hint: 'signup', })}
    variant='gradient'

    size="xl"
  >
    Sign up
  </Button>;
}

export default SignupButton;
