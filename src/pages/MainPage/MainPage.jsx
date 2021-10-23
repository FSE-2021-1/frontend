import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import { CreationModal } from "./components";

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [isCreating, setIsCreating] = useState(false);

  const handleClick = () => {
    setIsCreating(true);
  };

  const handleCreate = (nome, local) => {
    setIsCreating(false);
    console.log(nome, local);
    // TODO: Register a new ESP
  };

  const handleClose = () => {
    setIsCreating(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4">Trabalho Final de FSE</Typography>
      <Box className={classes.header}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Adicionar ESP
        </Button>
      </Box>
      <CreationModal
        open={isCreating}
        onCreate={handleCreate}
        onClose={handleClose}
      />
    </Container>
  );
};

export default MainPage;
