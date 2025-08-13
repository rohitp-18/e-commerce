import { QuestionMark } from "@mui/icons-material";
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./pageNot.scss";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

function PageNot() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const backHandler = useCallback(() => {
    let url = location.search.split("to=")[1]?.split("&")[0];
    if (user) {
      if (url && url.includes("login")) {
        navigate("/account");
      } else {
        navigate(-1);
      }
      return;
    }
    if (url && url.includes("login")) {
      navigate("/account");
    } else {
      navigate(-1);
    }
  }, [location, navigate, user]);
  return (
    <>
      <section className="page-not">
        <QuestionMark />
        <p>Page Not Found</p>
        <div className="flex justify-center items-center gap-20">
          <Button
            sx={{
              backgroundColor: "white !important",
              color: "tomato !important",
            }}
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button variant="contained" onClick={backHandler}>
            Back
          </Button>
        </div>
      </section>
    </>
  );
}

export default PageNot;
