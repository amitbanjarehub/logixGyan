import Page from "@jumbo/shared/Page";
import React from "react";
import Messages from "../pages/mail";

const mailRoutes = [
  {
    path: [
      "/mails/messages/",
      "/mails/messages/:category",
      "/mails/messages/:category/:id",
      "/mails/messages/:category/message/:messageID",
      "/mails/messages/:category/:id/message/:messageID",
    ],
    element: <Page component={Messages} />,
  },
];
export default mailRoutes;
