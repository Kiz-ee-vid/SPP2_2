import {NextFunction, Request, Response} from "express";
import {AnySchema} from "yup";
import log from "../logger";

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            // tslint:disable-next-line:object-literal-sort-keys
            params: req.params,
        }, { abortEarly: false });

        return next();
    } catch (e) {
        log.error(e);
        const map = new Map<string, string>();

        e.inner.forEach((item) => {
            const field = item.path.split(".")[1];
            const error = item.errors[0];

            map.set(field, error);
        });

        return res.status(400).send({
            errors: Object.fromEntries(map),
        });
    }
};

export default validate;
