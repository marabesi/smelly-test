export class Logger {

  info(message: string) {
    console.info(this.wrapInformation(message));
  }

  error(message: string) {
    console.error(this.wrapInformation(message));
  }

  private wrapInformation(message: string) {
    return `[SMELLY] ${new Date().toUTCString()} ${message}`;
  }
}