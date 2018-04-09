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

// jwt token auth
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace ThemePark.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class WeatherTypeController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public WeatherTypeController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<LookUpWeatherType> LookUpWeatherType()
        {
            return _context.LookUpWeatherType.ToList();
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewWeatherType([FromBody][Bind("WeatherType")]LookUpWeatherType rideStatus)
        {
            // sequentially generate id
            // somewhat of a hack but should work for now
            short id = 0;
            bool found = false;
            while (!found){
                id++;
                if (_context.LookUpWeatherType.Find(id) == null){
                    found = true;
                }
            }
            rideStatus.WeatherTypeId = id;

            if (ModelState.IsValid && rideStatus != null)
            {
                try
                {
                    _context.LookUpWeatherType.Add(rideStatus);
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
        public IActionResult UpdateWeatherType([FromBody]LookUpWeatherType rideStatus)
        {
            if (ModelState.IsValid && rideStatus != null)
            {
                try
                {
                    _context.LookUpWeatherType.Update(rideStatus);
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
        public IActionResult DeleteWeatherType([FromBody]LookUpWeatherType rs)
        {
            var rideStatus = _context.LookUpWeatherType.Find(rs.WeatherTypeId);
            if (rideStatus != null)
            {
                try
                {
                    _context.LookUpWeatherType.Remove(rideStatus);
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
    }
}