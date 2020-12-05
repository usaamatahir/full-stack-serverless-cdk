import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://vd6pcyy6trcplkpds2lepaqadi.appsync-api.us-east-2.amazonaws.com/graphql",
    fetch,
    headers: {
      "x-api-key": "da2-ygax7nbclff4tgl36u3424ngei",
    },
  }),
  cache: new InMemoryCache(),
});
