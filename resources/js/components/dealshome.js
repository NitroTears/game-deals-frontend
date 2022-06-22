import {
  Container,
  useToast,
  Spinner,
  Center,
  HStack,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NewNavLink from "./navbar/index";
import DealsTable from "./deals-table/dealsTable";
import axios from "axios";

const DealsHome = (props) => {
  const [dealsData, setDealsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedPhysical, setSelectedPhysical] = useState(null);
  const [searchName, setSearchName] = useState(null);
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

  const searchDeals = () => {
    //Use search constraints to get deals from backend.
  };

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
            <br />
            <HStack paddingBottom={"0.5rem"}>
              <Select
                size="sm"
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="all">All Platforms</option>
                <option value="ps4">Playstation 4</option>
                <option value="ps5">Playstation 5</option>
                <option value="switch">Nintendo Switch</option>
                <option value="xbone">Xbox One</option>
                <option value="xbseries">Xbox Series</option>
              </Select>
              <Select
                size="sm"
                onChange={(e) => setSelectedPhysical(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="phys">Physical Only</option>
                <option value="digi">Digital Only</option>
              </Select>
              <Input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search for Deals"
                size="sm"
              />
              <Button
                size="sm"
                minWidth="60px"
                colorScheme="orange"
                onClick={searchDeals}
              >
                Search
              </Button>
            </HStack>
            <DealsTable dealsData={dealsData} />
          </>
        )}
      </Container>
    </>
  );
};

export default DealsHome;
