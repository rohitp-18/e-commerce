import React from "react";
import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import {
  Add,
  Dashboard,
  ExpandMore,
  ImportExport,
  ListAlt,
  PostAdd,
  RateReview,
} from "@mui/icons-material";

function SellerSlider() {
  return (
    <>
      <section className="slider">
        <Link to={"/"}>E-COMMERCE</Link>

        <Link to={"/seller"}>
          <Dashboard /> Dashboard
        </Link>

        <div>
          <TreeView
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
          >
            <TreeItem sx={{ background: "#fff" }} nodeId="1" label="products">
              <Link to={"/seller/products"}>
                <TreeItem icon={<PostAdd />} label="All" nodeId="2" />
              </Link>
              <Link to={"/seller/product/new"}>
                <TreeItem icon={<Add />} label="Create" nodeId="3" />
              </Link>
            </TreeItem>
          </TreeView>
        </div>

        <Link to={"/seller/orders"}>
          <ListAlt /> Orders
        </Link>

        <Link to={"/seller/reviews"}>
          <RateReview /> Reviews
        </Link>
        <div>
          <TreeView
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
          >
            <TreeItem
              sx={{ background: "#fff" }}
              nodeId="1"
              label="Advertisements"
            >
              <Link to={"/seller/ads"}>
                <TreeItem icon={<PostAdd />} label="All" nodeId="2" />
              </Link>
              <Link to={"/seller/ads/new"}>
                <TreeItem icon={<Add />} label="Create" nodeId="3" />
              </Link>
            </TreeItem>
          </TreeView>
        </div>
      </section>
    </>
  );
}

export default SellerSlider;
