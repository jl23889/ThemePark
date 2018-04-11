using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Ride
    {
        public Ride()
        {
            Maintenance = new HashSet<Maintenance>();
            RideEmployeeManages = new HashSet<RideEmployeeManages>();
            RideEmployeeWorksAt = new HashSet<RideEmployeeWorksAt>();
            TicketRideEnters = new HashSet<TicketRideEnters>();
        }

        public string RideId { get; set; }
        public string RideName { get; set; }
        public int TotalCapacity { get; set; }
        public DateTime? InstallationDate { get; set; }
        public short Status { get; set; }
        public bool FastPassPossible { get; set; }
        public short RideType { get; set; }
        public DateTime? LastMaintenanceSince { get; set; }

        public LookUpRideType RideTypeNavigation { get; set; }
        public LookUpRideStatus StatusNavigation { get; set; }
        public ICollection<Maintenance> Maintenance { get; set; }
        public ICollection<RideEmployeeManages> RideEmployeeManages { get; set; }
        public ICollection<RideEmployeeWorksAt> RideEmployeeWorksAt { get; set; }
        public ICollection<TicketRideEnters> TicketRideEnters { get; set; }
    }
}
