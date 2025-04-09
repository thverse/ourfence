import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { excludeFields } from 'src/utils/util';

@Injectable()
export class ExcludeFieldsInterceptor implements NestInterceptor {
  constructor(private readonly fieldsToExclude: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => excludeFields(item, this.fieldsToExclude));
        }
        return excludeFields(data, this.fieldsToExclude);
      }),
    );
  }
}
