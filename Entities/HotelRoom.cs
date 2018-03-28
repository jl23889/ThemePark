using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class HotelRoom
    {
        public string HotelRoomId { get; set; }
        public decimal HotelRoomPrice { get; set; }
        public int HotelRoomOccupancy { get; set; }
        public short HotelRoomType { get; set; }
        public string HotelId { get; set; }

        public Hotel Hotel { get; set; }
        public LookUpHotelRoomType HotelRoomTypeNavigation { get; set; }
    }
}
