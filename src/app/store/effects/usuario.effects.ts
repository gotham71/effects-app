import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuarioActions from "../actions";



@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ){}

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap(
        ( action ) => this.usuarioService.getUserById( action.id )
          .pipe(
            map( user => usuarioActions.cargarUsuarioSuccess({ usuario: user })),
            catchError( err => of(usuarioActions.cargarUsuarioError({ payload: err })) )
          )
      )
    )
  );

}
