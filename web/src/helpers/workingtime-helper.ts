import HTTP from "@/http-common"
import type { Workingtime } from '@/models/workingtime'

export function postWorkingTime(idUser: number, start: string, end: string): Promise<void> {
  return HTTP.post("workingtimes/" + idUser, {
      "workingtime": {
        "start": start,
        "end": end
      }
    })
}

export function putWorkingTime(idWorkingTime: number, start: string, end: string): Promise<void> {
  return HTTP.put("workingtimes/" + idWorkingTime, {
      "workingtime": {
        "start": start,
        "end": end
      }
    })
}

export function deletedWorkingTime(idWorkingTime: number): Promise<void> {
  return HTTP.delete("workingtimes/" + idWorkingTime)
    // .then((response) => {
    //   if(response.status == 204){
    //     this.arrayWorkingTime = [...this.arrayWorkingTime.filter(x => x.id != idWorkingTime)]
    //   }
    // })
}

export function getWorkingTime(idUser: number): Promise<Workingtime[]> {
  return HTTP.get("workingtimes/" + idUser)
}

export function getAllWorkingTimes(): Promise<Workingtime[]> {
    return HTTP.get("workingtimes")
}