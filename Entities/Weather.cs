using System;
using System.Collections.Generic;

namespace ThemePark.Entities
{
    public partial class Weather
    {
        public DateTime Date { get; set; }
        public short WeatherType { get; set; }

        public LookUpWeatherType WeatherTypeNavigation { get; set; }
    }
}
