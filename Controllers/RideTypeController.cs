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
    public class RideTypeController : Controller
    {
        private readonly DataContext _context;
        private readonly ILogger _logger;

        public RideTypeController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<LookUpRideType> LookUpRideType()
        {
            return _context.LookUpRideType.ToList();
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewRideType([FromBody][Bind("RideType")]LookUpRideType rideType)
        {
            // sequentially generate id
            // somewhat of a hack but should work for now
            short id = 0;
            bool found = false;
            while (!found) {
                id++;
                if (_context.LookUpRideType.Find(id) == null) {
                    found = true;
                }
            }
            rideType.RideTypeId=id;
                
            if (ModelState.IsValid && rideType != null) 
            {
                try {
                    _context.LookUpRideType.Add(rideType);
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
        public IActionResult UpdateRideType([FromBody]LookUpRideType rideType)
        {
            if (ModelState.IsValid && rideType != null) 
            {
                try {
                    _context.LookUpRideType.Update(rideType);
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
        public IActionResult DeleteRideType([FromBody]LookUpRideType rs)
        {
            var rideType = _context.LookUpRideType.Find(rs.RideTypeId);
            if (rideType != null) 
            {
                try {
                    _context.LookUpRideType.Remove(rideType);
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