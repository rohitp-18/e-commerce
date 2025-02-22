import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

function AdsForm({
  handlePayment,
  name,
  setName,
  initialDate,
  setInitialDate,
  description,
  setDescription,
  expireDate,
  setExpireDate,
  category,
  setCategory,
  image,
  imageChange,
  loading,
  heading,
}) {
  const categoryList = [
    "laptop",
    "electronics",
    "mobile",
    "car accessories",
    "grocery",
    "dress",
    "home appliances",
  ];
  return (
    <form onSubmit={handlePayment}>
      <h3>{heading}</h3>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Spellcheck sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          required
          name="Name"
          sx={{ width: "30ch" }}
          value={name}
          label="Name"
          variant="standard"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AttachMoney sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          required
          name="expireDate"
          sx={{ width: "30ch" }}
          value={initialDate}
          label="Price"
          variant="standard"
          type="date"
          onChange={(e) => setInitialDate(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Description sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          required
          name="Description"
          sx={{ width: "30ch" }}
          multiline
          value={description}
          label="Description"
          variant="standard"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <Storage sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          required
          name="Stock"
          sx={{ width: "30ch" }}
          value={expireDate}
          label="Stock"
          variant="standard"
          type="date"
          onChange={(e) => setExpireDate(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountTree sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            label="Age"
            value={category}
            sx={{ width: "30ch" }}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryList.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <input
        type="file"
        onChange={(e) => imageChange(e)}
        accept="image/*"
        multiple
      />

      <Box className="images" sx={{ width: "32ch" }}>
        {image && <Avatar src={image} />}
      </Box>
      <Button disabled={loading} type="submit">
        {heading === "Create Advertisement" ? "Create" : "Update"}
      </Button>
    </form>
  );
}

export default AdsForm;
