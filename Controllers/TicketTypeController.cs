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
    public class TicketTypeController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public TicketTypeController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public IEnumerable<LookUpTicketType> LookUpTicketType()
        {
            return _context.LookUpTicketType.ToList();
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewTicketType([FromBody][Bind("TicketType")]LookUpTicketType rideStatus)
        {
            // sequentially generate id
            // somewhat of a hack but should work for now
            short id = 0;
            bool found = false;
            while (!found) {
                id++;
                if (_context.LookUpTicketType.Find(id) == null) {
                    found = true;
                }
            }
            rideStatus.TicketTypeId=id;
                
            if (ModelState.IsValid && rideStatus != null) 
            {
                try {
                    _context.LookUpTicketType.Add(rideStatus);
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
        public IActionResult UpdateTicketType([FromBody]LookUpTicketType rideStatus)
        {
            if (ModelState.IsValid && rideStatus != null) 
            {
                try {
                    _context.LookUpTicketType.Update(rideStatus);
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
        public IActionResult DeleteTicketType([FromBody]LookUpTicketType rs)
        {
            var rideStatus = _context.LookUpTicketType.Find(rs.TicketTypeId);
            if (rideStatus != null) 
            {
                try {
                    _context.LookUpTicketType.Remove(rideStatus);
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