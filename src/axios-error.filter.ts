import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AxiosErrorFilter extends BaseExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const response = error?.response;
    if (response?.data) {
      console.error('axios', error?.config?.topmostError ?? error);
      console.error('axios error data', response.data);
    }
    return super.catch(error, host);
  }
}
