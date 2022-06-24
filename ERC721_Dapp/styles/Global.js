import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        background-color: ${({theme}) => theme.colors.body};
        color: #000;
        font-size: 1.15em;
        margin: 0;
    }

    p {
        ${'' /* opacity: 0.8; */}
        line-height: 1.5;
    }

    img {
        max-width: 100%;
    }
`

export default GlobalStyles