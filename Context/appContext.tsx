import { createContext, useContext, useEffect, useState } from "react";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  goal_name: string;
  goal_notes: string;
  id: string;
  timestamp: string;
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
      const response = await fetch(
        "https://ammonitestory.hasura.app/v1/graphql",
        {
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
        }
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
