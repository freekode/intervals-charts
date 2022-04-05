import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IntervalsClient } from 'app/infrastructure/intervals.client';

@Injectable({
  providedIn: 'root'
})
export class IntervalsRepository {

  REQUIRED_STREAMS = ['time']

  constructor(private intervalsClient: IntervalsClient) { }

  getActivityData(activityId: string, streamTypes: string[]): Observable<any> {
    const requestedStreams = streamTypes.concat('time')
    return this.intervalsClient.getStreams(activityId, requestedStreams).pipe(
      map((response: any) => {
        const timeStreamData = this.getStreamData('time', response);
        const streamsData = this.getStreamsData(streamTypes, response);

        return this.mergeActivityStreams(timeStreamData, streamTypes, streamsData);
      })
    )
  }

  private mergeActivityStreams(timeStreamData: any[], streamTypes: string[], streamsData: any): any {
    let activityData: any = [];
    for (const i in timeStreamData) {
      let timeTick: any = {};
      timeTick['time'] = timeStreamData[i];

      for (const streamType of streamTypes) {
        timeTick[streamType] = streamsData[streamType][i];
      }

      activityData.push(timeTick);
    }
    return activityData;
  }

  private getStreamsData(streamTypes: string[], response: any) {
    let streamsData: any = {};
    for (const streamType of streamTypes) {
      streamsData[streamType] = this.getStreamData(streamType, response)
    }
    return streamsData
  }

  private getStreamData(streamType: string, data: Array<any>) {
    for (const stream of data) {
      if (streamType === stream['type']) {
        return stream['data']
      }
    }
    throw Error('cant find stream')
  }
}
