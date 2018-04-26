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
using Microsoft.EntityFrameworkCore;

// jwt token auth
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace ThemePark.Controllers
{
    [Authorize]
	[Route("api/[controller]")]
    public class CustomerController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public CustomerController(DataContext context, ILogger<CustomerController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Customer.ToList();
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public Customer GetCustomer(string id)
        {
            return _context.Customer.Find(id);
        }

        [HttpGet("[action]")]
        public IEnumerable<TransactionTicketPurchases> GetCustomerTicketTransaction(string id)
        {
            //string id = "6cda9e94fe354a8d";

            IEnumerable<TransactionTicketPurchases> transactions_table = (from c in _context.CustomerTransaction
                                                                          join t in _context.TransactionTicketPurchases on c.TransactionId equals t.TransactionId
                                                                          where c.CustomerId == id && c.TransactionType == 1
                                                                          select t).Include(r => r.Ticket);


            return transactions_table.ToList();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult CreateNewCustomer([FromBody] Customer customer)
        {
            // check if id generated is unique
            // TODO: add some kind of timeout or max retries to while loop
            var uniqueIdFound = false;
            string uid;
            while (!uniqueIdFound) {
                uid = IdGenerator._generateUniqueId(); // id generator helper method
                if (_context.Customer.Find(uid) == null) {
                    uniqueIdFound = true;
                    customer.CustomerId = uid;
                }
            }

            if (ModelState.IsValid && customer != null) 
            {
                try {
                    _context.Customer.Add(customer);
                    _context.SaveChanges();
                    return Ok(customer); 
                }  
                catch
                {
                    return BadRequest();
                }  
            }
            return BadRequest();   
        }

        [HttpPut("[action]")]
        public IActionResult UpdateCustomer([FromBody]Customer customer)
        {
            if (ModelState.IsValid && customer != null) 
            {
                try {
                    _context.Customer.Update(customer);
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
        public IActionResult DeleteCustomer([FromBody]Customer c)
        {
            var customer = _context.Customer.Find(c.CustomerId);
            if (customer != null) 
            {
                try {
                    _context.Customer.Remove(customer);
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