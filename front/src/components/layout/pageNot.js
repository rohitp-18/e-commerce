import { QuestionMark } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./pageNot.scss";

function PageNot() {
  const navigate = useNavigate();
  return (
    <>
      <section className="page-not">
        <QuestionMark />
        <p>Page Not Found</p>
        <button onClick={() => navigate("/")}>HOME</button>
      </section>
    </>
  );
}

export default PageNot;
