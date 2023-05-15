import { extendTheme } from "@chakra-ui/react";
import buttonTheme from "./button";

const theme = extendTheme({
  components: {
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
    Text: {
      color: "white",
      variants: {
        menu: {
          fontSize: "18px",
          fontWeight: "semi-bold",
          transition: "all 0.3s",
          _hover: {
            color: "#00C805",
            fontSize: "20px",
            _after: {
              content: "''",
              display: "block",
              width: "100%",
              height: "2px",
              backgroundColor: "#00C805",
              //   marginTop: "5px",
            },
          },
        },
      },
    },
    Button: {
      variants: {
        Login: {
          fontSize: "18px",
          backgroundColor: "black",
          fontColor: "white",
          color: "white",
          fontWeight: "bold",
          _hover: {
            backgroundColor: "rgba(38, 38, 38, 1);",
            color: "white",
            transform: "scale(1.05)",
          },
        },
        signup: {
          fontSize: "18px",
          backgroundColor: "black",
          fontColor: "white",
          color: "white",
          fontWeight: "bold",
          _hover: {
            backgroundColor: "rgba(38, 38, 38, 1);",
            color: "white",
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
});
export default theme;
