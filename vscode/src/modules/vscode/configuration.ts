import { window, TextEditorDecorationType } from 'vscode';
import { SmellyConfiguration, warningDecorationType } from './extension.types';
import { Logger } from '../trace/logger';
// @ts-ignore for some reason there is an issue with the ts config with this module
import hexRgb from 'hex-rgb';

export function setupConfiguration(configuration: SmellyConfiguration, logger: Logger): TextEditorDecorationType {
  if (configuration && configuration.color) {
    logger.debug(`configuration for smelly exists, parsing the settings ${JSON.stringify(configuration)}`);
    try {
      const { color } = configuration;

      const currentColor = hexRgb(color);
      const newColor = `rgba(${currentColor.red}, ${currentColor.green}, ${currentColor.blue}, 0.5)`;

      logger.debug(`new color highlight: ${newColor}`);

      return window.createTextEditorDecorationType({
        backgroundColor: newColor,
      });
    } catch (error) {
      logger.error(`[ERROR] ${error} ${JSON.stringify(error)}`);
    }
  }

  return warningDecorationType;
}