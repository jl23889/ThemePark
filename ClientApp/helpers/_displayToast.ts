import { toast } from 'react-toastify';

export function displayToast(alertObject) {
	if (alertObject != null) {
	    if (alertObject.alertType == 'error') {
	        toast.update(alertObject.toastId, {
	            render: alertObject.alertMessage,
	            type: 'error',
	            autoClose: 5000,
	            hideProgressBar: true 
	        });
	    } else if (alertObject.alertType == 'success') {
	        toast.update(alertObject.toastId, {
	            render: alertObject.alertMessage,
	            type: 'success',
	            autoClose: 5000,
	            hideProgressBar: true 
	        });
	    } 
	}
}