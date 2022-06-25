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
  Image,
  Tfoot,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

const DealsTable = (props) => {
  const priceColumnId = "price"; // in case this HAD to be changed, it is declared here as a variable just in case.
  const titleColumnId = "title"; // as above

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
        maxWidth: "45px",
      },
      {
        Header: () => <>% Diff</>,
        accessor: "diff",
        isNumeric: true,
        maxWidth: "25px",
      },
      // {
      //   Header: "Record Low",
      //   accessor: "lowest",
      //   isNumeric: true,
      //   maxWidth: "30px",
      // },
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
            fontSize: ".9em",
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
        <Text py={"0.1em"} fontSize={"md"}>
          ${currentPrice}
        </Text>
      </>
    );
  };

  const data = React.useMemo(() => {
    const { dealsData } = props;
    if (!dealsData) {
      return [];
    }
    const formattedDeals = [];
    dealsData.forEach((deal) => {
      formattedDeals.push({
        image: deal.image_path,
        id: deal.item_id,
        title: deal.title,
        store: deal.store_name,
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

  const renderHeaderColumns = (headerGroup) => {
    return (
      <Tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => {
          return (
            <Th
              key={column.Header}
              {...column.getHeaderProps(column.getSortByToggleProps())}
              isNumeric={column.isNumeric}
              maxWidth={column.maxWidth}
            >
              <HStack>
                <Box>{column.render("Header")}</Box>
                {column.disableSortBy ? null : (
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
                )}
              </HStack>
            </Th>
          );
        })}
      </Tr>
    );
  };

  const renderCell = (cell) => {
    switch (cell.column.id) {
      case priceColumnId:
        return priceDisplay(
          cell.row.original.price,
          cell.row.original?.prv_price
        );
      case titleColumnId:
        return (
          <HStack>
            <Image
              boxSize="80px"
              maxWidth={"75px"}
              maxHeight={"75px"}
              fit={"contain"}
              src={process.env.MIX_IMAGE_PREFIX + "/" + cell.row.original.image}
              alt="Game Image"
            />
            <Box boxSize={"0.1rem"} />
            {cell.render("Cell")}
          </HStack>
          // <Box boxSize={"75px"}>

          // </Box>
          // <Box maxW={"75px"} maxH={"75px"}>

          // <img
          //   // height={"75px"}
          //   style={{objectFit: "scale-down"}}
          //   alt="Game Image"
          //   src={process.env.MIX_IMAGE_PREFIX + "/" + cell.row.original.image}
          //   />
          //   </Box>
        );
      default:
        return cell.render("Cell");
    }
  };

  //Prep for the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // page,
    prepareRow,
    // setPageSize,
    // pageCount,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useSortBy
    // usePagination
  );

  return (
    <Table size="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => renderHeaderColumns(headerGroup))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td
                  {...cell.getCellProps()}
                  py={"0.2"}
                  // mx={"0"}
                  isNumeric={cell.column.isNumeric}
                >
                  {renderCell(cell)}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
      <Tfoot></Tfoot>
    </Table>
  );
};

DealsTable.propTypes = {
  dealsData: PropTypes.array.isRequired,
};

export default DealsTable;
