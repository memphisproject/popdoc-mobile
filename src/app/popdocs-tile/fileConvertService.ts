import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileConvertService  {
  private token = 'Bearer ' + localStorage.getItem('jwt');

  constructor(private http: HttpClient, private router: Router) {}

  downloadFile(secretName) {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get('https://dev.memphis.io/newconvertpdfserver/' + secretName, { headers, responseType: 'blob' });
  }
}
