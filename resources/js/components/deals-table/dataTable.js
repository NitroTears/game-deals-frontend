/* eslint-disable react/jsx-key */
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Tfoot,
  Box
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import React from "react";

// This is an example component

function DataTable() {
  const data = React.useMemo(
    () => [
      {
        fromUnit: "inches",
        toUnit: "millimetres (mm)",
        factor: 25.4,
      },
      {
        fromUnit: "feet",
        toUnit: "centimetres (cm)",
        factor: 30.48,
      },
      {
        fromUnit: "yards",
        toUnit: "metres (m)",
        factor: 0.91444,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "To convert",
        accessor: "fromUnit",
      },
      {
        Header: "Into",
        accessor: "toUnit",
      },
      {
        Header: "Multiply by",
        accessor: "factor",
        isNumeric: true,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

//   return (
//     <Table size={"sm"} {...getTableProps()}>
//       <Thead>
//         {headerGroups.map((headerGroup) => (
//           <Tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <Th
//                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                 isNumeric={column.isNumeric}
//               >
//                 {column.render("Header")}
//                 {column.isSorted ? (
//                   column.isSortedDesc ? (
//                     <chakra.span pl="3">
//                       <TriangleDownIcon aria-label="sorted descending" />
//                     </chakra.span>
//                   ) : (
//                     <chakra.span pl="3">
//                       <TriangleUpIcon aria-label="sorted ascending" />
//                     </chakra.span>
//                   )
//                 ) : null}
//               </Th>
//             ))}
//           </Tr>
//         ))}
//       </Thead>
//       <Tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row);
//           return (
//             <Tr {...row.getRowProps()}>
//               {row.cells.map((cell) => (
//                 <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
//                   {cell.render("Cell")}
//                 </Td>
//               ))}
//             </Tr>
//           );
//         })}
//       </Tbody>
//       <Tfoot>
//         {headerGroups.map((headerGroup) => (
//           <Tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <Th isNumeric={column.isNumeric}>{column.render("Header")}</Th>
//             ))}
//           </Tr>
//         ))}
//       </Tfoot>
//     </Table>
//   );
// }
return (
  <Box as="table" {...getTableProps()}>
    <Box bg="lightgray" as="thead">
      {headerGroups.map((headerGroup) => {
        return (
          <Box as="tr" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
                <Box p={2} minWidth="100px" fontSize="sm" as="th" {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>

    <Box as="tbody" {...getTableBodyProps()}>
      {rows.map((row) => {
        // const {
        //   values: {
        //     _id: { dangerously_added_by_user },
        //   },
        // } = row;
        prepareRow(row);
        return (
          <Box bg={ "lightblue" } as="tr" {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <Box p={2} minWidth="100px" as="td" {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  </Box>
);
  }

export default DataTable;
