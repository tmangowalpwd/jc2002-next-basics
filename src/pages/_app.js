import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Link from 'next/link'
import { Provider } from 'react-redux'
import rootReducer from '../redux/reducers'
import { createStore } from 'redux'

const store = createStore(rootReducer)

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
