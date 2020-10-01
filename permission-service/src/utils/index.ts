import { Response, Request, NextFunction } from 'express';

export const wrapValidator = (func: (req: Request) => Promise<void>) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        func(req)
            .then(() => next())
            .catch(next);
    };
};

export const wrapController = (func: (req: Request, res: Response, next?: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    };
};

export const permissionNumRangeCheck = (permission: number[]) => {
    return permission.every((value) => { return Number.isInteger(value) && value >= 0 && value <= 17 });
}

export const apiPermissionCheck = async (req: Request, requestedPermissionId: number | string) => {
    const parsedPermissionId = typeof requestedPermissionId == 'string' ? parseInt(requestedPermissionId) : requestedPermissionId;
    if (req.body.currentUser.permission.includes(parsedPermissionId)) {
        return true;
    } return false;
}