using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class ShopEmployeeManages
    {
        public string ShopId { get; set; }
        public string EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public Employee Employee { get; set; }
        public Shop Shop { get; set; }
    }
}
