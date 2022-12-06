import { UpdateObj } from "_/util"

export interface Approval extends UpdateObj<boolean> {
    approved : boolean
}

export function parseApprovalObj(approved: boolean): Approval{
    return { approved }
}