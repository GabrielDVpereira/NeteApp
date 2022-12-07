import { APPROVAL_STATE } from "_/constants"

export interface Event {
    id: string
    start: Date
    end: Date
    title: string
    color: string
    modalTitle: string
    modalDescription: string
    type: 'checkin' | 'booking'
    local?: string
    status?: APPROVAL_STATE
}