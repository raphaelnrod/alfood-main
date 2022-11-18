import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface IProps {
    active: boolean;
}

export default function SimpleBackdrop({active}: IProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    handleToggle(active);
  }, [active]);

  const handleToggle = (active: boolean) => {
    setOpen(active);
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
