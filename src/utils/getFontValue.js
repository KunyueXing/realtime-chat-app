import { useTheme } from '@mui/material/styles';
import useResponsive from '../hooks/useResponsive';

/*
  Designed to dynamically retrieve font size, line height, font weight, and letter spacing based on the 
  theme typography settings and screen size breakpoints. This allows for responsive typography in a 
  React app using MUI. 
*/

function getFontValue(variant) {
    // Retrieves the theme object, including typography settings defined in the theme’s typography key.
    const theme = useTheme();

    // Uses the useWidth() function to determine the current screen width (e.g., xs, sm, md, etc.).
    const breakpoints = useWidth();

    // Select the breakpoints based on the screen width
    const chosenBreakpoint = breakpoints === 'xl' ? 'lg' : breakpoints;
    const key = theme.breakpoints.up(chosenBreakpoint);

    const hasResponsive =
        variant === 'h1' ||
        variant === 'h2' ||
        variant === 'h3' ||
        variant === 'h4' ||
        variant === 'h5' ||
        variant === 'h6';

    // theme.typography[variant][key] retrieves the responsive value when the current screen size 
    // has a specific typography setting
    // theme.typography[variant] retrieves the default typography value for the variant
    let getFont;
    if (hasResponsive && theme.typography[variant][key]) {
        getFont = theme.typography[variant][key];
    } else {
        getFont = theme.typography[variant];
    }

    const fontSize = remToPx(getFont.fontSize);

    // Calculated by multiplying the line height by the font size (since line height 
    // is typically a unitless multiplier).
    const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;

    const { fontWeight } = theme.typography[variant];

    const { letterSpacing } = theme.typography[variant];

    return { fontSize, lineHeight, fontWeight, letterSpacing };
}

export default getFontValue;

// Convert from rem to px, 1rem = 16px. To get the equivalent pixel value.
// The remToPx and pxToRem functions handle the conversion between rem and px, ensuring 
// the typography scales properly.
export function remToPx(value) {
    return Math.round(parseFloat(value) * 16);
}
  
// Converts a px value back into rem. It divides the pixel value by 16 to get the rem value and 
// returns it as a string
export function pxToRem(value) {
    return `${value / 16}rem`;
}

// Generates responsive font sizes using media queries. For each breakpoint (sm, md, lg), it applies 
// a different font size by converting pixel values to rem.
export function responsiveFontSizes({ sm, md, lg }) {
    return {
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm),
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md),
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg),
        },
    };
}

/*
  Determines the current screen width by using the useResponsive hook and the theme’s breakpoints.

  It reverses the theme’s breakpoints array (xs, sm, md, lg, xl) and checks from the largest (xl) to 
  the smallest (xs) to see if the current screen matches that breakpoint. If no match is found, it 
  defaults to 'xs'.
*/
function useWidth() {
    const theme = useTheme();
    
    const keys = [...theme.breakpoints.keys].reverse();
  
    const matchedBreakkpoint = keys.reduce((currentBreakpoint, breakpoint) => {
        const isMatch = useResponsive('up', breakpoint);

        return !currentBreakpoint && isMatch ? breakpoint : currentBreakpoint;
    }, null);

    return matchedBreakkpoint || 'xs';
}