import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { first, tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`/users`);
    }

    register(user): Observable<any> {
        return this.http.post<any>(`http://localhost:8080/user/add`, user)
            .pipe(first());
    }

    delete(id) {
        return this.http.delete(`/users/${id}`);
    }
}