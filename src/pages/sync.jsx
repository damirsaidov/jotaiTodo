import { useAtom } from "jotai";
import { counterAtom } from "../atoms/todoAtom";
import {
  Button,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Chip,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
function Counter() {
  const [data, setdata] = useAtom(counterAtom);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [elem, setElem] = useState("");
  const [edit, setEdit] = useState("");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("All");
  return (
    <Box sx={{ p: 2 }}>
      <Stack className="lars" direction='row' spacing={2} mb={4} flexWrap='wrap' gap={2}>
        <TextField
          size='small'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          variant='contained'
          onClick={() =>
            setdata((prev) => [
              ...prev,
              { name: name, status: false, id: Date.now() },
            ])
          }
        >
          Add
        </Button>
        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>All</InputLabel>
          <Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            label='All'
          >
            <MenuItem value='All'>all</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          size='small'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>
      {data
        ?.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
        ?.filter((e) => {
          if (selected == "active") return e.status == true;
          if (selected == "inactive") return e.status == false;
          return true;
        })
        ?.map((e) => (
          <Box key={e.id} mb={3}>
            <Typography className="hh" variant='h5' gutterBottom>
              {e.name}
            </Typography>
            <Stack
            className="lars"
              direction='row'
              spacing={2}
              alignItems='center'
              flexWrap='wrap'
              gap={1}
            >
              <Chip
                label={e.status ? "active" : "inactive"}
                color={e.status ? "success" : "error"}
                size='small'
                sx={{ width: 90, justifyContent: "center" }}
              />
              <Button
                variant='outlined'
                color='error'
                size='small'
                onClick={() =>
                  setdata((prev) => prev.filter((elem) => elem.id !== e.id))
                }
              >
                Delete
              </Button>
              <Button
                variant='outlined'
                size='small'
                onClick={() => {
                  setElem(e);
                  setEdit(e.name);
                  setModal(true);
                }}
              >
                Edit
              </Button>
              <Checkbox
                checked={e.status}
                onChange={() =>
                  setdata((prev) =>
                    prev.map((elem) =>
                      elem.id === e.id
                        ? { ...elem, status: !elem.status }
                        : elem
                    )
                  )
                }
              />
            </Stack>
          </Box>
        ))}
      <Dialog open={modal} onClose={() => setModal(false)}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            placeholder='Name'
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)}>Cancel</Button>
          <Button
            variant='contained'
            onClick={() => {
              setdata((prev) =>
                prev.map((item) =>
                  item.id == elem.id ? { ...item, name: edit } : item
                )
              );
              setModal(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
export default Counter;
