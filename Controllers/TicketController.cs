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
    public class TicketController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public TicketController(DataContext context, ILogger<TicketController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<Ticket> GetTickets()
        {
            return _context.Ticket.ToList();
        }

        // return ticket item in response
        [HttpPost("[action]")]
        public IActionResult CreateNewTicket([FromBody]Ticket ticket)
        {
            // check if id generated is unique
            // TODO: add some kind of timeout or max retries to while loop
            var uniqueIdFound = false;
            string uid;
            while (!uniqueIdFound) {
                uid = IdGenerator._generateUniqueId(); // id generator helper method
                if (_context.Ticket.Find(uid) == null) {
                    uniqueIdFound = true;
                    ticket.TicketId = uid;
                }
            }

            if (ModelState.IsValid && ticket != null) 
            {
                try {
                    _context.Ticket.Add(ticket);
                    _context.SaveChanges();
                    return Ok(new {
                        ticketId= uid // return transactionId
                    }); 
                }  
                catch
                {
                    return BadRequest();
                }  
            }
            return BadRequest();   
        }

        [HttpPut("[action]")]
        public IActionResult UpdateTicket([FromBody]Ticket ticket)
        {
            if (ModelState.IsValid && ticket != null) 
            {
                try {
                    _context.Ticket.Update(ticket);
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
        public IActionResult DeleteTicket([FromBody]Ticket t)
        {
            var ticket = _context.Ticket.Find(t.TicketId);
            if (ticket != null) 
            {
                try {
                    _context.Ticket.Remove(ticket);
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
