import { RecordResultInterface } from '../interfaces/record.results.interface';

export class Record<RecordEntity> {
  public data: RecordEntity[];
  public total: number;

  constructor(recordResults: RecordResultInterface<RecordEntity>) {
    this.data = recordResults.data;
    this.total = recordResults.total;
  }
}
