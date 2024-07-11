import { Grid, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BouncingSkeleton } from "../styles/StyledComponents";
import MoecounterComponentEverySec from "../moeCounterEverySec";
const LayoutLoader = () => {
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        switch (prevText) {
          case 'Loading': return 'Loading.';
          case 'Loading.': return 'Loading..';
          case 'Loading..': return 'Loading...';
          default: return 'Loading';
        }
      });
    }, 1000);  

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div style={{height:'30vh'}}></div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
        <div style={{ width: 100 }}>
          <MoecounterComponentEverySec />
        </div>
      </div>
      <h2 style={{ color: 'white', textAlign: 'center' }}>{loadingText}</h2>
    </>
  );
};

const TypingLoader = () => {
    return (
      <Stack
        spacing={"0.5rem"}
        direction={"row"}
        padding={"0.5rem"}
        justifyContent={"center"}
      >
        <BouncingSkeleton
          variant="circular"
          width={10}
          height={10}
          style={{
            backgroundColor:'#ffff',
            animationDelay: "0.1s",
          }}
        />
        <BouncingSkeleton
          variant="circular"
          width={10}
          height={10}
          style={{
            backgroundColor:'#ffff',
            animationDelay: "0.2s",
          }}
        />
        <BouncingSkeleton
          variant="circular"
          width={10}
          height={10}
          style={{
            backgroundColor:'#ffff',
            animationDelay: "0.4s",
          }}
        />
        <BouncingSkeleton
          variant="circular"
          width={10}
          height={10}
          style={{
            backgroundColor:'#ffff',
            animationDelay: "0.6s",
          }}
        />
      </Stack>
    );
  };
  export { TypingLoader, LayoutLoader };