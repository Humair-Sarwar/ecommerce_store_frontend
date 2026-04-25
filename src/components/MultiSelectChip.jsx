import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip({ data = [], loading = false, value = [], onChange }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const { target: { value: nextValue } } = event;
    onChange(typeof nextValue === 'string' ? nextValue.split(',') : nextValue);
  };

  const handleDelete = (idToDelete) => {
    onChange(value.filter((id) => id !== idToDelete));
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 300 }} size="small" fullWidth>
        <InputLabel id="demo-multiple-chip-label">
          {loading ? "Loading Terms..." : "Select Terms"}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label="Select Terms" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((id) => {
                const term = data.find((item) => item.id === id);
                return (
                  <Chip
                    key={id}
                    label={term ? term.title : id}
                    sx={{ backgroundColor: '#b9ddd4', border: '1px solid #3a9d85' }}
                    size="small"
                    onDelete={() => handleDelete(id)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                );
              })}
            </Box>
          )}
          disabled={loading || data.length === 0}
        >
          {data.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles(item.id, value, theme)}
              sx={{ fontSize: '14px' }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
