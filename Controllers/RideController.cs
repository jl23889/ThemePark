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
    public class RideController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public RideController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<Ride> GetRides()
        {
            return _context.Ride.ToList();
        }

        // return a single ride by rideId passed in as param
        [AllowAnonymous]
        [HttpGet("[action]")]
        public Ride GetRide(string id)
        {
            return _context.Ride.Find(id);
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewRide([FromBody] Ride ride)
        {
            // check if id generated is unique
            // TODO: add some kind of timeout or max retries to while loop
            var uniqueIdFound = false;
            string uid;
            while (!uniqueIdFound) {
                uid = IdGenerator._generateUniqueId(); // id generator helper method
                if (_context.Ride.Find(uid) == null) {
                    uniqueIdFound = true;
                    ride.RideId = uid;
                }
            }

            if (ModelState.IsValid && ride != null) 
            {
                try {
                    _context.Ride.Add(ride);
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
        public IActionResult UpdateRide([FromBody]Ride ride)
        {
            if (ModelState.IsValid && ride != null) 
            {
                try {
                    _context.Ride.Update(ride);
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
        public IActionResult DeleteRide([FromBody]Ride r)
        {
            var ride = _context.Ride.Find(r.RideId);
            if (ride != null) 
            {
                try {
                    _context.Ride.Remove(ride);
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
