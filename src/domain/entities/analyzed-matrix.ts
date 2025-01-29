export class AnalyzedMatrix {
    private readonly id: string;
    private readonly Q: number[][];
    private readonly R: number[][];
    private readonly max: number;
    private readonly min: number;
    private readonly average: number;
    private readonly sum: number;
    private readonly isDiagonal: boolean;
    private readonly analyzedAt: Date;
  
    constructor(id: string, Q: number[][], R: number[][]) {
      this.id = id;
      this.Q = Q;
      this.R = R;
      this.analyzedAt = new Date();
  
      const allValues = [...Q.flat(), ...R.flat()];
      this.max = Math.max(...allValues);
      this.min = Math.min(...allValues);
      this.average = allValues.reduce((sum, val) => sum + val, 0) / allValues.length;
      this.sum = allValues.reduce((sum, val) => sum + val, 0);
      this.isDiagonal = this.checkIfDiagonal(Q) && this.checkIfDiagonal(R);
    }
  
    private checkIfDiagonal(matrix: number[][]): boolean {
      return matrix.every((row, i) =>
        row.every((value, j) => (i !== j ? value === 0 : true))
      );
    }
  
    getMatrixId(): string {
      return this.id;
    }
  
    getAnalysisResults() {
      return {
        max: this.max,
        min: this.min,
        average: this.average,
        sum: this.sum,
        isDiagonal: this.isDiagonal,
        analyzedAt: this.analyzedAt
      };
    }
  }
  