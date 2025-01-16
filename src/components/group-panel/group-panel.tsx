import { FC, ReactNode } from "react";

import { Section } from "../styled-components";
import {
  Grid2 as Grid,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

import type { Group } from "../../types";
import { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  handleGroupSelect: (event: SelectChangeEvent) => void;
  groupList: Group[];
  selectedGroup: Group;
};

const GroupPanel: FC<Props> = ({
  handleGroupSelect,
  groupList,
  selectedGroup,
}): ReactNode => {
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      size={{ xs: 12 }}
      offset={{ xs: 0, md: 0 }}
    >
      <Section elevation={3}>
        <Box sx={{ minWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel id="group-select-label">Group by</InputLabel>
            <Select
              onChange={handleGroupSelect}
              labelId="group-select-label"
              id="group-select"
              value={selectedGroup.key}
              label="Group by"
              style={{ textTransform: 'capitalize', width: '300px' }}
            >
              {groupList.map(({ id, key, name }) => (
                <MenuItem key={id} value={key}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Section>
    </Grid>
  );
};

export default GroupPanel;
