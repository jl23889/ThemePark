using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using ThemePark.Entities;
using ThemePark.Helpers;
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

public WeatherController(DataContext context, ILogger<WeatherController> logger)
        {
            _context = context;
            _logger = logger;
        }

    [AllowAnonymous]
    [HttpGet("[action]")]
    public IEnumerable<Weather> GetWeather()
    {
        return _context.Weather.ToList();
    }

    [AllowAnonymous]
        // return a single employee by employeeId passed in as param
        [HttpGet("[action]")]
        public Weather GetWeather(DateTime date)
        {
            return _context.Weather.Find(date);
        }
[AllowAnonymous]
        // return weather by array of dates passed in as param
        // sample query: 
        [HttpGet("[action]")]
        public List<Weather> GetWeatherByDate([FromQuery] DateTime[] date)
        {
            List<Weather> weatherList = new List<Weather>();
            foreach(DateTime d in date) {
                weatherList.Add(_context.Weather.Find(d));
            }
            return weatherList;
        }

	[HttpPost("[action]")]
        public IActionResult CreateNewWeather([FromBody] Weather weather)
        {
        	if(ModelState.isValid && weather != null)
        		{
                try {
                    _context.Weather.Add(weather);
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
        public IActionResult UpdateWeather([FromBody]Weather weather)
        {
            if (ModelState.IsValid && weather != null) 
            {
                try {
                    _context.Weather.Update(weather);
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
        public IActionResult DeleteWeather([FromBody]Weather w)
        {
            var weather = _context.Weather.Find(w.date);
            if (weather != null) 
            {
                try {
                    _context.Weather.Remove(weather);
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



