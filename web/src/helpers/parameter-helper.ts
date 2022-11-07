import HTTP from "@/http-common"
import type { Parameter } from "@/models/parameter"

export function postParameter(daily_hours: number, day_per_week: number, filling_mode: String, allowed_to_modify_WT: Boolean): Promise<void> {
  return HTTP.post('parameters', {
    "parameter":{
      "daily_hours": daily_hours,
      "day_per_week": day_per_week,
      "filling_mode": filling_mode,
      "allowed_to_modify_WT": allowed_to_modify_WT
    }   
  })
}

export function getAllParameters(): Promise<Parameter[]> {
  return HTTP.get('parameters')
}

export function getParameter(parameterID: number): Promise<Parameter> {
  return HTTP.get('parameters/' + parameterID)
}

export function putUser(parameterId: number, daily_hours: number, day_per_week: number, filling_mode: String, allowed_to_modify_WT: Boolean): Promise<void> {
  return HTTP.put('parameters/' + parameterId, {
    "parameter":{
      "daily_hours": daily_hours,
      "day_per_week": day_per_week,
      "filling_mode": filling_mode,
      "allowed_to_modify_WT": allowed_to_modify_WT
    } 
  })
}