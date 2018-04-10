// ALERT
//////////////
export interface Alert {
    toastId: number;
    alertType: string;
    alertMessage: string;
}

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
    empProfileImage: string;
}

export interface EmployeeType {
    employeeTypeId: number;
    employeeType: string;
}

// MAINTENANCE 
//////////////
export interface Maintenance {
    maintenanceId: string;
    startDate: Date;
    endDate: Date;
    mainType: string;
    description: string;
    rideId: string;
    managerEmployeeId: string;
}

export interface MaintenanceEmployee {
    maintenanceId: string;
    employeeId: string;
}

// TICKET  
//////////////
export interface Ticket {
    ticketId: string;
    ticketType: number;
    ticketPrice: number;
    effectiveDate: Date;
    expirationDate: Date;
    fastPass: boolean;
}

export interface TicketType {
    ticketTypeId: number;
    ticketType: string;
}

// TRANSACTION  
//////////////
export interface Transaction {
    transactionId: string;
    customerId: string;
    transactionType: number;
}

// WEATHER TYPE 
//////////////
export interface WeatherType {
    weatherTypeId: number;
    weatherType: string;
}

