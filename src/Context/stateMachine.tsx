import { createMachine, MachineConfig } from "xstate";
import tenantConfig from "../pages/api/tenantConfig.json";
import { getIsClient } from "@/pages/api/getIsClient";
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
  Dashboard = "dashboard",
}

enum SecondLevel {
  Info = "basic-information",
  HealthCheck = "financial-health-check",
}

enum ThirdLevel {
  Goals = "please-choose-your-goals",
  AboutGoals = "please-tell-us-about-your-goals",
}

enum FourthLevel {
  RetirementInfo = "your-retirement-spending",
  SavingForRetirement = "saving-for-retirement",
}

enum FifthLevel {
  YourGoalSummary = "your-goal-summary",
  YourHealthCheckResults = "your-financial-health-check-results",
}

enum SixthLevel {
  GetInTouch = "get-in-touch",
  ThankYou = "thank-you",
}

const storyMachine = (user: User | null): MachineConfig<any, any, any> => {
  const { first_name, last_name, email, goal_name, goal_notes } = user ?? {};
  const config = tenantConfig;
  console.log("tenantConfig from story machine", tenantConfig);
  const _initialConfig = tenantConfig.data.config;
  console.log(
    "tenantConfig 2 _initialConfig from story machine",
    _initialConfig
  );
  return {
    id: "ammonitedev",
    initial: "Start",
    states: {
      [IntroVals.Start]: {
        meta: {
          story: `**Start**  
          ${first_name ? first_name : ""} ${getIsClient(
            _initialConfig.About.Card1.intro
          )}`,
        },
        on: {
          [FirstLevel.GoalMapper]: FirstLevel.GoalMapper,
          [FirstLevel.Dashboard]: FirstLevel.Dashboard,
        },
      },
      [FirstLevel.GoalMapper]: {
        meta: {
          story: `**Goalmapper**  
          ${
            first_name ? first_name + ", select " : "Select"
          } the BASIC INFORMATION button to Start the goalmapper or go to the Dashboard`,
        },
        on: {
          [FirstLevel.Dashboard]: FirstLevel.Dashboard,
          [SecondLevel.Info]: SecondLevel.Info,
        },
      },
      [FirstLevel.Dashboard]: {
        meta: {
          story: user?.first_name
            ? `**Dashboard**  
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
          [SixthLevel.GetInTouch]: SixthLevel.GetInTouch,
        },
      },

      [SecondLevel.Info]: {
        meta: {
          story: `**Basic Information**  
          **First name:** ${first_name ? first_name : ""}  
          **Last name:** ${last_name ? last_name : ""}  
          **Email address:** ${email ? email : ""}`,
        },
        on: {
          [FirstLevel.GoalMapper]: FirstLevel.GoalMapper,
          [SecondLevel.HealthCheck]: SecondLevel.HealthCheck,
        },
      },
      [SecondLevel.HealthCheck]: {
        meta: {
          story: `**Financial Health Check**  
          ${
            first_name ? first_name + ", your" : "Your "
          } health check enables us to see where you are now so that we can prepare your report and advice - would like to use this state to navigate to another page`,
        },
        on: {
          [SecondLevel.Info]: SecondLevel.Info,
          [ThirdLevel.Goals]: ThirdLevel.Goals,
        },
      },
      [ThirdLevel.Goals]: {
        meta: {
          story: `**Please Choose Your Goals**`,
        },
        on: {
          [SecondLevel.HealthCheck]: SecondLevel.HealthCheck,
          [ThirdLevel.AboutGoals]: ThirdLevel.AboutGoals,
        },
      },
      [ThirdLevel.AboutGoals]: {
        meta: {
          story: `**Please Tell Us About Your Goals** `,
        },
        on: {
          [ThirdLevel.Goals]: ThirdLevel.Goals,
          [FourthLevel.RetirementInfo]: FourthLevel.RetirementInfo,
        },
      },
      [FourthLevel.RetirementInfo]: {
        meta: {
          story: `**Your Retirement Spending**  
          ${
            first_name ? first_name + ", add" : "Add "
          }  your retirement Info here - would like to use this state to navigate to another page`,
        },
        on: {
          [ThirdLevel.AboutGoals]: ThirdLevel.AboutGoals,
          [FourthLevel.SavingForRetirement]: FourthLevel.SavingForRetirement,
        },
      },
      [FourthLevel.SavingForRetirement]: {
        meta: {
          story: `**Saving For Retirement**`,
        },
        on: {
          [FourthLevel.RetirementInfo]: FourthLevel.RetirementInfo,
          [FifthLevel.YourGoalSummary]: FifthLevel.YourGoalSummary,
        },
      },
      [FifthLevel.YourGoalSummary]: {
        meta: {
          story: `**Your Goal Summary**`,
        },
        on: {
          [FourthLevel.SavingForRetirement]: FourthLevel.SavingForRetirement,
          [FifthLevel.YourHealthCheckResults]:
            FifthLevel.YourHealthCheckResults,
        },
      },
      [FifthLevel.YourHealthCheckResults]: {
        meta: {
          story: `**Your Financial Health Check Results**`,
        },
        on: {
          [FourthLevel.RetirementInfo]: FourthLevel.RetirementInfo,
          [SixthLevel.ThankYou]: SixthLevel.ThankYou,
        },
      },
      [SixthLevel.ThankYou]: {
        meta: {
          story: `**Thank You**  
          ${
            first_name ? " " + first_name : ""
          } request a demo and find out how ammonite wealth is empowering financial advisers with the tools to engage and economically service the next generation,`,
        },
        on: {
          [FifthLevel.YourHealthCheckResults]:
            FifthLevel.YourHealthCheckResults,
          [SixthLevel.GetInTouch]: SixthLevel.GetInTouch,
        },
      },
      [SixthLevel.GetInTouch]: {
        meta: {
          story: `**Get In Touch**  
          ${
            first_name ? " " + first_name : ""
          } request a demo and find out how ammonite wealth is empowering financial advisers with the tools to engage and economically service the next generation,`,
        },
        on: {
          [SixthLevel.ThankYou]: SixthLevel.ThankYou,
          reStart: IntroVals.Start,
        },
      },
    },
  };
};

export const stateMachineFromVars = (user: User) => {
  return createMachine(storyMachine(user));
};
