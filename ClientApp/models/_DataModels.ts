export interface RideStatus {
    rideStatusId: number;
    rideStatus: string;
}

export interface RideType {
    rideTypeId: number;
    rideType: string;
}

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