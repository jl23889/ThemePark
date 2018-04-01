using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using ThemePark.Entities;
using Microsoft.Extensions.Logging;

namespace ThemePark.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public SampleDataController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }


        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<LookUpRideStatus> LookUpRideStatus()
        {
            return _context.LookUpRideStatus.ToList();
        }

        [HttpGet("[action]")]
        public IEnumerable<Ride> GetRides()
        {
            return _context.Ride.ToList();
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewRideStatus([FromBody][Bind("RideStatus")]LookUpRideStatus rideStatus)
        {
            // sequentially generate id
            // somewhat of a hack but should work for now
            short id = 0;
            bool found = false;
            while (!found) {
                id++;
                if (_context.LookUpRideStatus.Find(id) == null) {
                    found = true;
                }
            }
            rideStatus.RideStatusId=id;
                
            if (ModelState.IsValid && rideStatus != null) 
            {
                try {
                    _context.LookUpRideStatus.Add(rideStatus);
                    _context.SaveChanges();
                    return Ok(); 
                }  
                catch
                {
                    return BadRequest();
                }  
            }
            return BadRequest();   
        }

        [HttpPut("[action]")]
        public IActionResult UpdateRideStatus([FromBody]LookUpRideStatus rideStatus)
        {
            if (ModelState.IsValid && rideStatus != null) 
            {
                try {
                    _context.LookUpRideStatus.Update(rideStatus);
                    _context.SaveChanges();
                    return Ok(); 
                }  
                catch
                {
                    return BadRequest();
                }  
            }
            return BadRequest();
        }

        [HttpPost("[action]")]
        public IActionResult DeleteRideStatus([FromBody]LookUpRideStatus rs)
        {
            var rideStatus = _context.LookUpRideStatus.Find(rs.RideStatusId);
            if (rideStatus != null) 
            {
                try {
                    _context.LookUpRideStatus.Remove(rideStatus);
                    _context.SaveChanges();
                    return Ok(); 
                }  
                catch
                {
                    return BadRequest();
                }  
            }
            return BadRequest();
        }

        [HttpGet("[action]")]
        public IEnumerable<LookUpRideType> LookUpRideType()
        {
            return _context.LookUpRideType.ToList();
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
