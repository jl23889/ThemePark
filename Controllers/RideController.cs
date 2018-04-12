using AutoMapper;
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
using ThemePark.DTO;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

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
        private readonly IMapper _mapper;

        public RideController(DataContext context, 
            ILogger<RideController> logger,
            IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<RideDTO> GetRides()
        {
            return _mapper.Map<IEnumerable<RideDTO>>
            (_context.Ride
            .Include(r=> r.Maintenance)
            .Include(r=> r.RideEmployeeManages)
            .Include(r=> r.RideEmployeeWorksAt)
            .Include(r=> r.TicketRideEnters)
            .ToList());
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<RideDTO> GetRides()
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

        [HttpPost("[action]")]
        public IActionResult AssignRideEmployees([FromBody] List<RideEmployeeWorksAt> res)
        {   
            // ensure maintenance object is created and employees are valid
            foreach (var re in res) {
                var ride = _context.Ride.Find(re.RideId);
                var employee = _context.Employee.Find(re.EmployeeId);
                var rideEmployee = _context.RideEmployeeWorksAt.Find(re.RideId, re.EmployeeId);

                if (ride != null && employee != null && rideEmployee == null) 
                {
                    try {              
                        _context.RideEmployeeWorksAt.Add(re);
                    }  
                    catch
                    {
                        return BadRequest();
                    }  
                } else {
                    return BadRequest();   
                }
                
            } 
            _context.SaveChanges();
            return Ok(res); //return list of ride employees added 
            
        }

        [HttpPost("[action]")]
        public IActionResult RemoveAllRideEmployees([FromBody] RideEmployeeWorksAt re)
        {   
            // ensure ride object is created and employees are valid
            var rideEmployees = 
                _context.RideEmployeeWorksAt
                .Where(r => r.RideId.Contains(re.RideId))
                .ToList();
            try {        
                foreach (RideEmployeeWorksAt r in rideEmployees) {
                    _context.RideEmployeeWorksAt.Remove(r);
                }     

                _context.SaveChanges();
                return Ok(); 
            }  
            catch
            {
                return BadRequest();
            }  
        }

        [HttpPost("[action]")]
        public IActionResult AssignRideManagers([FromBody] List<RideEmployeeManages> res)
        {   
            // ensure maintenance object is created and employees are valid
            foreach (var re in res) {
                var ride = _context.Ride.Find(re.RideId);
                var employee = _context.Employee.Find(re.EmployeeId);
                var rideEmployee = _context.RideEmployeeManages.Find(re.RideId, re.EmployeeId);

                if (ride != null && employee != null && rideEmployee == null) 
                {
                    try {              
                        _context.RideEmployeeManages.Add(re);
                    }  
                    catch
                    {
                        return BadRequest();
                    }  
                } else {
                    return BadRequest();   
                }
                
            } 
            _context.SaveChanges();
            return Ok(res); //return list of ride employees added   
        }

        [HttpPost("[action]")]
        public IActionResult RemoveAllRideManagers([FromBody] RideEmployeeManages re)
        {   
            // ensure ride object is created and employees are valid
            var rideEmployees = 
                _context.RideEmployeeManages
                .Where(r => r.RideId.Contains(re.RideId))
                .ToList();
            try {        
                foreach (RideEmployeeManages r in rideEmployees) {
                    _context.RideEmployeeManages.Remove(r);
                }     

                _context.SaveChanges();
                return Ok(); 
            }  
            catch
            {
                return BadRequest();
            }  
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
