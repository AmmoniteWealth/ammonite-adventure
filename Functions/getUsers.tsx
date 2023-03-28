export async function fetchUser() {
  const response = await fetch("https://ammonitestory.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret":
        "uh9L3RNhHZxUQuV64U7rB0wUtG8AOpYhSDWAakYAxaDzquca31RAPEIUKrINnm5J",
    },
    body: JSON.stringify({
      query: `
        query {
          Users(order_by: {timestamp: desc}, limit: 1) {
            first_name
            last_name
            email
            goal_name
            goal_notes
            id
            timestamp
          }
        }
      `,
      variables: {},
    }),
  }).then((res) => res.json());

  return response.Users[0];
}
