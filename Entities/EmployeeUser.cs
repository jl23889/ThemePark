using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class EmployeeUser
    {
        public string EmployeeId { get; set; }
        public string EmployeeUserName { get; set; }
        public byte[] EmployeePasswordHash { get; set; }
        public byte[] EmployeePasswordSalt { get; set; }
    }
}