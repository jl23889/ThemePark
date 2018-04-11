using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class CustomerLogin
    {
        public string CustomerId { get; set; }
        public string CustomerUserName { get; set; }
        public byte[] CustomerPasswordHash { get; set; }
        public byte[] CustomerPasswordSalt { get; set; }

        public Customer Customer { get; set; }
    }
}
