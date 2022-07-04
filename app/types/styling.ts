import { Theme } from '@mui/material/styles';


interface Shade {
    light: string
}

interface Glow {
    light: string;
    medium: string;
    dark: string;
}

interface Rounded {
    small: string;
    medium: string;
    big: string;
}

export interface MyTheme extends Theme {
    shade: Shade;
    glow: Glow;
    rounded: Rounded;
}
