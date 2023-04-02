import fetch from "node-fetch";

exports.handler = async (event: any) => {
  let { first_name, last_name, email, goal_name, goal_notes } = JSON.parse(
    event.body
  ).payload.data;

  await addUser(first_name, last_name, email, goal_name, goal_notes);

  return {
    statusCode: 200,
    body: `User added: ${first_name}, ${last_name}, ${email}, ${goal_name}, ${goal_notes}`,
  };
};

const addUser = async (
  first_name: string,
  last_name: string,
  email: string,
  goal_name: string,
  goal_notes: string
) => {
  const secret = process.env.X_HASURA_ADMIN_SECRET;
  const X_HASURA_ADMIN_SECRET: string | undefined = secret;

  if (!X_HASURA_ADMIN_SECRET) {
    throw new Error("X_HASURA_ADMIN_SECRET is not defined");
  }
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("x-hasura-admin-secret", X_HASURA_ADMIN_SECRET);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: `
  mutation insertFormData($first_name: String!, $last_name: String!, $email: String!, $goal_name: String!, $goal_notes: String!) {
    insert_Users(objects: [{first_name: $first_name, last_name: $last_name, email: $email, goal_name: $goal_name, goal_notes: $goal_notes, }]) {
      affected_rows
    }
  }
`,
      variables: {
        first_name,
        last_name,
        email,
        goal_name,
        goal_notes,
      },
    }),
  };
  const idCreated = await fetch(
    "https://ammonitestory.hasura.app/v1/graphql",
    requestOptions
  ).then((res) => res.json());

  return idCreated;
};
