import { has } from "immer/dist/internal";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

const { X_HASURA_ADMIN_SECRET, NEXT_PUBLIC_API_URL } = process.env;
const secret = process.env.X_HASURA_ADMIN_SECRET;

interface User {
  first_name: string;
  last_name: string;
  email: string;
  goal_name: string;
  goal_notes: string;
  id: string;
  timestamp: string | null;
}

interface StoryContextValue {
  user: User | null;
}

const StoryContext = createContext<StoryContextValue>({ user: null });

function useRandomUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let current = true;

    const getUser = async () => {
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
      };

      const response = await fetch(
        "https://ammonitestory.hasura.app/v1/graphql",
        requestOptions
      ).then((res) => res.json());

      if (current && response?.data?.Users?.length) {
        console.log("Response", response);
        console.log("User", response.data.Users[0]);
        setUser(response.data.Users[0]);
      }
    };

    getUser().catch((error) => {
      console.log("Error fetching user: ", error);
    });

    return () => {
      current = false;
      setUser(null);
    };
  }, []);

  return user;
}

export function AppContext({ children }: { children: React.ReactNode }) {
  const user = useRandomUser();

  return (
    <StoryContext.Provider value={{ user }}>{children}</StoryContext.Provider>
  );
}

export function useAppContext() {
  return useContext(StoryContext);
}
