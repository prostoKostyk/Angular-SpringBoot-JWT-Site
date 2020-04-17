import { Injectable } from "@angular/core";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

@Injectable({
  providedIn: "root"
})
export class TokenStorageService {

  constructor() { }

  /**
   * Метод для выхода пользователя
   */
  signOut() {
    window.sessionStorage.clear();
  }

  /**
   * Метод для добавления в sessionStorage нового токена
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Метод для получения токена из sessionStorage
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Метод для сохранения данных пользователя в sessionStorage
   */
  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Метод для получения данных пользователя из sessionStorage
   */
  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
