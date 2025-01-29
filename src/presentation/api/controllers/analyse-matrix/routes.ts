import { Router } from 'express';
import { AnalyzeMatrixController } from './analyse-matryx.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

export class AnalyzeMatrixRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AnalyzeMatrixController();

    router.post('/analyse', [AuthMiddleware.validateJWT], controller.analyze);

    return router;
  }
}
