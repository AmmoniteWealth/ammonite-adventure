import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Storyblock from "../../components/storyblock";

import { useAppContext } from "../../Context/appContext";
import { useMachine } from "@xstate/react";
import { stateMachineFromVars } from "../../Context/stateMachine";
import ReactMarkdown from "react-markdown";
import configJson from "../../pages/api/configJson.json";
const Story = () => {
  let { user } = useAppContext();
  const [state, send] = useMachine(stateMachineFromVars(user!));
  //useMachine is a custom hook provided by the @xstate/react library for using an XState
  // state machine with React's state and effect hooks.
  // The useMachine hook takes in a state machine as its argument and returns an array with
  // two elements: the current state of the machine and a send function to send events to the machine.
  // In your code, the stateMachineFromVars(user) function returns a state machine based on
  // the user's data. So the useMachine hook is using that machine to initialize the state and send function for the state and send variables respectively.

  const router = useRouter();

  useEffect(() => {
    let trailingPath = router.asPath.substring(
      router.asPath.length - state.event.type.length
    );
    console.log("trailingPath", trailingPath);
    if (trailingPath !== state.event.type) {
      router.push(`/s/start`, undefined, { shallow: true });
    }
  }, []);

  const config = configJson;
  const _initialConfig = configJson.data.config;
  console.log("configJson from story", _initialConfig);

  return (
    <Layout story>
      <Storyblock>
        <ReactMarkdown>
          {state.meta[`ammonitedev.${state.value}`].story}
        </ReactMarkdown>
      </Storyblock>

      {state.nextEvents
        .filter((eventType) => !eventType.startsWith("xstate"))
        .map((eventType) => {
          return (
            <button
              key={eventType}
              onClick={() => {
                send(eventType);
                if (eventType === "restart") {
                  router.push(`/s/start`);
                } else {
                  router.push(`${router.asPath}/${eventType}`);
                }
              }}
            >
              {eventType.replace(/-/g, " ")}
            </button>
          );
        })}
    </Layout>
  );
};

export default Story;
