import '../styles/globals.css';
import type { AppProps } from 'next/app';
import theme from '../lib/theme';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Ejercicio</title>
        <meta name='description' content='Ejercicio' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
