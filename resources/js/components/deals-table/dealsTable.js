import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import React, { useEffect } from "react";
import axios from "axios";

const DealsTable = (props) => {
  const priceDisplay = (previousPrice, priceDisplay) => {
    // render current price with previous,
    // or just current if no discount.
    return (
      <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
    );
  };

  useEffect(() => {
    axios
      .get("/api/get-data")
      .then((deals) => {
        console.log(deals.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Store</Th>
              <Th isNumeric>
                Previous / <br />
                Current Price
              </Th>
              <Th isNumeric>% Diff.</Th>
              <Th>Scraped Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* Replace this with the real data*/}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
            {priceDisplay()}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Title</Th>
              <Th>Store</Th>
              <Th isNumeric>
                Previous / <br />
                Current Price
              </Th>
              <Th isNumeric>% Diff.</Th>
              <Th>Scraped Time</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default DealsTable;
