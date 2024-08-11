// src/components/HeroSection.jsx
import { Box, Text, Input, InputGroup, InputLeftElement, IconButton, Icon, Image } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaGraduationCap } from 'react-icons/fa';
import logo from "../Images/AlumAILogo.png";

const HeroSection = () => {
  return (
    <Box
      bgGradient="linear(to-b, blue.900, purple.800, black)"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color="white"
      textAlign="center"
    >
      <Box mb={8}>
        <Image src={logo}alt="AlumAI Logo" boxSize="60px" />
      </Box>
      <Text fontSize="4xl" fontWeight="bold">
        Strengthening Networks
        <br />
        For Future <Text as="span" fontStyle="italic">Success</Text>
      </Text>
      <Text fontSize="lg" mt={4}>Transform alumni data management through automation</Text>
      
      <InputGroup mt={8} width="50%">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input placeholder="Search for an Alumni" bg="white" color="black" />
        <IconButton aria-label="Search database" icon={<Icon as={FaGraduationCap} />} />
      </InputGroup>
    </Box>
  );
};

export default HeroSection;
