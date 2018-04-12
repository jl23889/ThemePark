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
    public class EmployeeController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public EmployeeController(DataContext context, ILogger<EmployeeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employee.ToList();
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        // get all manager employees( manager employees have EmpType 2 )
        public IEnumerable<Employee> GetManagerEmployees()
        {
            return _context.Employee.Where(e => e.EmpType == 2).ToList();
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        // get all ride employees( ride employees have EmpType 3 )
        public IEnumerable<Employee> GetRideEmployees()
        {
            return _context.Employee.Where(e => e.EmpType == 3).ToList();
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        // get all maintenance employees( maint employees have EmpType 5 )
        public IEnumerable<Employee> GetMaintenanceEmployees()
        {
            return _context.Employee.Where(e => e.EmpType == 5).ToList();
        }

        [AllowAnonymous]
        // return a single employee by employeeId passed in as param
        [HttpGet("[action]")]
        public Employee GetEmployee(string id)
        {
            return _context.Employee.Find(id);
        }

        [AllowAnonymous]
        // return employees by array of ids passed in as param
        // sample query: 
        // /getemployeesbyid?id=ed2db3b7b1d942b8&id=ed2db3b7b1d942b8
        [HttpGet("[action]")]
        public List<Employee> GetEmployeesById([FromQuery] string[] id)
        {
            List<Employee> employeeList = new List<Employee>();
            foreach(string i in id) {
                employeeList.Add(_context.Employee.Find(i));
            }
            return employeeList;
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