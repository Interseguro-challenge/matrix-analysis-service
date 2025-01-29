import { Router } from 'express';
import { AnalyzeMatrixRoutes } from './controllers/analyse-matrix/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/matrix', AnalyzeMatrixRoutes.routes);

    return router;
  }
}
