import { Box, Text, Input, Button, Flex } from '@chakra-ui/react';

const ChatWindow = () => (
  <Flex flexDirection="column" justify="space-between" h="100vh">
    <Box p="4">
      <Text mb="4">You: Alumni in Chicago Design School</Text>
      <Text bg="#0099FF" color="white" p="4" borderRadius="md">
        ChatAI: Alumni in Chicago Design School are...
      </Text>
      <Text mt="4">You: Order them according to grace</Text>
      <Text bg="#0099FF" color="white" p="4" borderRadius="md">
        ChatAI: According to order of grace...
      </Text>
    </Box>
    <Flex p="4" bg="gray.100">
      <Input placeholder="Type your message..." flex="1" mr="2" />
      <Button bg="#0099FF" color="white">Send</Button>
    </Flex>
  </Flex>
);

export default ChatWindow;