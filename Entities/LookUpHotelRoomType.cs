using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpHotelRoomType
    {
        public LookUpHotelRoomType()
        {
            HotelRoom = new HashSet<HotelRoom>();
        }

        public short HotelRoomTypeId { get; set; }
        public string HotelRoomType { get; set; }

        public ICollection<HotelRoom> HotelRoom { get; set; }
    }
}
