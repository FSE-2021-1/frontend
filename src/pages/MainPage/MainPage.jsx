import {
  Badge,
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Tabs,
  Tab,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { CreationModal, ESPTable, PendingTable } from "./components";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const socket = io.connect("http://localhost:5005");

const MainPage = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [pendingESPS, setPendingESPS] = useState([]);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("req state", socket.id);
    });
  }, []);

  useEffect(() => {
    socket.on("new esp", (message) => {
      setPendingESPS((oldValue) => [...oldValue, message]);
    });

    socket.on("state", (data, pending) => {
      setData(data);
      if (pending) {
        setPendingESPS(pending);
      }
    });
  }, [setPendingESPS, setData]);

  const handleCreate = (data) => {
    socket.emit("register", data);
    setPendingESPS((oldValue) =>
      oldValue.filter((item) => item.id !== data.id)
    );
  };

  const handleSwitch = (id, value) => {
    socket.emit("push output state", id, value);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleDelete = (id) => {
    socket.emit("delete esp", id);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Trabalho Final de FSE</Typography>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="ESPs atuais" value="1" />
        <Tab
          label={
            <Badge badgeContent={pendingESPS.length} color="primary">
              ESPs pendentes
            </Badge>
          }
          value="2"
        />
      </Tabs>
      {currentTab === "1" ? (
        <ESPTable
          data={data}
          onSwitchChange={handleSwitch}
          onDelete={handleDelete}
        />
      ) : (
        <PendingTable data={pendingESPS} onRegister={handleCreate} />
      )}
    </Container>
  );
};

export default MainPage;
