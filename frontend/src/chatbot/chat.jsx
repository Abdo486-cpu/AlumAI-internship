import React, { useState } from 'react';
import { Box, Button, Flex, Input, VStack, Text } from '@chakra-ui/react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { sender: 'user', text: input }]);
      // Simulating a response from the chatbot

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'This is a simulated response from the bot.' },
        ]);
      }, 1000);
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
