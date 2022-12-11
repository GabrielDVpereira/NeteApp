import { APPROVAL_STATE } from "_/constants"
import { useAuth } from "_/contexts"
import { approvalText } from "_/helpers"
import { Booking, Checkin, Event } from "_/models"
import { Button } from "./Button"

interface Props{
    event?: Event
    openModal: boolean
    closeModal: () => void
    updateAproval: (id: string, approval: APPROVAL_STATE) => Promise<void>
}

export function EventModal({event, openModal, closeModal, updateAproval} : Props){
    const { isAdmin } = useAuth()
    const buttonOnClick = async (approval: APPROVAL_STATE) => {
      await updateAproval(event!.id!, approval)
      closeModal()
    }

    const eventIsBooking = event instanceof Booking
    const eventIsCheckin = event instanceof Checkin

    return (
        openModal && event ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        {event.modalTitle}
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={closeModal}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-slate-500 text-lg leading-relaxed">
                        {eventIsCheckin &&
                          (<><b>Destino:</b> {event.local}<br/></>)
                        }
                        {eventIsBooking && event.approval &&
                          (<><b>Status:</b> {approvalText[event.approval]}<br/></>)
                        }
                        {event?.description}
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      {eventIsBooking && isAdmin && (
                        <>
                          <Button styleType="success" onClick={() => buttonOnClick(APPROVAL_STATE.approved)}>Aprovar</Button>
                          <Button onClick={() => buttonOnClick(APPROVAL_STATE.rejected)}>Recusar</Button>
                        </>
                      )}
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={closeModal}
                      >
                        Fechar
                      </button>

                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null
    )
}