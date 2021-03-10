import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

/// Component  ///
import Message from "../components/Message";
import Loader from "../components/Loader";

/// Custom Style  ///
import {
  useStyles,
  StyledTableCell,
  StyledTableRow,
} from "./customStyle/userListScreen";

///  REDUX  ///
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../redux/actions/userAction";

const UserListScreen = ({ history, API }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  ///  USER LIST REDUCER  ///
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  ///  USER INFO  ///
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(API));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, API]);

  return (
    <>
      <h1 className={classes.heading}>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Paper elevation={20}>
            <TableContainer className={classes.tableContainer}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">ID</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Admin</StyledTableCell>
                    <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
                        <StyledTableRow key={user._id}>
                          <StyledTableCell component="th" scope="row">
                            {user._id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {user.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {user.email}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {user.isAdmin ? (
                              <CheckIcon className={classes.check} />
                            ) : (
                              <CloseIcon
                                color="error"
                                className={classes.cross}
                              />
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {/* Edit user detail */}
                            <Tooltip title="Edit">
                              <IconButton aria-label="edit">
                                <EditIcon color="action" />
                              </IconButton>
                            </Tooltip>

                            {/* Delete user detail */}
                            <Tooltip title="Delete">
                              <IconButton aria-label="delete">
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users && users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={(event, newPage) => setPage(newPage)}
              onChangeRowsPerPage={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </Paper>
        </>
      )}
    </>
  );
};

export default UserListScreen;
