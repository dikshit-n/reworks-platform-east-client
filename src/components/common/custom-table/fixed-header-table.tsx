import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, styled, Typography } from "@mui/material";
import { layoutSetup, LAYOUT_NAMES } from "@/layouts";

const TableComponentContainer = styled(Box)`
  box-sizing: border-box;
  width: 100%;
  position: relative;
  //   height: fit-content;
  height: calc(
    100vh - ${layoutSetup[LAYOUT_NAMES.MinimalSidebarLayout].header.height}
  );
  padding: 20px;
  padding-top: 10px;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const StyledTableContainer = styled(TableContainer)`
  box-sizing: border-box;
  width: calc(100% - 40px);
  height: fit-content;
  max-height: 100%;
`;

const StyledTableHeader = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
`;

const StyledPaginationContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

export function FixedHeaderTable(props) {
  const { columns, data, title } = props;

  return (
    <TableComponentContainer>
      <StyledTableHeader>
        <Typography variant="h1">{title}</Typography>
      </StyledTableHeader>
      <StyledTableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((cell) => (
                <TableCell>{cell.Header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((cell) => (
                  <TableCell component="th" scope="row">
                    {row[cell.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <StyledPaginationContainer></StyledPaginationContainer>
    </TableComponentContainer>
  );
}
