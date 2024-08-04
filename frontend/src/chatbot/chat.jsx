import React, { useState } from 'react';
import { Box, Button, Flex, Input, VStack, Text } from '@chakra-ui/react';
import axios from 'axios'; // Fix import typo

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() !== '') {
      // Add user message to chat
      setMessages([...messages, { sender: 'user', text: input }]);

      try {
        // Send user input to server using axios
        const response = await axios.put('http://localhost:3005/getResponse', {
          query: input,
        });

        // Extract response text
        const botResponse = response.data;

        // Check if botResponse is a string and add it to chat
        if (typeof botResponse === 'string') {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: botResponse },
          ]);
        } else {
          // Handle unexpected response format
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: 'Unexpected response format from the server.' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching response:', error);
        // Handle error by showing an error message
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Error fetching response from the server.' },
        ]);
      }

      // Clear input field
      setInput('');
    }
  };

  return (
    <Flex direction="column" height="100vh" maxWidth="600px" margin="auto" padding="4">
      <VStack
        spacing="4"
        align="stretch"
        flexGrow="1"
        overflowY="auto"
        borderWidth="1px"
        borderRadius="lg"
        padding="4"
        bg="gray.50"
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
            bg={msg.sender === 'user' ? 'blue.500' : 'gray.200'}
            color={msg.sender === 'user' ? 'white' : 'black'}
            borderRadius="md"
            padding="2"
            maxWidth="80%"
          >
            <Text>{msg.text}</Text>
          </Box>
        ))}
      </VStack>
      <Flex mt="4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          flexGrow="1"
          mr="2"
        />
        <Button onClick={handleSend} colorScheme="blue">
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChatBot;
