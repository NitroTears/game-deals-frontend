import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Box,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  useTab,
  chakra,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const DealsTable = (props) => {
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
              Previous / <br />
              Current Price
            </>
          );
        },
        accessor: "price",
        isNumeric: true,
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

  //REMEMBER: The next task is to transform the data currently being requested, into a row for the table. Make a Row Component!
  //REMEMBER: Keep on tinkering with the headers, and then move on to the rows

  const priceDisplay = (previousPrice, currentPrice) => {
    // render current price with previous,
    // or just current if no discount.
    if (!previousPrice) {
      return (
        <>
          <span>New!</span>
          <br />${currentPrice}
        </>
      );
    }
    return (
      <>
        <span style={{ textDecoration: "line-through" }}>
          {" "}
          ${previousPrice}
        </span>
        <br />${currentPrice}
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
        price: priceDisplay(deal.prv_price, deal.price), // `$${deal.price}`
        store: deal.store_name,
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
            <Box>
              <>{column.render("Header")}</>
              <chakra.span pl="2">
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <TriangleDownIcon aria-label="sorted descending" />
                  ) : (
                    <TriangleUpIcon aria-label="sorted ascending" />
                  )
                ) : null}
              </chakra.span>
            </Box>
          </Th>
        ))}
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
        {headerGroups.map((headerGroup) => renderHeaderRow(headerGroup))}
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
