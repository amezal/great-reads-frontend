import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import SignupButton from './SignupButton';
import { Container, Text, Group } from '@mantine/core';
import { useViewportSize, useWindowEvent } from '@mantine/hooks'


const Landing = () => {
  // const { width, height } = useViewportSize();
  const [spline, setSpline] = useState();

  useEffect(() => {
    if (spline) {
      resize();
      window.addEventListener('resize', resize);
    }

    return () => window.removeEventListener('resize', resize);
  }, [spline])

  const resize = (e) => {
    const { innerWidth: width, innerHeight: height } = window;
    const bookObject = spline.findObjectByName('untitled');
    // console.log(spline.findObjectByName('Personal Camera'))
    if (width > 1366) {
      bookObject.position.x = -250;
      Object.keys(bookObject.scale).forEach(axis => {
        bookObject.scale[axis] = 1;
      })
      return;
    }
    if (width > 800) {
      bookObject.position.x = -250;
      Object.keys(bookObject.scale).forEach(axis => {
        bookObject.scale[axis] = 1;
      })
      return;
    }
    if (width >= 568) {
      bookObject.position.x = 0;
      Object.keys(bookObject.scale).forEach(axis => {
        bookObject.scale[axis] = 1.3;
      })
      return;
    }
    if (width >= 350) {
      bookObject.position.x = 30;
      bookObject.position.y = 150;
      Object.keys(bookObject.scale).forEach(axis => {
        bookObject.scale[axis] = 0.8;
      })
      return;
    }
  }


  return (
    <Container fluid style={{ padding: '0', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Spline scene="https://draft.spline.design/fTN-GV20a39q1lyp/scene.spline"
        style={{ width: '100%', height: '100%' }} className="spline-canvas"
        onLoad={(spline) => {
          setSpline(spline);
        }}
      />
      <Group direction="column" className="cta">
        <Text variant='gradient' weight={900} style={{ fontSize: '50px' }}>
          All your books
          <br />
          In one place.
        </Text>
        <SignupButton />
      </Group>
    </Container>
  )
}

export default Landing;