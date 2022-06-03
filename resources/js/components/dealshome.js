import { Container, TableContainer, Box, useToast, Spinner, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NewNavLink from "./navbar/index";
import DealsTable from "./deals-table/dealsTable";
import DataTable from "./deals-table/dataTable";
import axios from "axios";

const DealsHome = (props) => {
  const [dealsData, setDealsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Get the deals from the API.
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios
        .get("/api/get-data")
        .then((deals) => {
          setDealsData(deals.data);
          toast({
            title: `"${deals.data[0].title}" and more!`,
            description: `${deals.data.length} Deal(s) Grabbed.`,
            position: "bottom-right",
            status: "success",
            duration: 3500,
            isClosable: true,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [dealsData]);
  
  return (
    <>
      <NewNavLink {...props} />
      <Container maxW={"container.xl"}>
        {loading ? (
         <Center height={"20rem"}>
           <Spinner speed="0.8s" color="blue.300" size="xl" />
         </Center>
        ) : (
          <>
            {/* <Box p={3}>Main Content Here</Box> */}
            <DealsTable dealsData={dealsData} />
            {/* <DataTable /> */}
          </>
        )}

      </Container>
    </>
  );
};

export default DealsHome;
