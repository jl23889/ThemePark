using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Employee
    {
        public Employee()
        {
            Maintenance = new HashSet<Maintenance>();
            MaintenanceEmployeeWorksAt = new HashSet<MaintenanceEmployeeWorksAt>();
            RideEmployeeManages = new HashSet<RideEmployeeManages>();
            RideEmployeeWorksAt = new HashSet<RideEmployeeWorksAt>();
            ShopEmployeeManages = new HashSet<ShopEmployeeManages>();
            ShopEmployeeWorksAt = new HashSet<ShopEmployeeWorksAt>();
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
        public string EmpProfileImage { get; set; }

        public LookUpEmployeeType EmpTypeNavigation { get; set; }
        public EmployeeLogin EmployeeLogin { get; set; }
        public ICollection<Maintenance> Maintenance { get; set; }
        public ICollection<MaintenanceEmployeeWorksAt> MaintenanceEmployeeWorksAt { get; set; }
        public ICollection<RideEmployeeManages> RideEmployeeManages { get; set; }
        public ICollection<RideEmployeeWorksAt> RideEmployeeWorksAt { get; set; }
        public ICollection<ShopEmployeeManages> ShopEmployeeManages { get; set; }
        public ICollection<ShopEmployeeWorksAt> ShopEmployeeWorksAt { get; set; }
    }
}
