import {
  Button,
  Box,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useState } from "react";
import { CreationModal } from "..";

const PendingTable = ({ data, onRegister }) => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const handleEdit = (id) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleRegister = (data) => {
    onRegister(data);
    setCurrentId("");
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((esp) => (
                <TableRow key={esp.id}>
                  <TableCell>{esp.id}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(esp.id)}
                    >
                      Adicionar ESP
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreationModal open={open} id={currentId} onCreate={handleRegister} onClose={handleClose} />
    </>
  );
};

export default PendingTable;
