import { createMachine, MachineConfig } from "xstate";

interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
  goal_name?: string;
  goal_notes?: string;
}

enum IntroVals {
  Start = "Start",
}

enum FirstLevel {
  GoalMapper = "goal-mapper",
  Dashboard = "Dashboard",
}

enum SecondLevel {
  Goals = "Goals",
  Info = "Info",
}

enum ThirdLevel {
  HealthCheck = "health-check",
  RetirementInfo = "retirement-Info",
}

enum FourthLevel {
  YourReport = "your-report",
}

enum FifthLevel {
  GetInTouch = "get-in-touch",
}

const storyMachine = (user: User | null): MachineConfig<any, any, any> => {
  const { first_name, last_name, email, goal_name, goal_notes } = user ?? {};

  return {
    id: "ammonitedev",
    initial: "Start",
    states: {
      [IntroVals.Start]: {
        meta: {
          story: `${
            first_name ? first_name + ", we" : "We "
          } build financial adviser software for pure online engagement, resulting in broader customer reach, enhanced conversion and greater operational efficiency.`,
        },
        on: {
          [FirstLevel.GoalMapper]: FirstLevel.GoalMapper,
          [FirstLevel.Dashboard]: FirstLevel.Dashboard,
        },
      },
      [FirstLevel.GoalMapper]: {
        meta: {
          story: `${
            first_name ? first_name + ", select " : "Select"
          } the INFO button to Start the goalmapper or go to the Dashboard`,
        },
        on: {
          [SecondLevel.Info]: SecondLevel.Info,
          [FirstLevel.Dashboard]: FirstLevel.Dashboard,
        },
      },
      [FirstLevel.Dashboard]: {
        meta: {
          story: user?.first_name
            ? `DASHBOARD  
            **First name:** ${first_name ? first_name + "" : ""}  
            **Last name:** ${last_name ? "  " + last_name : ""}  
            **Email Address:** ${email ? "  " + email : ""}  
            **Goal name:** ${goal_name ? "  " + goal_name : ""}  
            **Goal notes:** ${goal_notes ? "  " + goal_notes : ""} `
            : `**DASHBOARD**  
            Go back home and add your details to see them displayed here`,
        },
        on: {
          [IntroVals.Start]: IntroVals.Start,
          [FifthLevel.GetInTouch]: FifthLevel.GetInTouch,
        },
      },

      [SecondLevel.Info]: {
        meta: {
          story: `Info  
          **First name:** ${first_name ? first_name : ""}  
          **Last name:** ${last_name ? last_name : ""}  
          **Email address:** ${email ? email : ""}`,
        },
        on: {
          [FirstLevel.GoalMapper]: FirstLevel.GoalMapper,
          [SecondLevel.Goals]: SecondLevel.Goals,
        },
      },
      [SecondLevel.Goals]: {
        meta: {
          story: `Goals  
          **Your goal name here:** ${goal_name ? goal_name : ""}  
          **Your goal notes here:** ${goal_notes ? goal_notes : ""}`,
        },
        on: {
          [SecondLevel.Info]: SecondLevel.Info,
          [ThirdLevel.HealthCheck]: ThirdLevel.HealthCheck,
        },
      },
      [ThirdLevel.HealthCheck]: {
        meta: {
          story: `${
            first_name ? first_name + ", your" : "Your "
          } health check enables us to see where you are now so that we can prepare your report and advice - would like to use this state to navigate to another page`,
        },
        on: {
          [SecondLevel.Goals]: SecondLevel.Goals,
          [ThirdLevel.RetirementInfo]: ThirdLevel.RetirementInfo,
        },
      },
      [ThirdLevel.RetirementInfo]: {
        meta: {
          story: `${
            first_name ? first_name + ", add" : "Add "
          }  your retirement Info here - would like to use this state to navigate to another page`,
        },
        on: {
          [ThirdLevel.HealthCheck]: ThirdLevel.HealthCheck,
          [FourthLevel.YourReport]: FourthLevel.YourReport,
        },
      },
      [FourthLevel.YourReport]: {
        meta: {
          story: `${
            first_name ? first_name + ", setting" : "Setting"
          } your Goals sooner rather than later could make a big difference to achieving them. Here is your report -  
          **First name:** ${first_name ? first_name + "" : ""}  
          **Last name:** ${last_name ? "  " + last_name : ""}  
          **Email Address:** ${email ? "  " + email : ""}  
          **Goal name:** ${goal_name ? "  " + goal_name : ""}  
          **Goal notes:** ${goal_notes ? "  " + goal_notes : ""}`,
        },
        on: {
          [FifthLevel.GetInTouch]: FifthLevel.GetInTouch,
        },
      },

      [FifthLevel.GetInTouch]: {
        meta: {
          story: `**Get** **in** **touch** -  ${
            first_name ? " " + first_name : ""
          } request a demo and find out how ammonite wealth is empowering financial advisers with the tools to engage and economically service the next generation,`,
        },
        on: {
          reStart: IntroVals.Start,
        },
      },
    },
  };
};

export const stateMachineFromVars = (user: User) => {
  return createMachine(storyMachine(user));
};
