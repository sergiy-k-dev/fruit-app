import { FC, ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import type { FruitTableData } from "../../types";

type Props = {
  fruitTableData: FruitTableData;
};

const FruitTable: FC<Props> = ({ fruitTableData }): ReactNode => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} size="small" aria-label="fruit table">
        <TableHead>
          <TableRow>
            {fruitTableData.headerList.map(({ align, name }, index) => (
              <TableCell key={index} align={align}>{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {fruitTableData.rowList.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.map((cellValue, index) => {
                if (index > 0) {
                  return <TableCell key={index} align="right">{cellValue}</TableCell>;
                }

                return (
                  <TableCell key={index} component="th" scope="row">
                    {cellValue}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FruitTable;
