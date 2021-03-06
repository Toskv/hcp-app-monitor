import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import * as http from 'http';

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

        http.get({
            host: 'api.hana.ondemand.com',
            path: `/monitoring/v1/accounts/${req.params.account}/apps/${req.params.app}/state`,

        }, (monitorResponse) => {
            let body = '';

            monitorResponse.on('data', (d) => {
                body += d;
            });

            monitorResponse.on('end', () => {
                console.log(body);
                res.json("abc");
            });

            monitorResponse.on('error', (e) => {
                console.log(e);
                res.json('error');
            });
        });
    }
}