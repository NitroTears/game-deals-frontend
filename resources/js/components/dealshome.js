import {
  Container,
  Spinner,
  Center,
  Stack,
  Select,
  Input,
  Button,
  ButtonGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NewNavLink from "./navbar/index";
import DealsTable from "./deals-table/dealsTable";
import axios from "axios";
import { useGamedealsHelpers } from "./gamedealsHelpers";

const DealsHome = (props) => {
  const [dealsData, setDealsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedPhysical, setSelectedPhysical] = useState(null);
  const [searchName, setSearchName] = useState("");
  const { successToast, errorToast } = useGamedealsHelpers();

  // Get the deals from the API on Page load.
  useEffect(() => {
    if (!loading) {
      let dealParams = {};
      setLoading(true);
      axios
        .get("/api/get-data", { params: dealParams })
        .then((deals) => {
          setDealsData(deals.data);
          console.log(deals.data);
          successToast(
            `"${deals.data[0].title}" and more!`,
            `${deals.data.length} Deal(s) Grabbed.`
          );
          setLoading(false);
        })
        .catch((err) => {
            errorToast(err);
          setLoading(false);
        });
    }
  }, []);

  const searchDeals = () => {
    //Use search constraints to get deals from backend.
  };

  return (
    <>
      <NewNavLink {...props} />
      <Container maxW={"container.xl"}>
        <>
          <Stack
            alignItems={"flex-end"}
            direction={["column", "row"]}
            py={"0.4rem"}
          >
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
            <VStack>
              <Center>
                <Text paddingBottom={"0.2rem"} as="sub">
                  Search for
                </Text>
              </Center>
              <ButtonGroup size="sm" isAttached>
                <Button colorScheme="orange" onClick={searchDeals}>
                  Deals
                </Button>
                <Button colorScheme="yellow" onClick={searchDeals}>
                  New Games
                </Button>
              </ButtonGroup>
            </VStack>
          </Stack>
          {loading ? (
            <Center height={"20rem"}>
              <Spinner speed="0.8s" color="blue.300" size="xl" />
            </Center>
          ) : (
            <DealsTable dealsData={dealsData} />
          )}
        </>
      </Container>
    </>
  );
};

export default DealsHome;
