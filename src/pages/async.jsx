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
  InputLabel
} from "@mui/material";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const dataAtom = atom([]);
const getData = atom(null, async (_get, set) => {
  const res = await fetch("http://localhost:3000/data");
  const data = await res.json();
  set(dataAtom, data);
});
const sortData = atom(null, async (_get, set, prop) => {
  if (prop !== "all") {
    const res = await fetch(`http://localhost:3000/data?status=${prop}`);
    const data = await res.json();
    set(dataAtom, data);
  } else {
    set(getData);
  }
});
const searchData = atom(null, async (_get, set, prop) => {
  if (prop.trim()) {
    const res = await fetch(`http://localhost:3000/data?name=${prop}`);
    const data = await res.json();
    set(dataAtom, data);
  } else {
    set(getData);
  }
});
const deleteData = atom(null, async (_get, set, id) => {
  await fetch(`http://localhost:3000/data/${id}`, { method: "DELETE" });
  set(getData);
});
const changeStatus = atom(null, async (_get, set, e) => {
  await fetch(`http://localhost:3000/data/${e.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...e, status: !e.status }),
  });
  set(getData);
});
const changeName = atom(null, async (_get, set, obj) => {
  await fetch(`http://localhost:3000/data/${obj.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...obj, name: obj.name }),
  });
  set(getData);
});
const postData = atom(null, async (_get, set, name) => {
  await fetch(`http://localhost:3000/data`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name: name, status: false }),
  });
  set(getData);
});

export default function Async() {
  const [data] = useAtom(dataAtom);
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState("");
  const [elem, setElem] = useState("");
  const [, fetchData] = useAtom(getData);
  const [, deleteUser] = useAtom(deleteData);
  const [, changeData] = useAtom(changeStatus);
  const [, addUser] = useAtom(postData);
  const [, editUser] = useAtom(changeName);
  const [, select] = useAtom(sortData);
  const [, search] = useAtom(searchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Box sx={{ p: 2 }}>
      <Stack className="lars" direction="row" spacing={2} mb={3}>
        <TextField
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={() => addUser(name)}>
          Add
        </Button>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>all</InputLabel>
          <Select defaultValue="all" onChange={(e) => select(e.target.value)}>
            <MenuItem value="all">all</MenuItem>
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          placeholder="Search"
          size="small"
          onChange={(e) => search(e.target.value)}
        />
      </Stack>

      <div>
        {data.map((e) => (
          <Box key={e.id} mb={2}>
            <Typography className="hh" variant="h5">{e.name}</Typography>
            <Stack className="lars" direction="row" spacing={2} alignItems="center" mt={1}>
              <Chip
                label={e.status ? "active" : "inactive"}
                color={e.status ? "success" : "error"}
              />
              <Button variant="outlined" color="error" onClick={() => deleteUser(e.id)}>
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => [setModal(true), setEdit(e.name), setElem(e)]}
              >
                Edit
              </Button>
              <Button component={Link} to={`/about/${e.id}`}>
                Info
              </Button>
              <Checkbox checked={e.status} onChange={() => changeData(e)} />
            </Stack>
          </Box>
        ))}
      </div>

      <Dialog open={modal} onClose={() => setModal(false)}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            placeholder="name"
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)}>Cancel</Button>
          <Button
            onClick={() => {
              editUser({ ...elem, name: edit });
              setModal(false);
            }}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}