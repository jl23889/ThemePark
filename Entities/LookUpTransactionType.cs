using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpTransactionType
    {
        public LookUpTransactionType()
        {
            CustomerTransaction = new HashSet<CustomerTransaction>();
        }

        public short TransactionTypeId { get; set; }
        public string TransactionType { get; set; }

        public ICollection<CustomerTransaction> CustomerTransaction { get; set; }
    }
}
