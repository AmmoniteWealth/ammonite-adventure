import { GraphQLClient } from "graphql-request";

const fetchData = async (query: string): Promise<any> => {
  const endpoint = "https://ammonitestory.hasura.app/api/rest/getUser";
  const headers = {
    "Content-Type": "application/json",
    "x-hasura-admin-secret":
      "uh9L3RNhHZxUQuV64U7rB0wUtG8AOpYhSDWAakYAxaDzquca31RAPEIUKrINnm5J",
  };
  const client = new GraphQLClient(endpoint, { headers });
  return client.request(query);
};

export default fetchData;
