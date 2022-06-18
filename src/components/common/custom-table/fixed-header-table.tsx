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
import { AsyncDivSpinner } from "../spinners";

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

const StyledTableContainer = styled((props: any) => (
  <TableContainer {...props} component={Paper}>
    {props.children}
  </TableContainer>
))`
  box-sizing: border-box;
  width: calc(100% - 40px);
  height: fit-content;
  max-height: 100%;
  overflow: overlay;
`;

const StyledTableHeader = styled(Box)`
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  box-sizing: border-box;
  z-index: 1;
`;

const StyledPaginationContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const StyledEmptyMessage = styled(Typography)`
  text-align: center;
  width: 100%;
  padding: 20px 0;
`;

const StyledTableCell = styled(TableCell)(
  ({ theme }) => `
    color: unset;
    // background-color: ${theme}
`
);

export function FixedHeaderTable(props) {
  const { columns, data, title, actions, loading, emptyMessage } = props;

  return (
    <TableComponentContainer>
      <StyledTableHeader>
        <Typography variant="h1">{title}</Typography>
        {actions}
      </StyledTableHeader>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((cell, index) => (
                <TableCell key={index}>{cell.Header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!loading && data.length > 0 ? (
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((cell, ind) => (
                    <TableCell key={ind} component="th" scope="row">
                      {row[cell.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : null}
        </Table>
        {loading ? (
          <AsyncDivSpinner />
        ) : data.length === 0 ? (
          <StyledEmptyMessage variant="h4">
            {emptyMessage || "No data found"}
          </StyledEmptyMessage>
        ) : null}
      </StyledTableContainer>
      <StyledPaginationContainer></StyledPaginationContainer>
    </TableComponentContainer>
  );
}
