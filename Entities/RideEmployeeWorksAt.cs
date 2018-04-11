using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class RideEmployeeWorksAt
    {
        public string RideId { get; set; }
        public string EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public Employee Employee { get; set; }
        public Ride Ride { get; set; }
    }
}
