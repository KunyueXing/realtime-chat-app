import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

/*
  This customized hook provides a way to make the app responsive based on MUI breakpoints.
  It allows the checking of the current screen width matches a certain breakpoint using 
  queries like up, down, between or only.

  query - A string that specifies the type of media query. It can be 'up', 'down', 'between', or 'only'.
  key - A breakpoint key (xs, sm, md, lg, xl). It defines the size category for the up, down, or only queries.
  start & end - Used for the 'between' query to define the start and end breakpoints between which the query should match.
*/

function useResponsive(query, key, start, end) {
    const theme = useTheme();

    // the MUI hook useMediaQuery() allows checking if a CSS media query matches the current viewport size.
    // It returns true if the query matches, and false otherwise.
    // theme.breakpoints.up(key): Returns a media query string that matches screen widths >= the key breakpoint.
    const mediaUp = useMediaQuery(theme.breakpoints.up(key));

    // theme.breakpoints.down(key): Returns a media query string that matches screen widths < the key breakpoint.
    const mediaDown = useMediaQuery(theme.breakpoints.down(key));

    const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end));

    // Returns a media query string that matches screen widths exactly at the key breakpoint.
    const mediaOnly = useMediaQuery(theme.breakpoints.only(key));

    switch (query) {
        case 'up':
            return mediaUp;
        case 'down':
            return mediaDown;
        case 'between':
            return mediaBetween;
        case 'only':
            return mediaOnly;
        default:
            return null;
    }

    return null;
}

export default useResponsive;