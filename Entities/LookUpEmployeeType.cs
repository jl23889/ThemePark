using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpEmployeeType
    {
        public LookUpEmployeeType()
        {
            Employee = new HashSet<Employee>();
        }

        public short EmployeeTypeId { get; set; }
        public string EmployeeType { get; set; }

        public ICollection<Employee> Employee { get; set; }
    }
}
