import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Link,
  VStack,
  HStack,
  SimpleGrid,
  Container,
  Divider,
  Flex,
  Spacer,
  ThemeProvider,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from '@chakra-ui/react';
import theme from '../../theme';
import Navbar from '../home/navbar';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const navigate = useNavigate();

    const handleStartChatClick = () => {
        navigate('/login'); // Navigate to the login page
        };
    
  return (
    <ThemeProvider theme={theme}>
    <Box>
        <Navbar />

      {/* Hero Section */}
      <Container
      maxW="100%"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      bgGradient="linear(to-r, brand.500, accent.blue)" // Use theme colors for gradient
      textAlign="center"
    >
      <Box mb={8}>
        <Heading
          as="h1"
          size="4xl"
          mb={4}
          color="white" // Ensure text stands out on gradient
          fontWeight="bold"
          lineHeight="shorter"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.6)"
        >
          Welcome to AlumAI
        </Heading>
        <Text
          fontSize="xl"
          mb={6}
          color="whiteAlpha.800"
          maxW="lg"
          mx="auto"
          textShadow="1px 1px 3px rgba(0, 0, 0, 0.4)"
        >
          Discover the world of alumni information with ease. Get the insights you need at your fingertips with our intelligent search and chat features.
        </Text>
        <Button
          colorScheme="red"
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          _hover={{ bg: "red.600", transform: "scale(1.05)" }}
          _focus={{ boxShadow: "outline" }}
          onClick={handleStartChatClick}
        >
          Start Chatting
        </Button>
      </Box>
    </Container>

    <Divider />

    <Container maxW="container.xl" mb={20} p={4}>
          <SimpleGrid spacing={8} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">
            {/* Easy Access Card */}
            <Card
              boxShadow="xl"
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }}
            >
              <CardHeader bg="brand.500" color="white" p={6}>
                <Heading size="lg" fontWeight="bold">
                  Easy Access
                </Heading>
              </CardHeader>
              <CardBody p={6}>
                <Text fontSize="lg" color="gray.700">
                  Quickly search for all info on any alumni student at your fingertips.
                  Our platform is designed to provide seamless access to the info of alumni students.
                </Text>
              </CardBody>
              <CardFooter p={6} bg="gray.50">
                <Button colorScheme="red" size="lg" variant="solid" borderRadius="full">
                  View here
                </Button>
              </CardFooter>
            </Card>

            {/* AI-Powered Search Card */}
            <Card
              boxShadow="xl"
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }}
            >
              <CardHeader bg="brand.500" color="white" p={6}>
                <Heading size="lg" fontWeight="bold">
                  AI-Powered Search
                </Heading>
              </CardHeader>
              <CardBody p={6}>
                <Text fontSize="lg" color="gray.700">
                  Utilize our advanced AI chatbot to find detailed information on alumni students with ease.
                  Just type your query, and let the AI do the rest, delivering accurate and relevant results in seconds.
                </Text>
              </CardBody>
              <CardFooter p={6} bg="gray.50">
                <Button colorScheme="red" size="lg" variant="solid" borderRadius="full">
                  Try it now
                </Button>
              </CardFooter>
            </Card>

            {/* Personalized Recommendations Card */}
            <Card
              boxShadow="xl"
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.3s ease"
              _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }}
            >
              <CardHeader bg="brand.500" color="white" p={6}>
                <Heading size="lg" fontWeight="bold">
                  Personalized Recommendations
                </Heading>
              </CardHeader>
              <CardBody p={6}>
                <Text fontSize="lg" color="gray.700">
                  Get personalized recommendations based on your search history. 
                  Our AI learns from your interactions to suggest alumni profiles that match your interests and needs.
                </Text>
              </CardBody>
              <CardFooter p={6} bg="gray.50">
                <Button colorScheme="red" size="lg" variant="solid" borderRadius="full">
                  Explore more
                </Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Container>


      {/* Footer */}
      <Box as="footer" bg="brand.500" color="white" py={8} mt={16}>
        <Container maxW="container.lg" textAlign="center">
          <Text mb={4}>© 2024 Tech Blog. All rights reserved.</Text>
          <HStack justifyContent="center" spacing={6}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Contact</Link>
          </HStack>
        </Container>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default HomePage;
