import { Chip } from "@mui/material";

export const Completed = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "green",
        border: "none",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      }}
      variant="outlined"
    />
  );
};
export const Undergoing = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "green",
        border: "none",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      }}
      variant="outlined"
    />
  );
};
export const Neverending = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "purple",
        border: "none",
        backgroundColor: "rgba(128, 0, 128, 0.1)",
      }}
      variant="outlined"
    />
  );
};
export const Stopped = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "red",
        border: "none",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
      }}
      variant="outlined"
    />
  );
};
export const Delayed = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "rgba(100,100,0)",
        border: "none",
        backgroundColor: "rgba(255, 255, 0, 0.2)",
      }}
      variant="outlined"
    />
  );
};
