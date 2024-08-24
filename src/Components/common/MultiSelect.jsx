import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

function getStyles(option, value, theme) {
  return {
    fontWeight:
      value.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function MultiSelect({
  placeholder,
  name,
  value,
  label,
  options,
  wrapperClass,
  onChange,
}) {
  const theme = useTheme();

  const onChangeValue = (event) => {
    event.target.name = name;
    onChange(event);
  };

  return (
    <div className={`inputField ${wrapperClass}`}>
      <label>{label}</label>
      <FormControl sx={{ m: 1, width: 350, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={value}
          onChange={onChangeValue}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{placeholder}</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {options.map((option, i) => (
            <MenuItem
              key={option + "" + i}
              value={option}
              style={getStyles(option, value, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
