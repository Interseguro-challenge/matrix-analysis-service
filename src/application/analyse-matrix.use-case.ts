import { AnalyzedMatrix } from '../domain/entities/analyzed-matrix';
import { CustomError } from '../domain/errors/custom.error';
import { Uuid } from '../shared/adapters/uuid';
import { AnalyseMatrixRequestDto } from '../shared/dtos/analyse-matrix-request.dto';
import { MatrixAnalyseDto } from '../shared/dtos/matrix-analyse.dto';

type UuidGenerator = () => string;

export class AnalyseMatrixUseCase {
  constructor(private readonly uuidGenerator: UuidGenerator = Uuid.generate) {}

  async execute({ QMatrix, RMatrix }: AnalyseMatrixRequestDto): Promise<MatrixAnalyseDto> {
    try {
      this.ensureMatrixIsValid(QMatrix);
      this.ensureMatrixIsValid(RMatrix);

      const matrixId = this.uuidGenerator();
      const analyzedMatrix = new AnalyzedMatrix(matrixId, QMatrix, RMatrix);

      return analyzedMatrix.getAnalysisResults();
    } catch (error) {
      if (error instanceof CustomError) throw error;
      throw CustomError.internalServerError('An error occurred while processing the matrix.');
    }
  }

  private ensureMatrixIsValid(matrix: number[][]): void {
    this.ensureMatrixIsNotEmpty(matrix);
    this.ensure2DMatrix(matrix);
  }

  private ensureMatrixIsNotEmpty(matrix: number[][]): void {
    if (!matrix || matrix.length === 0) throw CustomError.badRequest('Matrix cannot be empty.');
  }

  private ensure2DMatrix(matrix: number[][]): void {
    if (!matrix.every(row => Array.isArray(row))) throw CustomError.badRequest('Matrix must be 2D.');
  }
}
