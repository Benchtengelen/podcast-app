import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clfdwgswh11ke01te3tt186pv/master",
  cache: new InMemoryCache(),
});

export default client;
