import { APPROVAL_STATE, BOOKING_COLORS } from "_/constants";

export const approvalText = {
    [APPROVAL_STATE.approved]: 'Aprovada',
    [APPROVAL_STATE.pending]: 'Pendente',
    [APPROVAL_STATE.rejected]: 'Rejeitada'
}

export const approvalColor = {
    [APPROVAL_STATE.approved]: BOOKING_COLORS.approved,
    [APPROVAL_STATE.pending]: BOOKING_COLORS.pending,
    [APPROVAL_STATE.rejected]: BOOKING_COLORS.rejected
}