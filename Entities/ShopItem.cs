using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class ShopItem
    {
        public string ShopItemId { get; set; }
        public short ShopItemType { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SellPrice { get; set; }
        public int? TotalStock { get; set; }

        public LookUpShopItemType ShopItemTypeNavigation { get; set; }
    }
}
