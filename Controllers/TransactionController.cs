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
    public class TransactionController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public TransactionController(DataContext context, ILogger<TransactionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public IEnumerable<CustomerTransaction> GetTransactions()
        {
            return _context.CustomerTransaction.ToList();
        }
 
        [HttpPost("[action]")]
        public IActionResult CreateNewTicketTransaction(string customerId)
        {   
            // create a transaction record of type ticket

            // build a CustomerTransaction record
            CustomerTransaction ticketTransaction = new CustomerTransaction();
            ticketTransaction.CustomerId= customerId;
            ticketTransaction.TransactionType= 1;
            ticketTransaction.Date= DateTime.Now;
            // check if id generated is unique
            // TODO: add some kind of timeout or max retries to while loop
            var uniqueIdFound = false;
            string transactionId="";
            string uid="";
            while (!uniqueIdFound) {
                uid = IdGenerator._generateUniqueId(); // id generator helper method
                if (_context.CustomerTransaction.Find(uid) == null) {
                    uniqueIdFound = true;
                    ticketTransaction.TransactionId = uid;
                    transactionId = uid;
                }
            }
                
            if (ModelState.IsValid) 
            {
                try {
                    _context.CustomerTransaction.Add(ticketTransaction);
                    _context.SaveChanges();
                    return Ok(new {
                        transactionId= uid // return transactionId
                    }); 
                }  
                catch
                {
                    return BadRequest();
                }  
            }

            return BadRequest();
        }

        [HttpPost("[action]")]
        public IActionResult CreateNewTransactionTicketPurchase([FromBody]TransactionTicketPurchases ttp)
        {  
            // find ticket and set purchase price from ticket price
            Ticket ticket=_context.Ticket.Find(ttp.TicketId);
            ttp.PurchaseAmount= Convert.ToInt32(ticket.TicketPrice);

            if (ModelState.IsValid) 
            {
                try {
                    _context.TransactionTicketPurchases.Add(ttp);
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
