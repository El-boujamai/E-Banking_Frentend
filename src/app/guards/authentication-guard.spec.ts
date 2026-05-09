import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationGuard } from './authentication-guard';
import { AuthService } from '../services/auth.service';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Crée des "doublures" (mocks) pour les services dont le guard dépend
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], { accessToken: undefined });
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      // Fournit le vrai guard et les doublures des services
      providers: [
        AuthenticationGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    // Récupère les instances injectées
    guard = TestBed.inject(AuthenticationGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is authenticated (has accessToken)', () => {
    // Simule un utilisateur connecté en définissant un accessToken
    Object.defineProperty(authService, 'accessToken', { value: 'fake-jwt-token' });

    // Appelle la méthode canActivate
    const canActivate = guard.canActivate({} as any, {} as any);

    // Vérifie que le guard autorise l'accès
    expect(canActivate).toBe(true);
  });

  it('should return false and navigate to /login if user is not authenticated', () => {
    // Simule un utilisateur déconnecté (pas d'accessToken)
    Object.defineProperty(authService, 'accessToken', { value: undefined });

    // Appelle la méthode canActivate
    const canActivate = guard.canActivate({} as any, {} as any);

    // Vérifie que le guard bloque l'accès
    expect(canActivate).toBe(false);
    // Vérifie que la redirection vers la page de login a bien été demandée
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
