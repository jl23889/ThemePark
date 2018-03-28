using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Employee
    {
        public Employee()
        {
            Maintenance = new HashSet<Maintenance>();
        }

        public string EmployeeId { get; set; }
        public string EmpFirstName { get; set; }
        public string EmpLastName { get; set; }
        public short EmpType { get; set; }
        public string EmpPhoneNumber { get; set; }
        public string EmpAddressStreet { get; set; }
        public string EmpAddressCity { get; set; }
        public string EmpAddressState { get; set; }
        public string EmpAddressZipCode { get; set; }

        public LookUpEmployeeType EmpTypeNavigation { get; set; }
        public ICollection<Maintenance> Maintenance { get; set; }
    }
}
