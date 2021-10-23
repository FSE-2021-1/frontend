import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { CreationModal, ESPTable } from "./components";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const [isCreating, setIsCreating] = useState(false);

  const handleClick = () => {
    setIsCreating(true);
  };

  const handleCreate = ({ id, input, output, local }) => {
    setIsCreating(false);
    setData((oldData) => [...oldData, { id, input, output, local }]);
    // TODO: Complete ESP registration
  };

  const handleClose = () => {
    setIsCreating(false);
  };

  const handleSwitch = (id, value) => {
    // TODO: ESP output switch
    console.log(id, value);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Trabalho Final de FSE</Typography>
      <Box className={classes.header}>
        {/*TODO remove button due new ESP flux*/}
        <Button variant="contained" color="primary" onClick={handleClick}>
          Adicionar ESP
        </Button>
      </Box>
      <ESPTable data={data} onSwitchChange={handleSwitch} />
      <CreationModal
        open={isCreating}
        id={Math.random().toString(36).substring(7)}
        onCreate={handleCreate}
        onClose={handleClose}
      />
    </Container>
  );
};

export default MainPage;
