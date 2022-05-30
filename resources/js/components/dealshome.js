import { Container, TableContainer, Box } from "@chakra-ui/react";
import React from "react";
import NewNavLink from "./navbar/index";
import DealsTable from "./deals-table/dealsTable";

const DealsHome = (props) => {
  return (
    <>
      <NewNavLink {...props} />
      <Container maxW={"container.xl"}>
        <Box p={3}>Main Content Here</Box>
        <DealsTable />
      </Container>
    </>
  );
};

export default DealsHome;
