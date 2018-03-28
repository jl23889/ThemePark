using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Hotel
    {
        public Hotel()
        {
            HotelRoom = new HashSet<HotelRoom>();
        }

        public string HotelId { get; set; }
        public string HotelName { get; set; }
        public int CurrentOccupancy { get; set; }
        public int? MaxOccupancy { get; set; }

        public ICollection<HotelRoom> HotelRoom { get; set; }
    }
}
