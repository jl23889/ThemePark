// RIDES 
//////////////
export interface Ride {
    rideId: string;
    rideName: string;
    totalCapcity: number;
    installationDate(): Date;
    status: number;
    fastPassPossible: boolean;
    rideType: number;
    lastMaintenanceSince(): Date;
}

export interface RideStatus {
    rideStatusId: number;
    rideStatus: string;
}

export interface RideType {
    rideTypeId: number;
    rideType: string;
}

// EMPLOYEES 
//////////////
export interface Employee {
    employeeId: string;
    empFirstName: string;
    empLastName: string;
    empType: number;
    empPhoneNumber: string;
    empAddressStreet: string;
    empAddressCity: string;
    empAddressState: string;
    empAddressZipCode: string;
}

export interface EmployeeType {
    employeeTypeId: number;
    employeeType: string;
}