import HTTP from "@/http-common"
import type { Clock } from "@/models/clock"

export function getClockByUserId(userId: number): Promise<Clock> {
    return HTTP.get('clocks/'+ userId)
}

export function createClockByUserId(userId: number): Promise<Clock> {
    return HTTP.post('clocks/'+ userId)
}
