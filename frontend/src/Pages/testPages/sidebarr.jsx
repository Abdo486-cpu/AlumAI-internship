import { Box, List, ListItem, Button } from '@chakra-ui/react';

const Sidebar = () => (
  <Box w="300px" p="4" bg="white" borderRight="1px solid #E2E8F0">
    <Button mb="4" bg="#0099FF" color="white">New Chat</Button>
    <List>
      <ListItem py="2">Alumni in Chicago, IL</ListItem>
      <ListItem py="2">Alumni in Design School</ListItem>
      {/* Add more list items here */}
    </List>
  </Box>
);

export default Sidebar;