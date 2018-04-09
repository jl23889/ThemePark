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
    public class EmployeeTypeController : Controller
    {
        private readonly DataContext _context;
        private readonly ILogger _logger;

        public EmployeeTypeController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<LookUpEmployeeType> LookUpEmployeeType()
        {
            return _context.LookUpEmployeeType.ToList();
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewEmployeeType([FromBody][Bind("EmployeeType")]LookUpEmployeeType employeeType)
        {
            // sequentially generate id
            // somewhat of a hack but should work for now
            short id = 0;
            bool found = false;
            while (!found) {
                id++;
                if (_context.LookUpEmployeeType.Find(id) == null) {
                    found = true;
                }
            }
            employeeType.EmployeeTypeId=id;
                
            if (ModelState.IsValid && employeeType != null) 
            {
                try {
                    _context.LookUpEmployeeType.Add(employeeType);
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
        public IActionResult UpdateEmployeeType([FromBody]LookUpEmployeeType employeeType)
        {
            if (ModelState.IsValid && employeeType != null) 
            {
                try {
                    _context.LookUpEmployeeType.Update(employeeType);
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
        public IActionResult DeleteEmployeeType([FromBody]LookUpEmployeeType et)
        {
            var employeeType = _context.LookUpEmployeeType.Find(et.EmployeeTypeId);
            if (employeeType != null) 
            {
                try {
                    _context.LookUpEmployeeType.Remove(employeeType);
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