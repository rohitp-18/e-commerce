import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Home,
  LocationCity,
  Phone,
  PinDrop,
  Public,
  TransferWithinAStation,
} from "@mui/icons-material";
import "./shipping.scss";
import CheckoutSteps from "./CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { shippingInfoAction } from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: user.name,
      address,
      city,
      phone,
      pincode,
      state,
      country,
    };

    dispatch(shippingInfoAction(data));
    navigator("/order/confirm");
  };

  const phoneChange = (e) => {
    let b = e.toString();
    if (b.length > 10) return;
    setCountry(() => setCountry("india"));
    setPhone(e);
  };

  const pinCodeChange = (e) => {
    let b = e.toString();
    if (b.length > 6) return;
    setPincode(e);
  };

  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo.address);
      setCity(shippingInfo.city);
      setCountry(shippingInfo.country);
      setPhone(shippingInfo.phone);
      setState(shippingInfo.state);
      setPincode(shippingInfo.pincode);
    }
  }, [shippingInfo]);

  useEffect(() => {
    console.log(country, city);
  }, [country, city]);
  return (
    <>
      <CheckoutSteps step={0} />
      <section className="shipping-section">
        <form onSubmit={(e) => submitHandler(e)}>
          <h2>Shipping Form</h2>
          <Box sx={{ display: "flex", width: "70%", alignItems: "flex-end" }}>
            <Home sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              required
              name="address"
              sx={{ width: "30ch" }}
              value={address}
              label="Address"
              variant="standard"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", width: "70%", alignItems: "flex-end" }}>
            <LocationCity sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              required
              name="city"
              sx={{ width: "30ch" }}
              value={city}
              label="City"
              variant="standard"
              onChange={(e) => setCity(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", width: "70%", alignItems: "flex-end" }}>
            <PinDrop sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              required
              name="pincode"
              sx={{ width: "30ch" }}
              value={pincode}
              label="Pin Code"
              type="number"
              variant="standard"
              maxRows={6}
              onChange={(e) => pinCodeChange(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", width: "70%", alignItems: "flex-end" }}>
            <Phone sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              required
              name="phone"
              sx={{ width: "30ch" }}
              type="number"
              value={phone}
              label="Phone Number"
              variant="standard"
              onChange={(e) => phoneChange(e.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", width: "70%", alignItems: "flex-end" }}>
            <Public sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <FormControl sx={{ width: "30ch" }} variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                label="Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value={"india"}>India</MenuItem>
                <MenuItem value={"us"}>US</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {country && (
            <Box sx={{ display: "flex", width: "70%", alignItems: "flex-end" }}>
              <TransferWithinAStation
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <FormControl sx={{ width: "30ch" }} variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  label="Age"
                  value={state}
                  required
                  onChange={(e) => setState(e.target.value)}
                >
                  <MenuItem value={"india"}>India</MenuItem>
                  <MenuItem value={"us"}>US</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          <div className="cart-submit">
            <button type="submit"> Continue</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Shipping;
