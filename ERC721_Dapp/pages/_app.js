import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/Global";

const theme = {
  colors: {
    header: '#cce6ff',
    body: '#fff',
    footer: '#f2f2f2'
  },
  mobile: '768px',
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
