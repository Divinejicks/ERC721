import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/Global";
import { Provider } from 'react-redux';
import store from "../store/store";

const theme = {
  colors: {
    header: '#0d0d0d',
    body: '#fff',
    footer: '#f2f2f2'
  },
  mobile: '768px',
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
