import { Flex, Box, IconButton, Avatar } from '@chakra-ui/react';
import { FiMoon, FiSun, FiBell } from 'react-icons/fi';

const Header = () => (
  <Flex justify="space-between" p="4">
    <Box fontSize="2xl" fontWeight="bold">
      ALUM<span style={{ color: '#0099FF' }}>AI</span>
    </Box>
    <Flex alignItems="center">
      <IconButton icon={<FiBell />} variant="ghost" />
      <IconButton icon={<FiSun />} variant="ghost" />
      <Avatar size="sm" src="/path/to/avatar.jpg" />
    </Flex>
  </Flex>
);

export default Header;