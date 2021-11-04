import {
  Box,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const ESPTable = ({ data, onSwitchChange }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Local</TableCell>
            <TableCell>Dados</TableCell>
            <TableCell>Entrada</TableCell>
            <TableCell>Saída</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((esp) => (
              <TableRow key={esp.id}>
                <TableCell>{esp.id}</TableCell>
                <TableCell>{esp.local}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Temperatura: <span>{esp.temperature}</span> ºC
                  </Typography>
                  <Typography variant="body2">
                    Umidade: <span>{esp.humidity} %</span>
                  </Typography>
                </TableCell>
                <TableCell>{esp.input.name}</TableCell>
                <TableCell>
                  <Box>
                    <span>{esp.output.name}</span>
                    <Switch
                      color="primary"
                      size="medium"
                      onChange={(e) => onSwitchChange(esp.id, e.target.checked)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ESPTable;
