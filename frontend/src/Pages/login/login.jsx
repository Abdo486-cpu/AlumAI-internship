import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Input, 
  Stack, 
  Heading, 
  useToast, 
  Container, 
  Center, 
  Image 
} from '@chakra-ui/react';
import logo from '../../Images/AlumAILogo.png'; // Adjust path to your logo image

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = () => {
    // Basic validation
    if (!username || !password) {
      toast({
        title: "Error.",
        description: "Please fill in all fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    
    // Handle login logic (e.g., API call)
    // Example success toast
    toast({
      title: "Logged in.",
      description: "You have successfully logged in.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    // Clear fields (optional)
    setUsername('');
    setPassword('');
  };

  return (
    <Center height="100vh" bg="gray.50">
      <Box
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        p={6}
        bg="white"
        maxW="md"
        w="full"
        mx={4}
      >
        {/* Logo */}
        <Center mb={6}>
          <Image src={logo} alt="Logo" boxSize="100px" />
        </Center>
        
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Login
        </Heading>
        
        <Stack spacing={4}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Login;
