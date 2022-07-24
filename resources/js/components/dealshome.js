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
  UnorderedList,
  ListItem,
  ListIcon,
  Alert,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NewNavLink from "./navbar/index";
import DealsTable from "./deals-table/dealsTable";
import axios from "axios";
import { useGamedealsHelpers } from "./shared/gamedealsHelpers";

const DealsHome = (props) => {
  const { successToast, errorToast } = useGamedealsHelpers();
  const [dealsData, setDealsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedPhysical, setSelectedPhysical] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [showMessage, setShowMessage] = useState(true);

  // Get the deals from the API on Page load.
  useEffect(() => {
    searchDeals();
  }, []);

  const searchDeals = (dealParams = { searchType: "all" }) => {
    if (!loading) {
      setLoading(true);
      axios
        .get("/api/get-data", { params: dealParams })
        .then((deals) => {
          setDealsData(deals.data);
          console.log(deals.data);
          successToast(
            `Got deals sucessfully! "${deals.data[0].title}" and more!`,
            `${deals.data.length} Deal(s) Grabbed.`
          );
          setLoading(false);
        })
        .catch((err) => {
          errorToast(err);
          setLoading(false);
        });
    }
    //Use search constraints to get deals from backend.
  };

  const onSearchButtonClicked = (e) => {
    const params = {
      title: searchName ? searchName : null,
      physicality: selectedPhysical,
      platform: selectedPlatform,
      searchType: e.target.id,
    };
    searchDeals(params);
  };

  return (
    <>
      <NewNavLink {...props} />
      <Container maxW={"container.xl"}>
        <>
          {showMessage ? (
            <Alert status="info">
              <VStack paddingRight={"20px"}>

              <Text>
                Some notes from me about the current progress
              </Text>
              <Button size={'sm'} onClick={() => setShowMessage(false)}>
                Click to Close this message
              </Button>
              </VStack>
              <UnorderedList>
                <ListItem>
                  If an error toast appears and cannot find deals, it means it
                  couldn't get them from the database.
                </ListItem>
                <ListItem>
                  None of the 'links' in the navbar work, because those pages
                  don't exist yet.
                </ListItem>
                <ListItem>
                  When changing the colour theme, the labels on the games
                  change, thats okay because it's randomised on render at the
                  moment.
                </ListItem>
              </UnorderedList>
            </Alert>
          ) : null}
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
              title="search for deals"
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
                <Button
                  id="deals"
                  colorScheme="orange"
                  onClick={onSearchButtonClicked}
                >
                  Deals
                </Button>
                <Button
                  id="new"
                  colorScheme="yellow"
                  onClick={onSearchButtonClicked}
                >
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
