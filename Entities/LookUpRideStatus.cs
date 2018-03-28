using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpRideStatus
    {
        public LookUpRideStatus()
        {
            Ride = new HashSet<Ride>();
        }

        public short RideStatusId { get; set; }
        public string RideStatus { get; set; }

        public ICollection<Ride> Ride { get; set; }
    }
}
