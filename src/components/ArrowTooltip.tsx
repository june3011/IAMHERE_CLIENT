import styled from "@emotion/styled";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const ArrowTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#ffffff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    marginTop: "16px !important",
    textAlign: "center",
    fontSize: "12px",
    backgroundColor: "#ffffff",
    fontFamily: "Poppins, sans-serif",
  },
}));

export default ArrowTooltip;
