using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpShopItemType
    {
        public LookUpShopItemType()
        {
            ShopItem = new HashSet<ShopItem>();
        }

        public short ShopItemTypeId { get; set; }
        public string ShopItemType { get; set; }

        public ICollection<ShopItem> ShopItem { get; set; }
    }
}
