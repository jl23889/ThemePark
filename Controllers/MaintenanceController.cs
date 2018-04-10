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
    public class MaintenanceController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public MaintenanceController(DataContext context, 
            ILogger<MaintenanceController> logger,
            IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [AllowAnonymous]
        // return all maintenances ordered by start date
        [HttpGet("[action]")]
        public IEnumerable<MaintenanceDTO> GetMaintenances()
        {
            // automapper mapping (TODO: figure out a way to map maintenance employees)
            return _mapper.Map<IEnumerable<MaintenanceDTO>>
            (_context.Maintenance
            .Include(m=> m.Ride)
            .Include(m=> m.ManagerEmployee)
            .Include(m=> m.MaintenanceEmployeeWorksAt)
            .OrderByDescending(m => m.StartDate)
            .ToList());
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

        [HttpPost("[action]")]
        public IActionResult AssignMaintenanceEmployee([FromBody]MaintenanceEmployeeWorksAt me)
        {   
            // ensure maintenance object is created and employees are valid
            var maintenance = _context.Maintenance.Find(me.MaintenanceId);
            var employee = _context.Employee.Find(me.EmployeeId);

            if (maintenance != null && employee != null) 
            {
                try {              
                    _context.MaintenanceEmployeeWorksAt.Add(me);
                    _context.SaveChanges();
                    // return maintenance and employee objects
                    return Ok(
                        new {
                            maintenance = maintenance,
                            employee = employee
                        }
                    ); 
                }  
                catch
                {
                    return BadRequest();
                }  
            }
            return BadRequest();   
        }

        [HttpPut("[action]")]
        public IActionResult UpdateMaintenance([FromBody]MaintenanceDTO maintDTO)
        {
            // scrub the values before updating
            //  this way we prevent updates on ride and employee
            // maintenanceDTO => maintenanceUpdate => maintenance
            var maint = _mapper.Map<Maintenance>(_mapper.Map<MaintenanceUpdate>(maintDTO));

            if (ModelState.IsValid && maint != null) 
            {
                try {
                    _context.Maintenance.Update(maint);
                    _context.SaveChanges();
                    return Ok(
                        // just return the original input if update successful
                        new {
                            maintenance = maintDTO
                        }
                    ); 
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