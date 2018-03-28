using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpRideType
    {
        public LookUpRideType()
        {
            Ride = new HashSet<Ride>();
        }

        public short RideTypeId { get; set; }
        public string RideType { get; set; }

        public ICollection<Ride> Ride { get; set; }
    }
}
