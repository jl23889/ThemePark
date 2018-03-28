using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Ticket
    {
        public string TicketId { get; set; }
        public short TicketType { get; set; }
        public decimal TicketPrice { get; set; }
        public DateTime EffectiveDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool FastPass { get; set; }

        public LookUpTicketType TicketTypeNavigation { get; set; }
    }
}
