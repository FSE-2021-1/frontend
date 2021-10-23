import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

const CreationModal = ({ open, onCreate, onClose }) => {
  const [name, setName] = useState("");
  const [local, setLocal] = useState("");

  const handleCreate = () => {
    onCreate({ name, local });
    setName("");
    setLocal("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar novo dispositivo</DialogTitle>
      <DialogContent>
        <Grid direction="column" container spacing={2}>
          <Grid item>
            <TextField
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              onClick={handleCreate}
              variant="contained"
              color="secondary"
            >
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CreationModal;
