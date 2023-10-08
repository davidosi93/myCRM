import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class Getapi {
    private url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=aSTbKpn0OoqOI3YfpVbAje6BS4QYQAcX';

    constructor(private httpClient: HttpClient) { }

    getPosts() {
        return this.httpClient.get(this.url);
    }

}
