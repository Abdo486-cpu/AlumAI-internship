// theme.js

import { extendTheme } from '@chakra-ui/react';

// Import custom fonts
import '@fontsource/roboto/400.css';   // For body
import '@fontsource/roboto/700.css';   // For headings
import '@fontsource/open-sans/400.css'; // For body
import '@fontsource/open-sans/700.css'; // For headings

const colors = {
  brand: {
    50: '#e4e9ec',
    100: '#bbc8d0',
    200: '#90a6b2',
    300: '#658393',
    400: '#42687b',
    500: '#2C3E50', // Primary - Dark Blue
    600: '#273747',
    700: '#202d3d',
    800: '#192333',
    900: '#0d1222',
  },
  accent: {
    red: '#E74C3C',
    blue: '#3498DB',
  },
  background: '#ECF0F1', // Light Grey
  text: '#2C3E50',       // Dark Blue
};

const fonts = {
  heading: `'Roboto', sans-serif`,
  body: `'Open Sans', sans-serif`,
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: 'md',
      fontWeight: 'bold',
    },
    sizes: {
      sm: {
        fontSize: 'sm',
        px: 4,
        py: 3,
      },
      md: {
        fontSize: 'md',
        px: 6,
        py: 4,
      },
    },
    variants: {
      solid: {
        bg: 'accent.red',
        color: 'white',
        _hover: {
          bg: '#c0392b',
        },
      },
      outline: {
        borderColor: 'accent.red',
        color: 'accent.red',
        _hover: {
          bg: 'accent.red',
          color: 'white',
        },
      },
      link: {
        color: 'accent.blue',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
    defaultProps: {
      size: 'md',
      variant: 'solid',
    },
  },
  Input: {
    baseStyle: {
      field: {
        borderRadius: 'md',
        _focus: {
          borderColor: 'accent.blue',
          boxShadow: `0 0 0 1px ${colors.accent.blue}`,
        },
      },
    },
    sizes: {
      md: {
        field: {
          fontSize: 'md',
          px: 4,
          py: 2,
        },
      },
    },
    variants: {
      outline: {
        field: {
          borderColor: 'gray.300',
          _hover: {
            borderColor: 'gray.400',
          },
          _focus: {
            borderColor: 'accent.blue',
            boxShadow: `0 0 0 1px ${colors.accent.blue}`,
          },
        },
      },
    },
    defaultProps: {
      size: 'md',
      variant: 'outline',
    },
  },
  Link: {
    baseStyle: {
      color: 'accent.blue',
      _hover: {
        textDecoration: 'underline',
        color: '#2980b9',
      },
    },
  },
};

const styles = {
  global: {
    'html, body': {
      bg: 'background',
      color: 'text',
    },
    a: {
      color: 'accent.blue',
      _hover: {
        textDecoration: 'underline',
      },
    },
  },
};

const theme = extendTheme({ colors, fonts, components, styles });

export default theme;
