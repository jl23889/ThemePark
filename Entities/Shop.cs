using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Shop
    {
        public Shop()
        {
            ShopEmployeeManages = new HashSet<ShopEmployeeManages>();
            ShopEmployeeWorksAt = new HashSet<ShopEmployeeWorksAt>();
        }

        public string ShopId { get; set; }
        public string ShopName { get; set; }
        public string ShopType { get; set; }

        public ICollection<ShopEmployeeManages> ShopEmployeeManages { get; set; }
        public ICollection<ShopEmployeeWorksAt> ShopEmployeeWorksAt { get; set; }
    }
}
