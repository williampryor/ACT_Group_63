import React, { useEffect } from "react";
import { useState } from "react";
import {
  Text,
  Heading,
  Link,
  Box,
  Flex,
  Input,
  Button,
  Image,
  Select,
  Center,
  Card,
  Container,
  CardHeader,
  CardBody,
  CardFooter,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { urlPrefix } from "../../utils/constants";
import WatchProvider from "../WatchProviders.js";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(null);
  const [userRegion, setUserRegion] = useState("US");

  function getWatchlist() {
    var watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
    console.log(watchlist);
    setWatchlist(watchlist);
  }

  useEffect(() => {
    getWatchlist();
  }, []);
  useEffect(() => {
    console.log(userRegion);
  }, [userRegion]);
  useEffect(() => {
    document.getElementById("appHead").style.fontFamily = "Yasashii";
  }, []);

  return (
    <div data-testid="home-page" className="watchlist">
      <Heading
        mt="2rem"
        fontSize={["10vw", "3rem"]}
        fontWeight="normal"
        color="gold"
        fontFamily="Yasashii"
        textShadow="0 0 0.15rem white"
        _hover={{ textShadow: "0 0 0.95rem white" }}
        transition="1s"
      >
        WATCHLIST
      </Heading>
      <Center>
        <Select
          placeholder="Select Preferred Region"
          size="lg"
          w="15rem"
          bg="white"
          textColor="black"
          iconColor="black"
          onChange={(e) => setUserRegion(e.target.value)}
        >
          <option value="AU">Australia</option>
          <option value="CA">Canada</option>
          <option value="GB">United Kingdom</option>
          <option value="IE">Ireland</option>
          <option value="IN">India</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
          <option value="MX">Mexico</option>
          <option value="US">United States</option>
        </Select>
      </Center>
      {watchlist && watchlist.length > 0 ? (
        <VStack mt="2rem" flexWrap="wrap" justify="center">
          {watchlist.map((el) => {
            return (
              <Box
                key={el.id}
                direction="row"
                maxW="95%"
                minW="min-content"
                margin="1rem"
                paddingRight="1rem"
                align="center"
                bg="purple.900"
                color="goldenrod"
              >
                <Image
                  w="18rem"
                  src={`https://image.tmdb.org/t/p/w500` + el.poster}
                  marginRight="1rem"
                />
                <CardBody>
                  <WatchProvider movie={el.id} region={userRegion} />
                </CardBody>
              </Card>
            );
          })}
        </VStack>
      ) : (
        <Text>Watchlist Not Found!</Text>
      )}
      <footer className="watchFooter">
        <Text>All links courtesy of JustWatch</Text>
      </footer>
    </div>
  );
}

export default Watchlist;
