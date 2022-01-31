import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect({ screen_hint: 'signup', })}>Sign up</button>;
}

export default SignupButton;
