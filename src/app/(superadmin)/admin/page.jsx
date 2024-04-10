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
import { useState, useEffect } from "react";

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";

const Admin = () => {
  const [admin, setAdmin] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [authorize, setAuthorize] = useState([]);
  const [newpass, setNewpass] = useState([]);
  const [rc, setRC] = useState(0);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/superadmin/data", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const data = await response.json();

      console.log(
        "REFRESING CONTENT =================================================="
      );

      console.log(data);
      setAdmin(data);
      setAdmins(data.admins);
      setAuthorize(data.authorize);
      setNewpass(data.newpass);
    };

    fetchData();
  }, [rc]);

  const iconStyle = { width: rem(12), height: rem(12) };

  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }
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
            <TableAdmin data={admins} setrc={setRC} />
          </Tabs.Panel>

          <Tabs.Panel
            value="auth"
            style={{ maxHeight: "1000px", maxWidth: "1000px" }}
          >
            <TableAuth data={authorize} setrc={setRC} />
          </Tabs.Panel>

          <Tabs.Panel
            value="password"
            style={{ maxHeight: "1000px", maxWidth: "1000px" }}
          >
            <TablePassword data={newpass} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </Center>
  );
};

export default Admin;
