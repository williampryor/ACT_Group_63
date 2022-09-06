import React, { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Link,
  SimpleGrid,
  Box,
  Image,
  Divider,
  Center,
  Flex,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router";

function Genre() {
  const [profileData, setProfileData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const genre = useParams();

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getGenre() {
    axios({
      method: "GET",
      url: "/genres/" + genre,
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setGenreData(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  // useEffect(() => {
  //   getGenre();
  // }, []);

  useEffect(() => {
    setGenreData([
      {
        title: "Mad Max: Fury Road",
        genres: ["Action", "Drama"],
        rating: 10,
        release_year: 2015,
        poster:
          "https://www.themoviedb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
      },
      {
        title: "Blade Runner 2049",
        genres: ["Sci-Fi", "Action"],
        rating: 10,
        release_year: 2017,
        poster:
          "https://www.themoviedb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      },
      {
        title: "RoboCop",
        genres: ["Sci-Fi", "Action"],
        rating: 10,
        release_year: 1987,
        poster:
          "https://www.themoviedb.org/t/p/original/hHtOgGb3NihlyRATHlKPaFApbrd.jpg",
      },
      {
        title: "Rambo III",
        genres: ["Action", "War"],
        rating: 10,
        release_year: 1988,
        poster:
          "https://www.themoviedb.org/t/p/original/pTVm2HrqV5kOt8tG4ZURNuhrmAq.jpg",
      },
    ]);
  }, []);

  console.log(genre);

  return (
    <div>
      <Heading fontSize="2rem">This is the Genre Page.</Heading>
      <SimpleGrid columns={2} width="100%" ml="2rem" mr="2rem">
        <Box>
          <Text fontSize="2rem">Info on the movies in the Genre go Here.</Text>
          <Link fontSize="1.5rem" href="/movies/test">
            Click here to go to the Movie Page.
          </Link>
          <p>Test call to db for "profile": </p>
          <button onClick={getData}>Click me</button>
          {profileData && (
            <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
          )}
        </Box>
        <Box
          w="85%"
          borderWidth="1rem"
          borderRadius="md"
          borderColor="gray"
          borderStyle="groove"
        >
          <Image
            w="100%"
            h="100%"
            src="https://m.media-amazon.com/images/M/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX917_.jpg"
          />
        </Box>
      </SimpleGrid>
      <Divider border="null" w="80%" />
      <Text fontSize="1.5rem" color="red">
        Below this is the dynamic data test, it may look strange.
      </Text>
      {genreData
        ? genreData.map((element) => {
            return (
              <Container centerContent key={element.title}>
                <SimpleGrid columns={2}>
                  <Box
                    border="0.5rem groove grey"
                    bg="lightblue"
                    fontSize="1.5rem"
                    w="20rem"
                    h="20rem"
                  >
                    <Link
                      href={
                        "/movies/" +
                        element.title.replace(/ /g, "").toLowerCase()
                      }
                    >
                      <Text>Movie: {element.title}</Text>
                      <Text>Main Genre: {element.genres[0]}</Text>
                      <Text>Rating: {element.rating}</Text>
                      <Text>Release Year: {element.release_year}</Text>
                    </Link>
                  </Box>
                  <Box
                    w="25rem"
                    borderWidth="1rem"
                    borderRadius="md"
                    borderColor="gray"
                    borderStyle="groove"
                  >
                    <Image w="100%" h="100%" src={element.poster} />
                  </Box>
                </SimpleGrid>
              </Container>
            );
          })
        : []}
    </div>
  );
}

export default Genre;
