using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpGender
    {
        public LookUpGender()
        {
            Customer = new HashSet<Customer>();
        }

        public short GenderId { get; set; }
        public string GenderType { get; set; }

        public ICollection<Customer> Customer { get; set; }
    }
}
