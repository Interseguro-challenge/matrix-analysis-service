import { HTTP_STATUS } from '../../constants/http-codes';
import { Request, Response } from 'express';
import { handleError } from '../../utils/handle.error';
import { AnalyseMatrixUseCase } from '../../../../application/analyse-matrix.use-case';

export class AnalyzeMatrixController {
  constructor() {}

  analyze = (req: Request, res: Response) => {
    new AnalyseMatrixUseCase()
      .execute(req.body)
      .then(data => res.status(HTTP_STATUS.OK).send(data))
      .catch(error => handleError(error, res));
  };
}
