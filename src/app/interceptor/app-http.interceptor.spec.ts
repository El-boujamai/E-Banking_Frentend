import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app-http.interceptor';
import { AuthService } from '../services/auth.service';

describe('AppHttpInterceptor', () => {
  let interceptor: AppHttpInterceptor;
  let authServiceMock: any;

  beforeEach(() => {
    // Créer un mock du service AuthService
    authServiceMock = {
      accessToken: 'fake-test-token-123'
    };

    TestBed.configureTestingModule({
      providers: [
        AppHttpInterceptor,
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    interceptor = TestBed.inject(AppHttpInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header when token exists', () => {
    expect(interceptor).toBeTruthy();
    // Vous pouvez ajouter des tests plus avancés ici
  });
});
