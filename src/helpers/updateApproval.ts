import { APPROVAL_STATE } from "_/constants"
import { UpdateObj } from "_/util"
export interface Approval extends UpdateObj<string> {
    approval : APPROVAL_STATE
}

export function parseApprovalObj(approval: APPROVAL_STATE): Approval{
    return { approval }
}