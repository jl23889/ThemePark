using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class EmployeeLogin
    {
        public string EmployeeId { get; set; }
        public string EmployeeUserName { get; set; }
        public byte[] EmployeePasswordHash { get; set; }
        public byte[] EmployeePasswordSalt { get; set; }
    }
}