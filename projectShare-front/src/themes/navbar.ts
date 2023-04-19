import { extendTheme } from "@chakra-ui/react";

const NavTheme = extendTheme({
  components: {
    Text: {
      variants: {
        menu: {
          fontSize: "100px",
        },
      },
    },
  },
});
export default NavTheme;
