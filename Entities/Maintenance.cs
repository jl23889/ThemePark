using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Maintenance
    {
        public string MaintenanceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string MainType { get; set; }
        public string Description { get; set; }
        public string RideId { get; set; }
        public string ManagerEmployeeId { get; set; }

        public Employee ManagerEmployee { get; set; }
        public Ride Ride { get; set; }
    }
}
