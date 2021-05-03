import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import {BehaviorSubject, from, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, switchMap, tap} from "rxjs/operators";
const { Storage } = Plugins;

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //Init avec null pour filtrer la premiere valeur dans guard
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  /**
   * Permet de vérifier sur chaque page si le client est bien logger.
   */
  async loadToken() {
    const token = await Storage.get({key: TOKEN_KEY});
    if (token && token.value) {
      console.log('set token : ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  /**
   * Permet de connecter l'utilisateur.
   * @param credentials
   */
  login(credentials: {email, password}): Observable<any> {
    return this.http.post('https://reqres.in/api/login', credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  /**
   * Permet de déconnecter le client
   */
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
