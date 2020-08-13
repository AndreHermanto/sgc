import { Injectable } from '@angular/core';
import * as Raven from 'raven-js';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, forkJoin } from "rxjs";
import {switchMap, catchError} from 'rxjs/operators'
import {Panel, PanelsList, GenesList} from '../model/panel'

@Injectable()
export class PanelAppService {
    panels: Panel[];
    constructor(private http: HttpClient) {
    }

    getPanels(url,fullData:PanelsList):Observable<PanelsList>
    {
      fullData = fullData || new PanelsList([], '');
      return this.http.get(url).pipe(
        switchMap((data:any)=>{
          fullData.listPanels = fullData.listPanels.concat(data.results.map(panel => new Panel(panel.name, panel.stats.number_of_genes)));
          return !data.next? of(fullData):
                 this.getPanels(data.next,fullData)
        }),
        catchError((e) => {
            return of(new PanelsList([], 'PanelApp is currently not available. Please try again later.'))
        })
      )
    }

    getPanel(panelName): Observable<GenesList>{
        const headers = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Accept', '*/*');

        return this.http.get(`https://panelapp.agha.umccr.org/api/v1/panels/${panelName}/`, {headers: headers})
            .map((data) => {
                return new GenesList(data, null);
            })
            .catch((e) => {
                Raven.captureMessage("PanelApp: " + JSON.stringify(e));
                return of(new GenesList([], 'PanelApp is currently not available. Please try again later.'));
            });
    }


}



