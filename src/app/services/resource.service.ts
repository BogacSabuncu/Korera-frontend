import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Resource} from '../Model/Resource';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private url: string = environment.apiUrl;
  //private autho = 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1widXNlcl9pZFwiOjAsXCJ1c2VyX25hbWVcIjpcInhpYW9iYWkwMVwiLFwicGFzc3dvcmRcIjpudWxsLFwiaWNvblwiOm51bGwsXCJqb2luX2RhdGVcIjpudWxsLFwicm9sZXNcIjpbe1wic3lzUm9sZV9pZFwiOm51bGwsXCJ1c2Vyc1wiOltdLFwicm9sZV9OQU1FXCI6XCJST0xFX1VTRVJcIixcInJvbGVfREVTQ1wiOm51bGx9XSxcInByb2plY3RzXCI6W119IiwianRpIjoiTWpOa1ltUTBaVGd0WVdJeFpTMDBZVEZsTFdJeU16Z3RPR1k1T0RJNU9USXhNVEE1IiwiZXhwIjoxNTgwMjMxNzQ2fQ.eTjudEgdxGm3mlwGJQsTKf9N0OuVGvt83mImKPPJoKcdHr65Xz1xxU44c8Q7CRShx7ykRDE1c_ATKvnreq4_vXwYfKa5iMyPSzMGyOxeBJDDqhPtdo4ptTCM8hucAB1cbJNSDk5pcQgrbxYt2qDTWF0fhxgC8QgeeIhrTpN5DFO5YNN84lIlGDgtiPoQQJ_ZohPET3y1HUYkSrR1xu3TDvj1dd7qWX8S4sqDAXMLutz-DJC2rsdD9VT2lTULkHuIORmKOlWV1R9GTImu65ry5TH2ANKyF7kBYuIdygomfsXs0z7T8qBSEMsJkcmPOpv0IbIIOmrmM6BKWIKnVkHdzg';
  // // private autho = 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1widXNlcl9pZFwiOjAsXCJ1c2VyX25hbWVcIjpcInhpYW9iYWkwMVwiLFwicGFzc3dvcmRcIjpudWxsLFwiaWNvblwiOm51bGwsXCJqb2luX2RhdGVcIjpudWxsLFwicm9sZXNcIjpbe1wic3lzUm9sZV9pZFwiOm51bGwsXCJ1c2Vyc1wiOltdLFwicm9sZV9OQU1FXCI6XCJST0xFX1VTRVJcIixcInJvbGVfREVTQ1wiOm51bGx9XSxcInByb2plY3RzXCI6W119IiwianRpIjoiTVRnMlkyWmtaRFF0T1RKak55MDBOalUwTFRnd09Ua3RORE5pWmpBNFlUYzVNbU01IiwiZXhwIjoxNTgwMDc5MTQ3fQ.OgK6Xnu_4zKpnlMTboeZ2emQyklPhZE-xFXQx0mpogI8apFP412tTIQESGpf4P0n_vMGDI0IEj13oqZNCm8ZATqMFYlEWymqx1CJ4w3c7NQOcPX2_VWlEGvYAIbFt2eKS5MIPujeQQXt6SjA33DqQtnosvLgMHqIn-2sJAXM7HQRTwnZPaL8aUaSMEcTCpiUud44AobX5gXPVLG6Zv4irsDzfTaF-PtxJVbOOAou9Ye2LVpGk7UXHbDgG-L9jFsAUsunPBw-yz8lASi5npbbnGpiSIuPVp1GwBhjjyvFsPhjg1rEb8I1GUM3bFdMptcM6uayIY2Weu4OURKumBkVYg';
  // // tslint:disable-next-line:max-line-length
  // private headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoie1widXNlcl9pZFwiOjAsXCJ1c2VyX25hbWVcIjpcInhpYW9ob25nXCIsXCJwYXNzd29yZFwiOm51bGwsXCJpY29uXCI6bnVsbCxcImpvaW5fZGF0ZVwiOm51bGwsXCJyb2xlc1wiOlt7XCJzeXNSb2xlX2lkXCI6bnVsbCxcInVzZXJzXCI6W10sXCJyb2xlX05BTUVcIjpcIlJPTEVfVVNFUlwiLFwicm9sZV9ERVNDXCI6bnVsbH1dLFwicHJvamVjdHNcIjpbXX0iLCJqdGkiOiJaalpoWVdVd01qY3ROekJpTlMwME1UTXhMVGt4TjJZdE0yTmtNRGhrTkdJeU9XRTQiLCJleHAiOjE1Nzk3OTgwODB9.H6XlhfUusJezzbzc8ldbE3Oz5pPjZYN6wxGyW1pPy4GXV9swWUqTcx1ZPfrK2mjj987Aj9-rVRL2fUl7If9SvMdatbSBV6aOLzJmUwnqti89dO1-oeGbtSupNOKPfQQBKmtyyXYmdys9WLC5-24zgsihArmS8UnBNMrZ7DJVGjzU5mD8ciRdxnJsHli96kUY-wni6xriRg6SFTjTHxoo0wcsM4u3l85GV3VuFhAojN8kzodeDika8U9mijsHIjIXrOiEGE2ArWKcKoQ03pC73ReMtAIyiIlhw8xXkeSd92ca50CvDi5HEciPwrAtlcXTq0aqt51E90JSA5uQ2_IIvA') ;
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     // tslint:disable-next-line:max-line-length
  //     //Authorization : this.autho
  //   })
  // };

  constructor(private http: HttpClient) { }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.url + '/resource/findAll');//, this.httpOptions);
  }
  addResource(resource: Resource): Observable<any> {
    return this.http.post(this.url + '/resource/add', resource);//, this.httpOptions);
  }

  updateResource(id: number, resource: Resource): Observable<Resource> {
    return this.http.put<Resource>(this.url + '/resource/update/' + id, resource);//, this.httpOptions);
  }

  deleteResource(id: number): Observable<Resource> {
    return this.http.delete<Resource>(this.url + '/resource/delete/' + id)//, this.httpOptions);
  }
}
