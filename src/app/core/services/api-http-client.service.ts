import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ApiHttpClientService {
	private _apiCredentials: string;
	private headers: HttpHeaders;
	private options: {
		headers: HttpHeaders;
		params?: any;
	};

	constructor(private httpClient: HttpClient) {
		this._apiCredentials = 'X-API-Credentials';
		this.headers = new HttpHeaders().set(this.apiCredentials, '');
		this.options = { headers: this.headers };
	}

	public get apiCredentials(): string {
		return this._apiCredentials;
	}

	public get<T>(url: string, _params: any, skipCredentials?: boolean): Observable<any> {
		if (skipCredentials) {
			return this.httpClient.get(url, { params: _params });
		} else {
			const getParams = _.cloneDeep(this.options);
			getParams.params = _params;
			return this.httpClient.get(url, getParams);
		}
	}

	public post<T>(url: string, body: any, skipCredentials?: boolean): Observable<any> {
		if (skipCredentials) {
			return this.httpClient.post(url, body);
		} else {
			return this.httpClient.post(url, body, this.options);
		}
	}
}
