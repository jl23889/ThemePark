using System;
using System.Collections.Generic;
using ThemePark.Entities;

namespace ThemePark.DTO
{
    public class RideDTO
    {
        public string RideId { get; set; }
        public string RideName { get; set; }
        public int TotalCapacity { get; set; }
        public DateTime? InstallationDate { get; set; }
        public short Status { get; set; }
        public bool FastPassPossible { get; set; }
        public short RideType { get; set; }
        public DateTime? LastMaintenanceSince { get; set; }

        public ICollection<RideMaintenanceDTO> Maintenance { get; set; }
        public ICollection<RideEmployeeManagesDTO> RideEmployeeManages { get; set; }
        public ICollection<RideEmployeeWorksAtDTO> RideEmployeeWorksAt { get; set; }
        public ICollection<RideTicketEntersDTO> TicketRideEnters { get; set; }
    }

    public class RideMaintenanceDTO
    {
        public string MaintenanceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string MainType { get; set; }
        public string Description { get; set; }
        public string ManagerEmployeeId { get; set; }
    }

    public class RideEmployeeManagesDTO {
        public string EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class RideEmployeeWorksAtDTO
    {
        public string EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class RideTicketEntersDTO {
        public string TicketId { get; set; }
        public DateTime DateTime { get; set; }
    }
}