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
    public class MaintenanceController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public MaintenanceController(DataContext context, ILogger<MaintenanceController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        // return all maintenances ordered by start date
        [HttpGet("[action]")]
        public IEnumerable<Maintenance> GetMaintenances()
        {
            return _context.Maintenance
            .OrderByDescending(m => m.StartDate)
            .ToList();
        }

        [AllowAnonymous]
        // return a single maintenance by maintenanceId passed in as param
        [HttpGet("[action]")]
        public Maintenance GetMaintenance(string id)
        {
            return _context.Maintenance.Find(id);
        }


        [HttpPost("[action]")]
        public IActionResult CreateNewMaintenance([FromBody] Maintenance maintenance)
        {
            // check if id generated is unique
            // TODO: add some kind of timeout or max retries to while loop
            var uniqueIdFound = false;
            string uid;
            while (!uniqueIdFound) {
                uid = IdGenerator._generateUniqueId(); // id generator helper method
                if (_context.Maintenance.Find(uid) == null) {
                    uniqueIdFound = true;
                    maintenance.MaintenanceId = uid;
                }
            }

            if (ModelState.IsValid && maintenance != null) 
            {
                try {
                    _context.Maintenance.Add(maintenance);
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
        public IActionResult UpdateMaintenance([FromBody]Maintenance maintenance)
        {
            if (ModelState.IsValid && maintenance != null) 
            {
                try {
                    _context.Maintenance.Update(maintenance);
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
        public IActionResult DeleteMaintenance([FromBody]Maintenance m)
        {
            var maintenance = _context.Maintenance.Find(m.MaintenanceId);
            if (maintenance != null) 
            {
                try {
                    _context.Maintenance.Remove(maintenance);
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