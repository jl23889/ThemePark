using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class TransactionTicketPurchases
    {
        public string TransactionId { get; set; }
        public string TicketId { get; set; }
        public int PurchaseAmount { get; set; }

        public Ticket Ticket { get; set; }
        public CustomerTransaction Transaction { get; set; }
    }
}
