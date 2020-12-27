import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/////////////////////////////////////////    MATERIAL UI    ////////////////////////////////
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Avatar, Button } from "@material-ui/core";

///////////////////////////////////////      MATERIAL UI ICONS     ///////////////////////////////
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import PeopleIcon from "@material-ui/icons/People";
import LockIcon from "@material-ui/icons/Lock";

////////////////////////////////////////     REDUX          /////////////////////////////////////
import { useSelector, useDispatch } from "react-redux";
import { addShippingAddress } from "../redux/actions/cartAction";

///////////////////////////////////////     CUSTOM STYLE    /////////////////////////////////////
import { useStyle } from "./customStyle/LoginRegisterScreen";

import Loader from "../components/Loader";

const ShippingScreen = ({ history }) => {
  const classes = useStyle();

  ////////////////////     REDUX  REDUCER   ////////////////////
  const shippingAdd = useSelector((state) => state.cart);
  const { shippingAddress } = shippingAdd;

  ////////////////////    SHIPPING ADDRESS STATE (DEFAULT: FROM LOCAL STORAGE)    ////////////////////////
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    //DISPATCH SHIPPING ADDRESS
    dispatch(addShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <Paper elevation={14} className={classes.paper}>
      <Avatar className={classes.avatar}>
        <PeopleIcon />
      </Avatar>
      <Typography className={classes.heading} component="h1" variant="h5">
        SHIPPING ADDRESS
      </Typography>

      <form className={classes.form}>
        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-address">Address</InputLabel>
          <OutlinedInput
            id="outlined-adornment-address"
            placeholder="Your Address"
            required
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <PeopleIcon className={classes.lockIcon} />
              </InputAdornment>
            }
            labelWidth={60}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-city">City</InputLabel>
          <OutlinedInput
            id="outlined-adornment-city"
            placeholder="Your City"
            required
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon className={classes.lockIcon} />
              </InputAdornment>
            }
            labelWidth={30}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-postalCode">
            Postal Code
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-postalCode"
            placeholder="Postal Code"
            required
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon className={classes.lockIcon} />
              </InputAdornment>
            }
            labelWidth={90}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-confirmPassword">
            Country
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-country"
            placeholder="Your Country"
            required
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon className={classes.lockIcon} />
              </InputAdornment>
            }
            labelWidth={58}
          />
        </FormControl>

        <Button
          className={classes.button}
          onClick={submitHandler}
          size="large"
          variant="contained"
          color="primary"
        >
          CONTINUE
        </Button>
      </form>
    </Paper>
  );
};

export default ShippingScreen;
