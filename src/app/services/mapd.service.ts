import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MapdFilterService } from './mapd-filter.service';
import { reject } from '../../../node_modules/@types/q';

@Injectable()
export class MapdService {
    session = null;

    constructor(private mfs: MapdFilterService) {
    }

    connect(cohort, build): Promise<any> {
        let config = {
            protocol: '',
            host: '',
            port: '',
            dbName: '',
            user: '',
            pwd: ''
        };
        if(build === "GRCh37"){
            config = environment.mapd37;
        }else if(build === "GRCh38"){
            config = environment.mapd38;
        }else{
            return Promise.reject('Build is not correct');
        }
        return new Promise((resolve, reject) => {
            new MapdCon()
                .protocol([config.protocol])
                .host([config.host])
                .port([config.port + '/' + cohort])
                .dbName([config.dbName])
                .user([config.user])
                .password([config.pwd])
                .connect((error, session) => {
                    if (error) {
                        reject(error);
                    } else {
                        this.session = session;
                        session.getFields(cohort, (err, res) => {
                            if (err) {
                                reject(error);
                            } else {
                                this.mfs.columns = res;
                                resolve(session);
                            }
                        });
                    }
                });
        });
    }

}
