﻿using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class CustomerTransaction
    {
        public CustomerTransaction()
        {
            TransactionTicketPurchases = new HashSet<TransactionTicketPurchases>();
        }

        public string TransactionId { get; set; }
        public string CustomerId { get; set; }
        public short TransactionType { get; set; }
        public DateTime Date { get; set; }
        public decimal? TransactionTotal { get; set; }

        public Customer Customer { get; set; }
        public LookUpTransactionType TransactionTypeNavigation { get; set; }
        public ICollection<TransactionTicketPurchases> TransactionTicketPurchases { get; set; }
    }
}
