import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {filter, map, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(private authService: AuthenticationService,
              private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter(val => val !== null),
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          //Permet de se connecter automatiquement si on c'est déjà connecter
          this.router.navigateByUrl('/tabs', {replaceUrl: true});
        } else {
          return true;
        }
      })
    );
  }
}
