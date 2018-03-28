using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Customer
    {
        public Customer()
        {
            CustomerTransaction = new HashSet<CustomerTransaction>();
        }

        public string CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public short Gender { get; set; }
        public string EmergencyContactNumber { get; set; }
        public decimal? TotalSpending { get; set; }
        public string AddressStreet { get; set; }
        public string AddressCity { get; set; }
        public string AddressState { get; set; }
        public string AddressZipCode { get; set; }
        public int? TotalVisit { get; set; }

        public LookUpGender GenderNavigation { get; set; }
        public ICollection<CustomerTransaction> CustomerTransaction { get; set; }
    }
}
