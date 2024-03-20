"use client";

import React from "react";
import { Center, Tabs, rem } from "@mantine/core";
import styles from "./admin.module.scss";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import TableAuth from "@/_components/superadmin/tableAuth";
import TableAdmin from "@/_components/superadmin/tableAdmin";
import TablePassword from "@/_components/superadmin/tablePassword";

const Admin = () => {
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <Center
      maw="80%"
      mih="85%"
      px={64}
      style={{ borderRadius: "15px", border: "1px solid #dadada" }}
    >
      <div className={styles.main_container}>
        <Tabs
          color="yellow"
          defaultValue="admins"
          style={{
            minWidth: "1000px",
            minHeight: "600px",
          }}
        >
          <Tabs.List>
            <Tabs.Tab
              value="admins"
              leftSection={<IconPhoto style={iconStyle} />}
              style={{ fontWeight: "bold" }}
            >
              Admins
            </Tabs.Tab>
            <Tabs.Tab
              value="auth"
              leftSection={<IconPhoto style={iconStyle} />}
              style={{ fontWeight: "bold" }}
            >
              Authorization
            </Tabs.Tab>
            <Tabs.Tab
              value="password"
              leftSection={<IconMessageCircle style={iconStyle} />}
              style={{ fontWeight: "bold" }}
            >
              Change Password Requests
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel
            value="admins"
            style={{ maxHeight: "1000px", maxWidth: "1000px" }}
          >
            <TableAdmin />
          </Tabs.Panel>

          <Tabs.Panel
            value="auth"
            style={{ maxHeight: "1000px", maxWidth: "1000px" }}
          >
            <TableAuth />
          </Tabs.Panel>

          <Tabs.Panel
            value="password"
            style={{ maxHeight: "1000px", maxWidth: "1000px" }}
          >
            <TablePassword />
          </Tabs.Panel>
        </Tabs>
      </div>
    </Center>
  );
};

export default Admin;
