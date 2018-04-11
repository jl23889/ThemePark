using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpWeatherType
    {
        public LookUpWeatherType()
        {
            Weather = new HashSet<Weather>();
            WeatherTypeRideTypeAffects = new HashSet<WeatherTypeRideTypeAffects>();
        }

        public short WeatherTypeId { get; set; }
        public string WeatherType { get; set; }

        public ICollection<Weather> Weather { get; set; }
        public ICollection<WeatherTypeRideTypeAffects> WeatherTypeRideTypeAffects { get; set; }
    }
}
