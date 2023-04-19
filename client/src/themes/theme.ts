import { extendTheme } from "@chakra-ui/react";
import buttonTheme from "./button";

const theme = extendTheme({
  components: {
    Text: {
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
          backgroundColor: "#00C805",
          color: "white",
          fontWeight: "bold",
          _hover: {
            backgroundColor: "limegreen",
            color: "white",
          },
        },
      },
    },
  },
});
export default theme;
