using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class TicketRideEnters
    {
        public string TicketId { get; set; }
        public string RideId { get; set; }
        public DateTime DateTime { get; set; }

        public Ride Ride { get; set; }
        public Ticket Ticket { get; set; }
    }
}
