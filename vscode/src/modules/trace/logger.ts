import TelemetryReporter from "@vscode/extension-telemetry";

export class Logger {

  constructor(private telemetry: TelemetryReporter) {}

  info(message: string, additionalData: any = {}) {
    const toLog = this.wrapInformation(message);
    this.telemetry.sendTelemetryEvent('INFO', { data: toLog, ...additionalData });
    console.info(toLog);
  }

  debug(message: string) {
    const toLog = this.wrapInformation(message);
    console.info(toLog);
  }

  error(message: string) {
    const toLog = this.wrapInformation(message);
    this.telemetry.sendTelemetryErrorEvent('ERROR', { data: toLog });
    console.error(toLog);
  }

  private wrapInformation(message: string) {
    return `[SMELLY] ${new Date().toUTCString()} ${message}`;
  }
}