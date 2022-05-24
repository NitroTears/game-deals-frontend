import { Container, TableContainer } from "@chakra-ui/react";
import React from "react";
import NewNavLink from "./navbar/index";

const DealsHome = (props) => {
  return (<>
    <NewNavLink {...props} />
    <Container>
      <TableContainer />
    </Container>
  </>
  );
};

export default DealsHome;
