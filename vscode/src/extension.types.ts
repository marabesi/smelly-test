import { Range, window } from 'vscode';
import { Smell } from "smelly-detector";

export const EXTENSION_IDENTIFIER = 'smelly';

export type ComposedSmell = {
  smell: Smell;
  range: Range;
};

export const warningDecorationType = window.createTextEditorDecorationType({
  backgroundColor: 'rgba(255,0,0, 0.5)',
  light: {
    borderColor: 'darkblue'
  },
  dark: {
    borderColor: 'lightblue'
  }
});

export type SmellyConfiguration = {
  color?: string;
  fileTestIdentifier?: string;
  debug?: boolean;
};
