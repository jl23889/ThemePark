using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class CustomerUser
    {
        public string CustomerId { get; set; }
        public string CustomerUserName { get; set; }
        public byte[] CustomerPasswordHash { get; set; }
        public byte[] CustomerPasswordSalt { get; set; }
    }
}