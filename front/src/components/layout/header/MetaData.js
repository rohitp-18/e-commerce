import React from "react";
import { Helmet } from "react-helmet";

function MetaData(props) {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
        <meta
          name="description"
          content="Sale the product and buy our products"
        />
      </Helmet>
    </>
  );
}

export default MetaData;
