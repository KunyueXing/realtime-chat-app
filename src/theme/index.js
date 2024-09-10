import { 
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";

/*
  The expected types of the props passed to the ThemeProvider component must be a valid React node. 
  PropTypes.node is a data type in the prop-types library that can be anything renderable by React: 
  strings, numbers, elements, fragments, or an array of these.
*/
ThemeProvider.PropTypes = {
    children: PropTypes.node,
}

export default function ThemeProvider({ children }) {
    const themeOptions = useMemo();

    const theme = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
          <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </MUIThemeProvider>
        </StyledEngineProvider>
    );
}