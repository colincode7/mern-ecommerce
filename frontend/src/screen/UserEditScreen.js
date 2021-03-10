import React, { useEffect, useState } from "react";

///    MATERIAL UI    ///
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Avatar, Button } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

///      MATERIAL UI ICONS     ///
import EmailIcon from "@material-ui/icons/Email";
import PeopleIcon from "@material-ui/icons/People";

///     REDUX     ///
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUser } from "../redux/actions/userAction";

///     CUSTOM STYLE    ///
import { useStyle } from "./customStyle/allFormsScreen";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { USER_UPDATE_RESET } from "../redux/actionTypes/userConstants";

const UserEditScreen = ({ history, match, API }) => {
  const classes = useStyle();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = match.params.id;

  const dispatch = useDispatch();

  ///  USER LOGIN REDUCER  ///
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  ///  USER DETAILS REDUCER (by id) ///
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  ///  USER UPDATE REDUCER (by id) ///
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  ///  get user details  ///
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserDetails(API, userId));
    }
  }, [dispatch, API, userId, userInfo, history]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [userInfo, user, history, successUpdate]);

  ///   GO BACK    ///
  const goBack = () => {
    history.goBack();
  };

  ///  update user details  ///
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateUser(API, userId, { name: name, email: email, isAdmin: isAdmin })
    );
  };

  return (
    <Paper elevation={14} className={classes.paper}>
      <div onClick={goBack}>
        <ArrowBackIosIcon className={classes.back} />
      </div>
      <Avatar className={classes.avatar}>
        <PeopleIcon />
      </Avatar>
      <Typography className={classes.heading} component="h1" variant="h5">
        Edit User
      </Typography>

      {/* ///    LOADER    /// */}
      {loading && <Loader />}
      {loadingUpdate && <Loader />}

      <form className={classes.form}>
        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            placeholder="Your Name"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <PeopleIcon className={classes.icon} />
              </InputAdornment>
            }
            labelWidth={45}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            placeholder="Email Address"
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon className={classes.icon} />
              </InputAdornment>
            }
            labelWidth={40}
          />
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              name="Is Admin"
              color="primary"
            />
          }
          label="Is Admin"
        />

        {/* ///     VALIDATION ERROR MESSAGE     /// */}
        {error && <Message varient="error">{error}</Message>}
        {errorUpdate && <Message varient="error">{errorUpdate}</Message>}

        {/* ///     SUCCESS MESSAGE     /// */}
        {successUpdate && (
          <Message varient="success">User Details Editted Successfully</Message>
        )}
        <Button
          className={classes.button}
          onClick={submitHandler}
          size="large"
          variant="contained"
          color="primary"
        >
          UPDATE
        </Button>
      </form>
    </Paper>
  );
};

export default UserEditScreen;
