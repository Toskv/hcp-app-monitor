import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Agent } from 'http';

export class StatusRoute extends BaseRoute {
    public static create(router: Router) {
        console.log("[StatusRoute::create] Creating status route");
        router.get("/status/:account/:app", (req: Request, res: Response, next: NextFunction) => {
            new StatusRoute().get(req, res, next);
        });
    }

    constructor() {
        super();
    }

    public get(req: Request, res: Response, next: NextFunction) {
        console.log(req.params.account);
        console.log(req.params.app);
        
    }
}