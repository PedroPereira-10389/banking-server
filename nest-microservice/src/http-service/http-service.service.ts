import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class HttpServiceService {
    constructor(private readonly httpService: HttpService) { }

    headers() {
        const headersRequest = {
            'Authorization': 'Basic ' + process.env.BASIQ_KEY,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'basiq-version': '3.0'
        }

        return headersRequest
    }

    get(url: string): Observable<any> {
        return this.httpService.get(url, { headers: this.headers() });
    }

    async post(url: string, data: any): Promise<AxiosResponse> {
        data['scope'] = 'SERVER_ACCESS';
        return this.httpService.axiosRef.post(url, data, { headers: this.headers() });
    }

    put(url: string, data: any): Observable<any> {
        data['scope'] = 'SERVER_ACCESS';
        return this.httpService.put(url, data, { headers: this.headers() });
    }

    delete(url: string, config?: AxiosRequestConfig): Observable<any> {
        return this.httpService.delete(url, config);
    }

}
