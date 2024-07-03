import { Smell, SmellType } from "./types";

export class SmellsBuilder {

  public static ifStatement(
    lineStart: number,
    lineEnd: number,
    startAt: number,
    endsAt: number
  ): Smell {
    return {
      type: SmellType.ifStatement,
      lineStart,
      lineEnd,
      startAt,
      endsAt,
      description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
      diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
    };
  }

  public static forOfStatement(
    lineStart: number,
    lineEnd: number,
    startAt: number,
    endsAt: number
  ): Smell {
    return {
      type: SmellType.forLoopStatement,
      lineStart,
      lineEnd,
      startAt,
      endsAt,
      description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
      diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
    };
  }

  public static timeout(
    lineStart: number,
    lineEnd: number,
    startAt: number,
    endsAt: number
  ): Smell {
    return {
      type: SmellType.timeOut,
      lineStart,
      lineEnd,
      startAt,
      endsAt,
      description: `Smelly: Avoid using setTimeouts for tests. I might lead to Sleepy test or undeterministic behaviour based on where the test is executed.`,
      diagnostic: `Smelly: Avoid using setTimeouts for tests. I might lead to Sleepy test or undeterministic behaviour based on where the test is executed`,
    };
  }
}