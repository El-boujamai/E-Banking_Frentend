import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

interface CustomJwtPayload {
  sub?: string;
  exp?: number;
  iat?: number;
  scope?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  roles: any;

  username: any;

  accessToken!: any;

  constructor(private http: HttpClient) {}

  public login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };

    let params = new HttpParams().set('username', username).set('password', password);

    return this.http.post(environment.backendHost + '/auth/login', params, options);
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;

    this.accessToken = data['access-token'];

    let decoderJwt = jwtDecode<CustomJwtPayload>(this.accessToken);

    this.username = decoderJwt.sub;

    this.roles = decoderJwt.scope;
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = null;
    this.username = null;
    this.roles = null;

  }
}
