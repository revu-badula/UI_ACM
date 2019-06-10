import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { IncidentManagementDTO } from './incident-model';
 
@Injectable()
export class MissionService {
 
  // Observable string sources
  private missionAnnouncedSource = new Subject<IncidentManagementDTO>();
  private missionConfirmedSource = new Subject<string>();
 
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
 
  // Service message commands
  announceMission(mission: IncidentManagementDTO) {
    this.missionAnnouncedSource.next(mission);
  }
 
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}