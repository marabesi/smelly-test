// @ts-nocheck
jest.mock('compression');
jest.mock('connect');
jest.mock('serve-static');
jest.mock('serve-placeholder');
jest.mock('launch-editor-middleware');
jest.mock('@nuxt/utils');
jest.mock('@nuxt/vue-renderer');
jest.mock('../src/listener');
jest.mock('../src/context');
jest.mock('../src/jsdom');
jest.mock('../src/middleware/nuxt');
jest.mock('../src/middleware/error');
jest.mock('../src/middleware/timing');

describe('server: server', () => {});