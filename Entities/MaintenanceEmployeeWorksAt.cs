using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class MaintenanceEmployeeWorksAt
    {
        public string MaintenanceId { get; set; }
        public string EmployeeId { get; set; }

        public Employee Employee { get; set; }
        public Maintenance Maintenance { get; set; }
    }
}
