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
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import Adjust from "@material-ui/icons/Adjust";
import Eject from "@material-ui/icons/Eject";

import Alarm from "../../../../alarm.mp3";

const useAudio = (path, socket) => {
  const [audio] = useState(new Audio(path));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
      socket.emit('alarm', playing);
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, setPlaying, toggle];
};

const ESPTable = ({ data, onSwitchChange, onDelete, socket }) => {

  const [playing, setPlaying, toggle] = useAudio(Alarm, socket);

  useEffect(() => {
    let playAlarm = false;
    data.forEach(esp => {
      if (esp.input.value) {
        playAlarm = true;
      }
    });
    setPlaying(playAlarm);
  }, [data]);

  return (
    <TableContainer>
      <FormControlLabel
          control={
            <Switch
              checked={playing}
              onChange={toggle}
            />
          }
          label="Alarme"
        />
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
