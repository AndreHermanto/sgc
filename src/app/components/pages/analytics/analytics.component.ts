import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { VecticAnalyticsService } from '../../../services/analytics-service';
import { Subscription } from 'rxjs/Subscription';
import { FilterType } from 'angular-google-charts';
import { Subject, forkJoin, of, BehaviorSubject } from 'rxjs';
import { Draggable, GridsterConfig, GridsterItem, PushDirections, Resizable} from 'angular-gridster2';
import {GRIDSTER_CONFIG} from '../../../shared/gridsterConfig';
import { ResizedEvent } from 'angular-resize-event';
import {Auth} from '../../../services/auth-service';
import { start } from 'repl';
import { mergeMap, take } from '../../../../../node_modules/rxjs/operators';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  private subscriptions: Subscription[] = [];
  colorsPalette = ['#17acd7', '#56c366', '#ffa600', '#b0c536', '#63d284'];
  cohortSearchData = [];
  cohortSearchCols = [];
  cohortSearchOptions = {
    colors: this.colorsPalette
  }
  monthlyLoginData = [];
  monthlyLoginCols = [];
  monthlyLoginOptions = {   
    vAxis:{
       title: 'count'
    },
    legend: {
      position: 'top'
    },
    pointSize:5,
    colors: this.colorsPalette
 };
  emailDomainData = [];
  emailDomainCols = [];
  emailDomainOptions={
    legend: 'none',
    colors: this.colorsPalette,
    vAxis: {
      textStyle: {
        fontSize: 8
      }
    }
  };
  loginAreaData = [];
  loginAreaCols = [];
  loginAreaOptions={
    
  };
  topLoginData=[];
  topLoginCols=[];
  topLoginOptions={
    legend: 'none',
    colors: this.colorsPalette
  };

  loginChartData=[];
  loginChartCols=[];
  loginChartOptions={
    width: 900,
    height: 400,
    calendar: {
      cellSize: 13,
    },
  };
  topPanelData=[];
  topPanelCols=[];
  topPanelOptions={
    legend: 'none',
    colors: this.colorsPalette
  };
  top10QueriesData=[];
  top10QueriesCols=[];
  top10QueriesOptions={
    colors: this.colorsPalette
  };
  calendarChart: any = {};
  calendarData: any = {};
  calendarOptions: any = {
    colors: this.colorsPalette
  };
  controlFilterType = FilterType.Category;
  controlOptions = {
    filterColumnIndex: 0,
    ui: {
      label: '',
      caption: 'Choose a cohort...'
    }
  }
  dataAccessData = [];
  dataAccessCols = [];
  dataAccessOptions = {
    colors: this.colorsPalette
  };
  aghaPanelData = [];
  aghaPanelCols = [];
  aghaPanelOptions = {
    legend: 'none',
    colors: this.colorsPalette
  };
  genomicEnglandPanelData = [];
  genomicEnglandPanelCols = [];
  genomicEnglandPanelOptions = {
    legend: 'none',
    colors: this.colorsPalette
  };
  panelAppPanelData = [];
  panelAppPanelCols = [];
  panelAppPanelOptions = {
    legend: 'none',
    colors: this.colorsPalette
  };
  startDate: any = null;
  endDate: any = null;
  dateFilter = new BehaviorSubject<any>({
    start: '2020-06-20',
    end: this.formatDate(new Date())
  });

  cohortsList = ['Circa']
  cohortsFilter = new BehaviorSubject<string[]>([]);
  cohortsFilterArr = [];

  allCharts = [
    {
      id:'loginChart',
      label: 'Users login',
      visible: true,
      cols: 8,
      rows: 3,
      x:0,
      y:0,
      resizeEnabled: false
    },
    {
      id:'monthlyLogin',
      label: 'Monthly login count',
      visible: true,
      cols: 4,
      rows: 2,
      x:0,
      y:0
    },
    {
      id:'loginArea',
      label: 'Login locations',
      visible: true,
      cols: 8,
      rows: 5,
      x:0,
      y:0
    },
    {
      id:'emailDomain',
      label: 'Email domains',
      visible: true,
      cols: 4,
      rows: 6,
      x:0,
      y:0
    },
    {
      id:'cohortSearch',
      label: 'Total queries',
      visible: true,
      cols: 5,
      rows: 6,
      x:0,
      y:0
    },
    {
      id:'dataAccess',
      label: 'Query types',
      visible: true,
      cols: 3,
      rows: 6,
      x:0,
      y:0
    },
    {
      id:'top10Queries',
      label: 'Top 10 genes search',
      visible: true,
      cols: 4,
      rows: 3,
      x:0,
      y:0
    },
    {
      id:'topPanel',
      label: 'Gene panels queries',
      visible: true,
      cols: 4,
      rows: 3,
      x:0,
      y:0
    },
    {
      id:'aghaPanel',
      label: 'Australian Genomics Genes List',
      visible: true,
      cols: 4,
      rows: 3,
      x:0,
      y:0
    },
    {
      id:'genomicEnglandPanel',
      label: 'Genomics England Panel',
      visible: true,
      cols: 4,
      rows: 3,
      x:0,
      y:0
    },
    {
      id:'panelAppPanel',
      label: 'Australian Genomics Panel',
      visible: true,
      cols: 4,
      rows: 3,
      x:0,
      y:0
    },
    {
      id:'topLogin',
      label: 'Top users logins',
      visible: true,
      cols: 12,
      rows: 5,
      x:0,
      y:0
    },
  ];

  visibleDelayed  = {}

  //Gridster
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  //End

  constructor(private vas: VecticAnalyticsService, 
              public auth: Auth,
              private cd: ChangeDetectorRef
            ) { }

  ngOnInit(): void {
    this.allCharts.forEach(c => {
      this.visibleDelayed[c.id] = c.visible;
    })
    this.dashboard = this.allCharts.filter(c => c.visible).map(c => {
      return {cols: c.cols, rows: c.rows, id: c.id, label: c.label, x : c.x, y: c.y, resizeEnabled: c.resizeEnabled === false ? false : true }
    })
    //Gridster
    this.options = GRIDSTER_CONFIG;
    //End

    this.dateFilter.subscribe(date => {
      this.subscriptions.forEach((s => s.unsubscribe()));
      if(date){
        this.subscriptions.push(this.vas.getDomainLogin(date.start,date.end).subscribe((e) => {
          this.emailDomainData = this.convertToChartFormat(e);
          this.emailDomainCols = this.convertToChartColumn(e);
        }));
        this.subscriptions.push(this.vas.getLoginLocation(date.start,date.end).subscribe((e) => {
          this.loginAreaData = this.convertToChartFormat(e);
          this.loginAreaCols = this.convertToChartColumn(e);
        }));

        this.subscriptions.push(
          this.vas.getTopLogin(date.start,date.end, null).subscribe((e) => {
            if(e.length> 0){
              this.topLoginData = e;
              this.topLoginCols = Object.keys(e[0]);
            }else{
              this.topLoginData = [];
            }
          })
        )
    
        this.subscriptions.push(this.vas.getDailyLogin(date.start,date.end).subscribe((e) => {
          let temp = this.convertToChartFormat(e);
          this.loginChartData = temp.map(e => {
            e[0] = new Date(e[0])
            return e;
          })
          this.loginChartCols = this.convertToChartColumn(e);
        }));
        this.subscriptions.push(this.cohortsFilter.subscribe(cohorts => {
          this.cohortsFilterArr = cohorts;
          if(cohorts.length === 0){
            this.vas.getPanelData(date.start,date.end).subscribe((e) => {
              this.topPanelData = this.convertToChartFormat(e);
              this.topPanelData = this.topPanelData.map(e => {
                if(e[0] === 'agha'){
                  e[0] = 'Australian Genomics Genes List'
                }else if(e[0] === 'genomicEngland'){
                  e[0] = 'Genomics England Panel'
                }else if(e[0] === 'panelApp'){
                  e[0] = 'Australian Genomics Panel'
                }
                return e;
              })
              this.topPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getGeneCount(date.start,date.end).subscribe((e) => {
              this.top10QueriesData = this.convertToChartFormat(e);
              this.top10QueriesCols = this.convertToChartColumn(e);
            });

            this.vas.getQueryType(date.start,date.end).subscribe((e) => {
              this.dataAccessData = this.convertToChartFormat(e);
              this.dataAccessCols = this.convertToChartColumn(e);
            });

            this.vas.getSinglePanel('agha',date.start,date.end).subscribe((e) => {
              this.aghaPanelData = this.convertToChartFormat(e);
              this.aghaPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getSinglePanel('genomicEngland',date.start,date.end).subscribe((e) => {
              this.genomicEnglandPanelData = this.convertToChartFormat(e);
              this.genomicEnglandPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getSinglePanel('panelApp',date.start,date.end).subscribe((e) => {
              this.panelAppPanelData = this.convertToChartFormat(e);
              this.panelAppPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getCohortSearch(date.start,date.end).subscribe((e) => {
              this.cohortSearchData = this.convertToChartFormat(e);
              this.cohortSearchCols = this.convertToChartColumn(e);
            })
          }else{
            this.vas.getPanelData(date.start,date.end,cohorts.join(',')).subscribe((e) => {
              this.topPanelData = this.convertToChartFormat(e);
              this.topPanelData = this.topPanelData.map(e => {
                if(e[0] === 'agha'){
                  e[0] = 'Australian Genomics Genes List'
                }else if(e[0] === 'genomicEngland'){
                  e[0] = 'Genomics England Panel'
                }else if(e[0] === 'panelApp'){
                  e[0] = 'Australian Genomics Panel'
                }
                return e;
              })
              this.topPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getGeneCount(date.start,date.end,cohorts.join(',')).subscribe((e) => {
              this.top10QueriesData = this.convertToChartFormat(e);
              this.top10QueriesCols = this.convertToChartColumn(e);
            });

            this.vas.getQueryType(date.start,date.end, cohorts.join(',')).subscribe((e) => {
              this.dataAccessData = this.convertToChartFormat(e);
              this.dataAccessCols = this.convertToChartColumn(e);
            });

            this.vas.getSinglePanel('agha',date.start,date.end, cohorts.join(',')).subscribe((e) => {
              this.aghaPanelData = this.convertToChartFormat(e);
              this.aghaPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getSinglePanel('genomicEngland',date.start,date.end, cohorts.join(',')).subscribe((e) => {
              this.genomicEnglandPanelData = this.convertToChartFormat(e);
              this.genomicEnglandPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getSinglePanel('panelApp',date.start,date.end, cohorts.join(',')).subscribe((e) => {
              this.panelAppPanelData = this.convertToChartFormat(e);
              this.panelAppPanelCols = this.convertToChartColumn(e);
            });

            this.vas.getCohortSearch(date.start,date.end, cohorts.join(',')).subscribe((e) => {
              this.cohortSearchData = this.convertToChartFormat(e);
              this.cohortSearchCols = this.convertToChartColumn(e);
            })
          }
        }))

        let queries = this.splitDatesIntoYearlyQueries(date.start,date.end).map(q=> this.vas.getMonthlyLogin(q[0],q[1],q[2]))

        this.subscriptions.push(forkJoin(queries).subscribe(data => {
          if(data[0].length>0){
            let yearlyChart = data.map(yearlyData=> {
              let data = this.convertToChartFormat(yearlyData);
              let col = this.convertToChartColumn(yearlyData);
              let monthExist = data.map(e => e[0]);
              let newMonthlyLoginData = [];
              for(let i=1;i<13;i++){
                if(!monthExist.includes(i)){
                  newMonthlyLoginData.push([i,null])
                }else{
                  newMonthlyLoginData.push([i,data.find(e => e[0] === i)[1]])
                }
              }
              data = newMonthlyLoginData;
              return {
                data: data,
                col: col
              }
            })
            let finalData = [["January"], ["February"], ["March"], ["April"], ["May"], ["June"], 
            ["July"], ["August"], ["September"], ["October"], ["November"], ["December"]];
            let finalCol = ['Month'];
            yearlyChart.forEach((year) =>{
              finalCol.push(year.col[1]);
              for(let j = 0;j<12;j++){
                finalData[j].push(year.data[j][1])
              }
            });
            this.monthlyLoginData = finalData;
            this.monthlyLoginCols = finalCol;
          }else{
            this.monthlyLoginData = [];
            this.monthlyLoginCols = [];
          }
        }));
    
      }
    });
  }

  ngAfterViewInit(): void {
  }

  splitDatesIntoYearlyQueries(start,end){
    let arrOfQueries = [];
    let startArr = start.split('-');
    let endArr = end.split('-');
    let yearStart = parseInt(startArr[0]);
    let yearEnd = parseInt(endArr[0]);
    if(yearStart < yearEnd){
      while(yearStart < yearEnd){
        if(yearStart === parseInt(startArr[0])){
          arrOfQueries.push([start, `${yearStart}-12-31`, yearStart])
        }else{
          arrOfQueries.push([`${yearStart}-1-1`, `${yearStart}-12-31`, yearStart])
        }
        yearStart++
      }
      if(yearStart === yearEnd){
        arrOfQueries.push([`${yearStart}-1-1`, end, yearEnd])
      }
    }else{
      arrOfQueries.push([start,end,yearStart])
    }


    return arrOfQueries;
  }

  convertToChartFormat(data){
    let chartData = []
    data.forEach(function (row) {
      let gglRow = [];
      Object.keys(row).forEach(function (key) {
        gglRow.push(row[key]?row[key]:'No Data');
      });
      chartData.push(gglRow);
    });
    return chartData;
  }
  convertToChartColumn(data){
    let chartColumn = [];
    if(data.length>0){
      Object.keys(data[0]).forEach(column => {
        chartColumn.push(column)
      });
      return chartColumn
    }else{
      return [];
    }
  }

  onDateChange(e){
    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);
    if(this.startDate && this.endDate && new Date(this.startDate)<new Date(this.endDate)){    
      let sqlFormatDateStart = this.formatDate(startDate);
      let sqlFormatDateEnd = this.formatDate(endDate);
      this.dateFilter.next({
        start: sqlFormatDateStart,
        end: sqlFormatDateEnd
      });
    }
  }


  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
  }

  updateVisibleCharts(chart){
    if(chart.visible){
      this.addItem(chart.cols,chart.rows,chart.id, chart.label, chart.resizeEnabled);
      setTimeout(() => {
        this.visibleDelayed[chart.id] = true; 
        this.cd.detectChanges();
      }
      , 200)
    }else{
      this.removeItem(chart.id);
      this.visibleDelayed[chart.id] = false;
      this.cd.detectChanges();
    }
  }

  closeChart(id){
    this.allCharts = this.allCharts.map(c => {
      if(c.id === id){
        c.visible = false;
      }
      return c;
    })
    this.removeItem(id);
  }

  //Gridster
  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(id): void {
    let item = this.dashboard.find(item => item.id === id);
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(colsItem, rowsItem, id, label, resizeEnabled) {
    this.dashboard.push({x: 0, y: 0, cols: colsItem, rows: rowsItem, id: id, label: label, resizeEnabled: resizeEnabled === false?false:true});
  }
  //End

  resetDate(e){
    this.startDate = '2020-06-20';
    this.endDate = this.formatDate(new Date());
    this.onDateChange(e);
  }

  trackBy(index: number, item: GridsterItem): number {
    return item.id;
  }

  resetGrid(e){
    this.allCharts.forEach(c => {
      this.removeItem(c.id);
      c.visible = false;
      this.visibleDelayed[c.id] = false;
      this.cd.detectChanges();
    })
    this.allCharts.forEach(c => {
      this.addItem(c.cols, c.rows, c.id, c.label, c.resizeEnabled);
      c.visible = true;
      setTimeout(() => {
        this.visibleDelayed[c.id] = true; 
        this.cd.detectChanges();
      }
      , 200)
    })
  }

  onResized(event: ResizedEvent, id, data) {
    if(event.element.nativeElement.id === id){
      this[data] = Object.assign([], this[data]);
    }
  }

  onSelectionCohorts(e){
    this.cohortsFilter.next(e);
  }

  downloadTopLoginData() {
    const data = this.topLoginData.map((e) => {
        return {
            'Email': e.email,
            'Login Count': e.count
        };
    });
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], {type: 'text/plain'});
    saveAs(blob, 'data_user_login_' + new Date().getTime() + '.csv');
}
}
