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

namespace ThemePark.Controllers
{
	[Route("api/[controller]")]
    public class EmployeeController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public EmployeeController(DataContext context, ILogger<SampleDataController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employee.ToList();
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewEmployee([FromBody] Employee employee)
        {
            // check if id generated is unique
            // TODO: add some kind of timeout or max retries to while loop
            var uniqueIdFound = false;
            string uid;
            while (!uniqueIdFound) {
                uid = IdGenerator._generateUniqueId(); // id generator helper method
                if (_context.Employee.Find(uid) == null) {
                    uniqueIdFound = true;
                    employee.EmployeeId = uid;
                }
            }

            if (ModelState.IsValid && employee != null) 
            {
                try {
                    _context.Employee.Add(employee);
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
        public IActionResult UpdateEmployee([FromBody]Employee employee)
        {
            if (ModelState.IsValid && employee != null) 
            {
                try {
                    _context.Employee.Update(employee);
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
        public IActionResult DeleteEmployee([FromBody]Employee e)
        {
            var employee = _context.Employee.Find(e.EmployeeId);
            if (employee != null) 
            {
                try {
                    _context.Employee.Remove(employee);
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