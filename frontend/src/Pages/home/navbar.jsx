import React from 'react';
import {
  Box,
  Heading,
  Link,
  HStack,
  Flex,
  Spacer,
  Container,
  useBreakpointValue,
  IconButton,
  Collapse,
  VStack,
  useDisclosure,
  Button
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <Box as="header" bg="brand.500" color="white" py={4} mb={8} position="fixed" width="100%" top={0} zIndex={1000}>
      <Container maxW="container.lg">
        <Flex alignItems="center">
          <Heading size="lg" color="white">
            AlumAI
          </Heading>
          <Spacer />
          {isDesktop ? (
            <HStack spacing={8} color="white">
              <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>Home</Link>
              <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>About</Link>
              <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>Articles</Link>
              <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>Contact</Link>
              <Button 
                onClick={handleGetStartedClick} // Use onClick handler
                colorScheme="red" 
                variant="outline" 
                borderRadius="full" 
                _hover={{ bg: "white", color: "brand.500" }}
              >
                Get Started
              </Button>
            </HStack>
          ) : (
            <Flex alignItems="center">
              <IconButton
                aria-label="Open Menu"
                icon={<HamburgerIcon />}
                variant="outline"
                color="white"
                onClick={onToggle}
                _hover={{ bg: "accent.blue" }}
              />
              <Collapse in={isOpen}>
                <VStack
                  spacing={4}
                  align="start"
                  bg="brand.500"
                  p={4}
                  borderRadius="md"
                  position="absolute"
                  top={16}
                  right={0}
                  width="full"
                >
                  <IconButton
                    aria-label="Close Menu"
                    icon={<CloseIcon />}
                    variant="outline"
                    color="white"
                    onClick={onToggle}
                    _hover={{ bg: "accent.blue" }}
                  />
                  <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>Home</Link>
                  <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>About</Link>
                  <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>Articles</Link>
                  <Link href="#" _hover={{ textDecoration: 'underline', color: "accent.blue" }}>Contact</Link>
                  <Button colorScheme="red" variant="outline" borderRadius="full" width="full">
                    Get Started
                  </Button>
                </VStack>
              </Collapse>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
