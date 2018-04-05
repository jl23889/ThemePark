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

// Customers 
//////////////
export interface Customer {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth(): Date;
    gender: number;
    emergencyContactNumber: string;
    totalSpending: number;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
    totalVisit: number;
}

export interface Gender {
    genderId: number;
    genderType: string;
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

// USER
//////////////
export interface User {
    username: string;
    password: string;
    type: string;
}

