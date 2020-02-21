import { Component, Input } from '@angular/core';
import { ClinicalFields } from '../../../model/clinical-fields';
import * as _ from 'lodash/array';

@Component({
    selector: 'app-cardiac-information',
    templateUrl: './cardiac-information.component.html',
    styleUrls: ['./cardiac-information.component.css']
})
export class CardiacInformationComponent{
    //Internal IDs
    @Input() samples: string[] = [];
    //pheno file
    @Input() pheno: any[] = [];
    permission: string = 'cardiac/pheno';

    multiValueFilter = (dimension, filters) => {
      dimension.filter(null);   
      if (filters.length === 0)
          dimension.filter(null);
      else
          dimension.filterFunction(function (d) {
              if (_.difference(filters, d).length === 0) return true;
              return false; 
          });
      return filters;  
  }
  
    clinicalFields: ClinicalFields[] = [
        new ClinicalFields('sex', 'sex', 'Sex', 'pie'),
        new ClinicalFields('Family history of disease', 'famDiseaseHistory', 'Family history of disease', 'pie'),
        new ClinicalFields('Family history of sudden death', 'famSuddenDeathHistory', 'Family history of sudden death', 'pie'),
        new ClinicalFields('Cardiomyopathies', 'cardiomyopathies', 'Cardiomyopathies', 'row'),
        new ClinicalFields('Primary arrhythymias', 'primaryArrhythymias', 'Primary Arrhythymias', 'row'),
        new ClinicalFields('Congenital heart disease', 'congenitalHeartDisease', 'Congenital heart disease', 'row'),
        new ClinicalFields('Symptoms at diagnosis', 'symptomsAtDiagnosis', 'Symptoms at diagnosis', 'pie'),
    ];
    phenoService: string = 'getCardiac'

    constructor() {
    }

}
