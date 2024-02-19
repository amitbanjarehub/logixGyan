import React, { useState } from "react";
import { users } from "./data";
import UserItem from "./UserItem";
import { Typography } from "@mui/material";
import { userServices } from "app/services/userservices";
import { useQuery } from "react-query";

const UsersList = () => {
  const uDetails = useQuery("userDetails", userServices.vlist);
  console.log("result of userDetails: ", uDetails);

  const userDetails = uDetails?.data?.data ?? [];
  console.log("result of uData: ", userDetails);

  return (
    <React.Fragment>
      <Typography variant={"h2"} mb={3}>
        Users
      </Typography>
      {userDetails.map((user, index) => (
        <UserItem user={user} key={index} />
      ))}
    </React.Fragment>
  );
};

export default UsersList;
