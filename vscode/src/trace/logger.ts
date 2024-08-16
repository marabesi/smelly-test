import TelemetryReporter from "@vscode/extension-telemetry";

export class Logger {

  private telemetry?: TelemetryReporter | undefined;
  
  constructor() {
    const appInsightsKey = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || "";
    if (!appInsightsKey) {
      this.debug("telemetry key not found");
      return;
    }

    this.debug("telemetry key found, using insights");
    this.telemetry = new TelemetryReporter(appInsightsKey);
  }

  info(message: string, additionalData: any = {}) {
    const toLog = this.wrapInformation(message);

    if (this.telemetry) {
      this.telemetry.sendTelemetryEvent('INFO', { data: toLog, ...additionalData });
    }
    console.info(toLog);
  }

  debug(message: string) {
    const toLog = this.wrapInformation(message);
    console.info(toLog);
  }

  error(message: string) {
    const toLog = this.wrapInformation(message);
    if (this.telemetry) {
      this.telemetry.sendTelemetryErrorEvent('ERROR', { data: toLog });
    }
    console.error(toLog);
  }

  private wrapInformation(message: string) {
    return `[SMELLY] ${new Date().toUTCString()} ${message}`;
  }
}