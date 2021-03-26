import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .slick-arrow {
    background: rgba(0, 0, 0, 0.85);
    border-radius: 50% !important;

    &:hover {
      background: rgba(0, 0, 0, 0.85);
    }
  }

  // Animation
  @-webkit-keyframes GradientAnimation {
    0% {
      background-position: 0% 97%;
    }
    50% {
      background-position: 100% 4%;
    }
    100% {
      background-position: 0% 97%;
    }
  }
  @-moz-keyframes GradientAnimation {
    0% {
      background-position: 0% 97%;
    }
    50% {
      background-position: 100% 4%;
    }
    100% {
      background-position: 0% 97%;
    }
  }
  @-o-keyframes GradientAnimation {
    0% {
      background-position: 0% 97%;
    }
    50% {
      background-position: 100% 4%;
    }
    100% {
      background-position: 0% 97%;
    }
  }
  @keyframes GradientAnimation {
    0% {
      background-position: 0% 97%;
    }
    50% {
      background-position: 100% 4%;
    }
    100% {
      background-position: 0% 97%;
    }
  }

`
