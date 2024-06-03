import {
  ArrowLeft,
  ArrowRight,
  ArrowRightAlt,
  West,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

function Back() {
  const styl = {
    background: "transparent",
  };
  return (
    <nav>
      <div style={{ paddingRight: "20px", background: "#eee" }} className="nav">
        <Link style={{ padding: "0 20px" }} to={-1}>
          <West sx={{ fontSize: "35px" }} />
        </Link>
      </div>
    </nav>
  );
}

export default Back;
