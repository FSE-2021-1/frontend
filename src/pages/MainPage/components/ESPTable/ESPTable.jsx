import {
  Avatar,
  Box,
  IconButton,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Adjust from "@material-ui/icons/Adjust";
import Eject from "@material-ui/icons/Eject";

const ESPTable = ({ data, onSwitchChange, onDelete }) => {
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((esp) => (
              <TableRow key={esp.id}>
                <TableCell>{esp.id}</TableCell>
                <TableCell>{esp.local}</TableCell>
                <TableCell>
                  {esp.temperature && !Number.isNaN(esp.temperature) && (
                    <Typography variant="body2">
                      Temperatura: <span>{esp.temperature.toFixed(2)}</span> ºC
                    </Typography>
                  )}
                  {esp.humidity && !Number.isNaN(esp.humidity) && (
                    <Typography variant="body2">
                      Umidade: <span>{esp.humidity.toFixed(2)} %</span>
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <span>{esp.input.name}</span>
                  <Avatar
                    variant="circle"
                    style={{
                      backgroundColor: esp.input.value ? "#0DF205" : undefined,
                    }}
                  >
                    <Adjust />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Box style={{ marginRight: 12 }}>
                    <span>{esp.output.name}</span>
                    <Slider
                      size="small"
                      min={0}
                      max={255}
                      value={esp.output.value}
                      onChange={(e, value) => onSwitchChange(esp.id, value)}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDelete(esp.id)}>
                    <Eject />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ESPTable;
