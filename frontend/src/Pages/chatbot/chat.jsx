import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  Divider,
  Progress,
  Image,
  Avatar,
} from "@chakra-ui/react";
import axios from "axios"; // Fix import typo
import logo from "../../Images/AlumAILogo.png";
import logoAvatar from "../../Images/AlumAIAvatar.png";

const username = localStorage.getItem("username");

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() !== "") {
      // Add user message to chat
      setMessages([...messages, { sender: "user", text: input }]);
      setLoading(true);

      try {
        const response = await axios.post("http://localhost:3006/getQuery", {
          query: input,
          username: username,
        });

        // Extract response text
        const botResponse = response.data;

        // Check if botResponse is a string and add it to chat
        if (typeof botResponse === "string") {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: botResponse },
          ]);
        } else {
          // Handle unexpected response format
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              sender: "bot",
              text: "Unexpected response format from the server.",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
        // Handle error by showing an error message
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Error fetching response from the server." },
        ]);
      }

      setLoading(false);
      // Clear input field
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Flex
      direction="column"
      height="100vh"
      maxWidth="80vw"
      margin="auto"
      padding="4"
    >
      <Flex align="center" justify="center" mb="4">
        <Image src={logo} alt="Logo" objectFit="contain" />
      </Flex>
      <Divider mb="4" />
      <VStack
        spacing="4"
        align="stretch"
        flexGrow="1"
        overflowY="auto"
        borderWidth="1px"
        borderRadius="lg"
        padding="4"
        bg="white"
        boxShadow="md"
      >
        {messages.map((msg, index) => (
          <Flex
            key={index}
            align="center"
            direction={msg.sender === "user" ? "row-reverse" : "row"}
            w="full"
          >
            {msg.sender === "bot" && (
              <Avatar name="Bot" src={logoAvatar} size="sm" mr="2" />
            )}
            <Box
              bg={msg.sender === "user" ? "blue.500" : "gray.200"}
              color={msg.sender === "user" ? "white" : "black"}
              borderRadius="md"
              padding="3"
              maxWidth="80%"
              boxShadow="sm"
              wordBreak="break-word"
            >
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </Box>
          </Flex>
        ))}
      </VStack>
      <Flex mt="4">
        {loading ? (
          <Progress size="xs" isIndeterminate width="100%" />
        ) : (
          <>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              flexGrow="1"
              mr="2"
              borderColor="teal.500"
              _placeholder={{ color: "grey" }}
            />
            <Button
              onClick={handleSend}
              colorScheme="blue"
              variant="solid"
              isDisabled={input === null}
            >
              Send
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ChatBot;
