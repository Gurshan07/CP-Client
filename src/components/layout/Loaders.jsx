import { Stack, CircularProgress } from "@mui/material";
import MoecounterComponentEverySec from "../moeCounterEverySec";
import { BouncingSkeleton } from "../styles/StyledComponents";

const LayoutLoader = () => {
  return (
    <>
      <div style={{ height: "30vh" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
        }}
      >
        <div style={{ width: 100 }}>
          <MoecounterComponentEverySec />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
        <CircularProgress size="1.2rem" style={{ color: "white" }} />
      </div>
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
          backgroundColor: "#ffff",
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={10}
        height={10}
        style={{
          backgroundColor: "#ffff",
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={10}
        height={10}
        style={{
          backgroundColor: "#ffff",
          animationDelay: "0.4s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={10}
        height={10}
        style={{
          backgroundColor: "#ffff",
          animationDelay: "0.6s",
        }}
      />
    </Stack>
  );
};

export { LayoutLoader, TypingLoader };
