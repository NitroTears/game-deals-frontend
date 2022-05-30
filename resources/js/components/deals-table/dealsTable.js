import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  useTab,
  chakra,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const DealsTable = (props) => {
  const columns = React.useMemo(() => [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Store",
      accessor: "store_name",
    },
    {
      Header: () => {
        return (
          <>
            Previous / <br />
            Current Price
          </>
        );
      },
      accessor: "price",
      isNumeric: true,
    },
    {
      Header: "Percent Diff.",
      accessor: "diff",
      isNumeric: true,
    },
    {
      Header: "Scraped Time",
      accessor: "time",
    },
  ], []);

  const data = React.useMemo(() => [ //TEST DATA
    {
      title: "THE TITLE",
      store_name: "THE Store",
      price: "$$$$",
      diff: "45%",
      time: "WEDNESDAY THE 15TH",
    },
    {
      title: "THE 2nd TITLE",
      store_name: "THE Store",
      price: "$$$$",
      diff: "45%",
      time: "WEDNESDAY THE 15TH",
    },
    {
      title: "THE 3rd TITLE",
      store_name: "THE Store",
      price: "$$$$",
      diff: "45%",
      time: "WEDNESDAY THE 15TH",
    },
  ], []);

  const priceDisplay = (previousPrice, priceDisplay) => {
    // render current price with previous,
    // or just current if no discount.
    return (
      <Tr>
        <Td>Final Fantasy VII and Final Fantasy VIII Remastered</Td>
        <Td>ozgameshop.com</Td>
        <Td isNumeric>
          $80 <br /> <b>$50</b>
        </Td>
        <Td isNumeric>33%</Td>
        <Td isNumeric>2 weeks ago</Td>
      </Tr>
    );
  };

  useEffect(() => {
    const { dealsData } = props;
    console.log(dealsData);
  }, [props.dealsData]);

  //Prep for the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table size="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
  // return (
  //   <>
  //     <Table size="sm">
  //       <Thead>
  //         <Tr>
  //           <Th>Title</Th>
  //           <Th>Store</Th>
  //           <Th isNumeric>
  //             Previous / <br />
  //             Current Price
  //           </Th>
  //           <Th isNumeric>% Diff.</Th>
  //           <Th>Scraped Time</Th>
  //         </Tr>
  //       </Thead>
  //       <Tbody>
  //         {/* Replace this with the real data*/}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //         {priceDisplay()}
  //       </Tbody>
  //       <Tfoot>
  //         <Tr>
  //           <Th>Title</Th>
  //           <Th>Store</Th>
  //           <Th isNumeric>
  //             Previous / <br />
  //             Current Price
  //           </Th>
  //           <Th isNumeric>% Diff.</Th>
  //           <Th>Scraped Time</Th>
  //         </Tr>
  //       </Tfoot>
  //     </Table>
  //   </>
  // );
};

export default DealsTable;
