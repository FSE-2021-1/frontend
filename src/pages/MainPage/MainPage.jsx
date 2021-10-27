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

const socket = io.connect("http://localhost:5000");

const MainPage = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [pendingESPS, setPendingESPS] = useState([{ id: "id123" }]);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    socket.on("new esp", (message) => {
      setPendingESPS((oldValue) => [...oldValue, message]);
    });
  }, [setPendingESPS]);

  const handleCreate = (data) => {
    socket.emit("register", data);
    setPendingESPS((oldValue) =>
      oldValue.filter((item) => item.id !== data.id)
    );
  };

  const handleSwitch = (id, value) => {
    // TODO: ESP output switch
    console.log(id, value);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
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
        <ESPTable data={data} onSwitchChange={handleSwitch} />
      ) : (
        <PendingTable data={pendingESPS} onRegister={handleCreate} />
      )}
    </Container>
  );
};

export default MainPage;
