import { toast } from "react-toastify";

export interface IAlertHelper {
    alertSucess: (message: string) => void
    alertError: (message: string) => void
}

export class AlertHelper implements IAlertHelper {
    alertSucess(message: string) { 
        toast.success(message) 
    };
    alertError(message: string){ 
        toast.error(message) 
    };
    
}
