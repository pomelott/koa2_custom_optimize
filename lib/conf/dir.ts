import path from 'path';
export const rootDir: string = path.resolve(__dirname, '../../');
export const modelDir: string = path.resolve(rootDir, 'model');
export const serviceDir: string = path.resolve(rootDir, 'service');
export const ctrlDir: string = path.resolve(rootDir, 'controller');
export const routerDir: string = path.resolve(rootDir, 'router');
export const viewDir: string = path.resolve(rootDir, 'views')