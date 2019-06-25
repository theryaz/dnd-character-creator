import * as express from 'express';

export function asyncWrap(routeControllerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>){
  return (req: any, res: any, next: any) => {
    Promise.resolve(routeControllerFn(req, res, next)).catch(next);
  };
};
