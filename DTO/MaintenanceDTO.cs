using System;
using System.Collections.Generic;
using ThemePark.Entities;

namespace ThemePark.DTO
{
    public class MaintenanceDTO
    {
        public string MaintenanceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string MainType { get; set; }
        public string Description { get; set; }
        public string RideId { get; set; }
        public string ManagerEmployeeId { get; set; }

        public MaintenanceEmployeeDTO ManagerEmployee { get; set; }
        public MaintenanceRideDTO Ride { get; set; }
        public ICollection<MaintenanceEmployeeWorksAtDTO> MaintenanceEmployeeWorksAt { get; set; }
    }

    // maintenanceDTO => maintenanceUpdate
    public class MaintenanceUpdate {
        public string MaintenanceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string MainType { get; set; }
        public string Description { get; set; }
        public string RideId { get; set; }
        public string ManagerEmployeeId { get; set; }
    }

    public class MaintenanceEmployeeDTO
    {
        public string EmployeeId { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public short EmpType { get; set; }
        public string EmpProfileImage { get; set; }
    }

    public class MaintenanceEmployeeWorksAtDTO {
        public string EmployeeId { get; set; }
    }

    public class MaintenanceRideDTO
    {
        public string RideId { get; set; }
        public string RideName { get; set; }
    }
}
