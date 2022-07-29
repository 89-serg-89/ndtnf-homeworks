import { NestInterceptor, ExecutionContext, CallHandler, Injectable, BadGatewayException } from '@nestjs/common'
import { tap, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

export interface Response<T> {
  status: string
  data: T
}

@Injectable()
export class RequestInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept (context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const res = context.switchToHttp().getResponse()
    return next
      .handle()
      .pipe(
        tap(data => {
          return res.json({
            status: 'success',
            data
          })
        })
      )
  }
}
