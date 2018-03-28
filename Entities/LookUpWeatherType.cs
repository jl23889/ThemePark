using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class LookUpWeatherType
    {
        public LookUpWeatherType()
        {
            Weather = new HashSet<Weather>();
        }

        public short WeatherTypeId { get; set; }
        public string WeatherType { get; set; }

        public ICollection<Weather> Weather { get; set; }
    }
}
