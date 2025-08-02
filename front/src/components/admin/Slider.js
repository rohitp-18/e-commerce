import React from "react";
import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import {
  Add,
  Dashboard,
  ExpandMore,
  ImportExport,
  ListAlt,
  People,
  PostAdd,
  RateReview,
  Search,
} from "@mui/icons-material";
import "./slider.scss";

function Slider() {
  return (
    <>
      <section className="slider">
        <Link to={"/"}>E-COMMERCE</Link>

        <Link to={"/admin"}>
          <Dashboard /> Dashboard
        </Link>

        <div>
          <TreeView
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
          >
            <TreeItem sx={{ background: "#fff" }} nodeId="1" label="products">
              <Link to={"/admin/products"}>
                <TreeItem icon={<PostAdd />} label="All" nodeId="2" />
              </Link>
              <Link to={"/admin/product/new"}>
                <TreeItem icon={<Add />} label="Create" nodeId="3" />
              </Link>
            </TreeItem>
          </TreeView>
        </div>

        <Link to={"/admin/users"}>
          <People /> users
        </Link>

        <Link to={"/admin/orders"}>
          <ListAlt /> Orders
        </Link>

        <Link to={"/admin/reviews"}>
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
              <Link to={"/admin/ads"}>
                <TreeItem icon={<PostAdd />} label="All" nodeId="2" />
              </Link>
              <Link to={"/admin/ads/new"}>
                <TreeItem icon={<Add />} label="Create" nodeId="3" />
              </Link>
            </TreeItem>
          </TreeView>
        </div>

        <div>
          <TreeView
            defaultCollapseIcon={<ImportExport />}
            defaultExpandIcon={<Search />}
          >
            <TreeItem sx={{ background: "#fff" }} nodeId="1" label="Search">
              <Link to={"/admin/search"}>
                <TreeItem icon={<Search />} label="All" nodeId="2" />
              </Link>
              <Link to={"/admin/search/new"}>
                <TreeItem icon={<Add />} label="Create" nodeId="3" />
              </Link>
            </TreeItem>
          </TreeView>
        </div>
      </section>
    </>
  );
}

export default Slider;
