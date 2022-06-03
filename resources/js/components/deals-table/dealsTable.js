/* eslint-disable react/jsx-key */
import {
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
  HStack,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { useTable, useSortBy } from "react-table";
import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from "@chakra-ui/icons";

const DealsTable = (props) => {
  const priceColumnId = "price"; //in case this HAD to be changed, it is declared here as a variable just in case.
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Store",
        accessor: "store",
      },
      {
        Header: () => {
          return (
            <>
              <p style={{ fontSize: ".7em" }}>Previous /</p>Current
            </>
          );
        },
        accessor: priceColumnId,
        isNumeric: true,
        maxWidth: "40px",

      },
      {
        Header: "% Diff.",
        accessor: "diff",
        isNumeric: true,
        maxWidth: "25px",
      },
      {
        Header: "Scraped Time",
        accessor: "time",
      },
    ],
    []
  );

  // REMEMBER:
  //REMEMBER: Keep on tinkering with the headers, and then move on to the rows

  const priceDisplay = (currentPrice, previousPrice = null) => {
    return (
      <>
        <span
          style={{
            fontSize: ".7em",
            textDecoration: previousPrice ? "line-through" : "",
          }}
        >
          {previousPrice ? (
            `$${previousPrice}`
          ) : (
            <>
              <Badge variant="subtle" colorScheme="blue" fontSize="0.9em">
                New!
              </Badge>
            </>
          )}
        </span>
        <br />
        <p style={{ paddingBottom: "0.2em" }}>${currentPrice}</p>
      </>
    );
  };

  const data = React.useMemo(() => {
    const { dealsData } = props;
    const formattedDeals = [];
    dealsData.forEach((deal) => {
      formattedDeals.push({
        id: deal.item_id,
        title: deal.title,
        prv_price: parseFloat(deal.prv_price),
        price: parseFloat(deal.price),
        diff: deal.perc_difference
          ? `${parseFloat(deal.perc_difference).toFixed(2)}%`
          : "-",
        time: deal.price_scraped_timestamp,
      });
    });
    return formattedDeals;
  }, [props.dealsData]);

  const renderHeaderRow = (headerGroup) => {
    return (
      <Tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <Th
            key={column.Header}
            {...column.getHeaderProps(column.getSortByToggleProps())}
            isNumeric={column.isNumeric}
            maxWidth={column.maxWidth}
          >
            <HStack>
              <Box>{column.render("Header")}</Box>
              <Box>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <TriangleDownIcon aria-label="sorted descending" />
                  ) : (
                    <TriangleUpIcon aria-label="sorted ascending" />
                  )
                ) : (
                  <UpDownIcon aria-label="not-sorted" />
                )}
              </Box>
            </HStack>
          </Th>
        ))}
      </Tr>
    );
  };

  //Prep for the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table size="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => renderHeaderRow(headerGroup))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td
                  {...cell.getCellProps()}
                  py={"0.4"}
                  isNumeric={cell.column.isNumeric}
                >
                  {cell.column.id == priceColumnId
                    ? priceDisplay(
                        cell.row.original.price,
                        cell.row.original?.prv_price
                      )
                    : cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default DealsTable;
