import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Link from 'next/link'
import { Provider } from 'react-redux'
import rootReducer from '../redux/reducers'
import { createStore } from 'redux'
import AuthProvider from '../components/AuthProvider'

const store = createStore(rootReducer)

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
