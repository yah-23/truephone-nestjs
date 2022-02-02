import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as csv from 'fast-csv';
import { Readable } from 'stream';
import { MessageDTO } from './dto/message.dto';

const csvValidation = (stream: Readable): Promise<MessageDTO[]> => {
  return new Promise((resolve, reject) => {
    const rows: MessageDTO[] = [];

    stream
      .pipe(csv.parse({ ignoreEmpty: true, delimiter: ';' }))
      .validate(
        (data) =>
          data[0].length == 11 && data[0][2] == '9' && data[1].length <= 160,
      )
      .on('error', reject)
      .on('data', (row) =>
        rows.push({ phone: row[0], message: row[1], valid: true }),
      )
      .on('data-invalid', (row) =>
        rows.push({ phone: row[0], message: row[1], valid: false }),
      )
      .on('end', () => {
        resolve(rows);
      });
  });
};

@Injectable()
export class CsvParsingInterceptor implements NestInterceptor<MessageDTO[]> {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<MessageDTO[]>> {
    return next
      .handle()
      .pipe(mergeMap((stream: Readable) => from(csvValidation(stream))));
  }
}
