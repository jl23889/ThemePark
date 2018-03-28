using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpTicketType
    {
        public LookUpTicketType()
        {
            Ticket = new HashSet<Ticket>();
        }

        public short TicketTypeId { get; set; }
        public string TicketType { get; set; }

        public ICollection<Ticket> Ticket { get; set; }
    }
}
