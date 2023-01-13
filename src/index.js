import React from 'react'
import ReactDOM from 'react-dom'
 
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
  const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
 
ReactDOM.render(
  <ApolloProvider client={client}>
   <App />
  </ApolloProvider>,
   document.querySelector("#root")
)
