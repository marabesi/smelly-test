import { Smell, SmellType } from "./types";

export class SmellsBuilder {
  static forStatement(
    lineStart: number,
    lineEnd: number,
    startAt: number,
    endsAt: number
  ): Smell {
    return {
      type: SmellType.forStatement,
      lineStart,
      lineEnd,
      startAt,
      endsAt,
      description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
      diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
    };
  }

  public static forInStatement(
    lineStart: number,
    lineEnd: number,
    startAt: number,
    endsAt: number
  ): Smell {
    return {
      type: SmellType.forInLoopStatement,
      lineStart,
      lineEnd,
      startAt,
      endsAt,
      description: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`,
      diagnostic: `Smelly: Avoid Conditional Test Logic in the test. Having conditional logic points to a test case that requires different context to run. Split the test case to fit one context per test case.`
    };
  }

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
      description: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed.`,
      diagnostic: `Smelly: Avoid using setTimeouts for tests. It might lead to Sleepy test or undeterministic behaviour based on where the test is executed`,
    };
  }

  public static console(
    lineStart: number,
    lineEnd: number,
    startAt: number,
    endsAt: number
  ): Smell {
    return {
      type: SmellType.consoleStatement,
      lineStart,
      lineEnd,
      startAt,
      endsAt,
      description: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
      diagnostic: `Smelly: Avoid poluting the test output. It is known as the loudmouth`,
    };
  }

  public static jestMock(
    lineStart: number,
    lineEnd: number,
    startAt: number,
    endsAt: number
  ): Smell {
    return {
      type: SmellType.jestMock,
      lineStart,
      lineEnd,
      startAt,
      endsAt,
      description: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
      diagnostic: `Smelly: Avoid mocking too many dependencies in the test file. Split the test cases to distribute the mocking load.`,
    };

  }
}