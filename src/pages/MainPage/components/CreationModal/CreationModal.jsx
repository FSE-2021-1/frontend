import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

const CreationModal = ({ id, open, onCreate, onClose }) => {
  const [local, setLocal] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (open) {
      setInput("");
      setOutput("");
      setLocal("");
    }
  }, [open]);

  const handleCreate = () => {
    if (local === "" || input === "" || output === "") {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }
    onCreate({ id, input, output, local });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Adicionar novo dispositivo</DialogTitle>
      <DialogContent>
        <Snackbar
          open={isError}
          autoHideDuration={6000}
          message="Todos os campos devem ser preenchidos!"
        />
        <Grid direction="column" container spacing={2}>
          <Grid item>
            <TextField label="ID do dispositivo" value={id} disabled />
          </Grid>
          <Grid item>
            <TextField
              label="Entrada"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Saída"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
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
