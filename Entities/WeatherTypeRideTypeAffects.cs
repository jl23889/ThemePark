using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class WeatherTypeRideTypeAffects
    {
        public short WeatherTypeId { get; set; }
        public short RideTypeId { get; set; }

        public LookUpRideType RideType { get; set; }
        public LookUpWeatherType WeatherType { get; set; }
    }
}
