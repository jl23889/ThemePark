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
    public class RideStatusController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public RideStatusController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<LookUpRideStatus> LookUpRideStatus()
        {
            return _context.LookUpRideStatus.ToList();
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
    }
}