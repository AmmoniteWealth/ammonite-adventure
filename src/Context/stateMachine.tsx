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
  GoalMapper1 = "goal-mapper-V1",
  GoalMapper2 = "goal-mapper-V2",
  Dashboard = "dashboard",
}

enum SecondLevel {
  Info1 = "basic-information-1",
  Info2 = "basic-information-2",
  HealthCheck1 = "financial-health-check-1",
  HealthCheck2 = "financial-health-check-2",
}

enum ThirdLevel {
  Goals1 = "please-choose-your-goals-1",
  AboutGoals1 = "please-tell-us-about-your-goals-1",
  Goals2 = "please-choose-your-goal-2",
  AboutGoals2 = "please-tell-us-about-your-goals-2",
}

enum FourthLevel {
  RetirementInfo = "your-retirement-spending1-",
  SavingForRetirement = "saving-for-retirement-1",
}

enum FifthLevel {
  YourGoalSummary1 = "your-goal-summary-1",
  YourHealthCheckResults1 = "your-financial-health-check-results-1",
  YourGoalSummary2 = "your-goal-summary-2",
  YourHealthCheckResults2 = "your-financial-health-check-results-2",
}

enum SixthLevel {
  GetInTouch1 = "get-in-touch-",
  ThankYou1 = "thank-you-1",
  GetInTouch2 = "get-in-touch-2",
  ThankYou2 = "thank-you-2",
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
          Goalmapper V1 has Retirement info  
          Goalmapper V2 has no Retirement info`,
        },
        on: {
          [FirstLevel.GoalMapper1]: FirstLevel.GoalMapper1,
          [FirstLevel.GoalMapper2]: FirstLevel.GoalMapper2,
          [FirstLevel.Dashboard]: FirstLevel.Dashboard,
        },
      },
      [FirstLevel.GoalMapper1]: {
        meta: {
          story: `**Goalmapper V1**  
          ${first_name ? first_name : ""} ${getIsClient(
            _initialConfig.About.Card2.intro
          )}`,
        },
        on: {
          [FirstLevel.Dashboard]: FirstLevel.Dashboard,
          [SecondLevel.Info1]: SecondLevel.Info1,
        },
      },
      [FirstLevel.GoalMapper2]: {
        meta: {
          story: `**Goalmapper V2**  
          ${
            first_name ? first_name + ", select " : "Select"
          } the BASIC INFORMATION button to Start the goalmapper or go to the Dashboard`,
        },
        on: {
          [FirstLevel.Dashboard]: FirstLevel.Dashboard,
          [SecondLevel.Info2]: SecondLevel.Info2,
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
            **Goal notes:** ${goal_notes ? "  " + goal_notes : ""}`
            : `**DASHBOARD**  
            Go back home and add your details to see them displayed here`,
        },
        on: {
          [IntroVals.Start]: IntroVals.Start,
          [SixthLevel.GetInTouch1]: SixthLevel.GetInTouch1,
        },
      },

      [SecondLevel.Info1]: {
        meta: {
          story: `**Basic Information**  
          **First name:** ${first_name ? first_name : ""}  
          **Last name:** ${last_name ? last_name : ""}  
          **Email address:** ${email ? email : ""}`,
        },
        on: {
          [FirstLevel.GoalMapper1]: FirstLevel.GoalMapper1,
          [SecondLevel.HealthCheck1]: SecondLevel.HealthCheck1,
        },
      },
      [SecondLevel.Info2]: {
        meta: {
          story: `**Basic Information**  
          **First name:** ${first_name ? first_name : ""}  
          **Last name:** ${last_name ? last_name : ""}  
          **Email address:** ${email ? email : ""}`,
        },
        on: {
          [FirstLevel.GoalMapper2]: FirstLevel.GoalMapper2,
          [SecondLevel.HealthCheck2]: SecondLevel.HealthCheck2,
        },
      },
      [SecondLevel.HealthCheck1]: {
        meta: {
          story: `**Financial Health Check**  
          ${
            first_name ? first_name + ", your" : "Your "
          } health check enables us to see where you are now so that we can prepare your report and advice - would like to use this state to navigate to another page`,
        },
        on: {
          [SecondLevel.Info1]: SecondLevel.Info1,
          [ThirdLevel.Goals1]: ThirdLevel.Goals1,
        },
      },
      [SecondLevel.HealthCheck2]: {
        meta: {
          story: `**Financial Health Check**  
          ${
            first_name ? first_name + ", your" : "Your "
          } health check enables us to see where you are now so that we can prepare your report and advice - would like to use this state to navigate to another page`,
        },
        on: {
          [SecondLevel.Info2]: SecondLevel.Info2,
          [ThirdLevel.Goals2]: ThirdLevel.Goals2,
        },
      },
      [ThirdLevel.Goals1]: {
        meta: {
          story: `**Please Choose Your Goals**`,
        },
        on: {
          [SecondLevel.HealthCheck1]: SecondLevel.HealthCheck1,
          [ThirdLevel.AboutGoals1]: ThirdLevel.AboutGoals1,
        },
      },
      [ThirdLevel.Goals2]: {
        meta: {
          story: `**Please Choose Your Goals**`,
        },
        on: {
          [SecondLevel.HealthCheck2]: SecondLevel.HealthCheck2,
          [ThirdLevel.AboutGoals2]: ThirdLevel.AboutGoals2,
        },
      },
      [ThirdLevel.AboutGoals1]: {
        meta: {
          story: `**Please Tell Us About Your Goals** `,
        },
        on: {
          [ThirdLevel.Goals1]: ThirdLevel.Goals1,
          [FourthLevel.RetirementInfo]: FourthLevel.RetirementInfo,
        },
      },
      [ThirdLevel.AboutGoals2]: {
        meta: {
          story: `**Please Tell Us About Your Goals** `,
        },
        on: {
          [ThirdLevel.Goals2]: ThirdLevel.Goals2,
          [FifthLevel.YourGoalSummary2]: FifthLevel.YourGoalSummary2,
        },
      },
      [FourthLevel.RetirementInfo]: {
        meta: {
          story: `**Your Retirement Spending**  
          ${
            first_name ? first_name + ", add" : "Add "
          }  your retirement Info here`,
        },
        on: {
          [ThirdLevel.AboutGoals1]: ThirdLevel.AboutGoals1,
          [FourthLevel.SavingForRetirement]: FourthLevel.SavingForRetirement,
        },
      },
      [FourthLevel.SavingForRetirement]: {
        meta: {
          story: `**Saving For Retirement**`,
        },
        on: {
          [FourthLevel.RetirementInfo]: FourthLevel.RetirementInfo,
          [FifthLevel.YourGoalSummary1]: FifthLevel.YourGoalSummary1,
        },
      },
      [FifthLevel.YourGoalSummary1]: {
        meta: {
          story: `**Your Goal Summary**  
          **Goal name:** ${goal_name ? "  " + goal_name : ""}  
          **Goal notes:** ${goal_notes ? "  " + goal_notes : ""}`,
        },
        on: {
          [FourthLevel.SavingForRetirement]: FourthLevel.SavingForRetirement,
          [FifthLevel.YourHealthCheckResults1]:
            FifthLevel.YourHealthCheckResults1,
        },
      },
      [FifthLevel.YourGoalSummary2]: {
        meta: {
          story: `**Your Goal Summary**  
          **Goal name:** ${goal_name ? "  " + goal_name : ""}  
          **Goal notes:** ${goal_notes ? "  " + goal_notes : ""}`,
        },
        on: {
          [FifthLevel.YourGoalSummary2]: FifthLevel.YourGoalSummary2,
          [FifthLevel.YourHealthCheckResults2]:
            FifthLevel.YourHealthCheckResults2,
        },
      },
      [FifthLevel.YourHealthCheckResults1]: {
        meta: {
          story: `**Your Financial Health Check Results**`,
        },
        on: {
          [FourthLevel.RetirementInfo]: FourthLevel.RetirementInfo,
          [SixthLevel.ThankYou1]: SixthLevel.ThankYou1,
        },
      },
      [FifthLevel.YourHealthCheckResults2]: {
        meta: {
          story: `**Your Financial Health Check Results**`,
        },
        on: {
          [FifthLevel.YourGoalSummary2]: FifthLevel.YourGoalSummary2,
          [SixthLevel.ThankYou2]: SixthLevel.ThankYou2,
        },
      },
      [SixthLevel.ThankYou1]: {
        meta: {
          story: `**Thank You**  
          ${first_name ? " " + first_name : ""} ${getIsClient(
            _initialConfig.ThankYou.bulletPoint1
          )}`,
        },
        on: {
          [FifthLevel.YourHealthCheckResults1]:
            FifthLevel.YourHealthCheckResults1,
          [SixthLevel.GetInTouch1]: SixthLevel.GetInTouch1,
        },
      },
      [SixthLevel.ThankYou2]: {
        meta: {
          story: `**Thank You**  
          ${first_name ? " " + first_name : ""} ${getIsClient(
            _initialConfig.ThankYou.bulletPoint1
          )}`,
        },
        on: {
          [FifthLevel.YourHealthCheckResults2]:
            FifthLevel.YourHealthCheckResults2,
          [SixthLevel.GetInTouch2]: SixthLevel.GetInTouch2,
        },
      },
      [SixthLevel.GetInTouch1]: {
        meta: {
          story: `**Get In Touch**  
          ${first_name ? " " + first_name : ""} ${getIsClient(
            _initialConfig.ThankYou.bulletPoint2
          )}`,
        },
        on: {
          [SixthLevel.ThankYou1]: SixthLevel.ThankYou1,
          reStart: IntroVals.Start,
        },
      },
      [SixthLevel.GetInTouch2]: {
        meta: {
          story: `**Get In Touch**  
          ${first_name ? " " + first_name : ""} ${getIsClient(
            _initialConfig.ThankYou.bulletPoint2
          )}`,
        },
        on: {
          [SixthLevel.ThankYou2]: SixthLevel.ThankYou2,
          reStart: IntroVals.Start,
        },
      },
    },
  };
};

export const stateMachineFromVars = (user: User) => {
  return createMachine(storyMachine(user));
};
