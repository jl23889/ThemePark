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

using System.Text;
using System.Data;
using System.Globalization;

// jwt token auth
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Collections;

namespace ThemePark.Controllers
{

    public class Result
    {
        public Result(double average, int total, DateTime maxDate, int maxCount)
        {
            this.average = average;
            this.total = total;
            this.maxDate = maxDate;
            this.maxCount = maxCount;
        }

        public double average { get; set; }
        public int total { get; set; }
        public DateTime maxDate { get; set; }
        public int maxCount { get; set; }
    }

    public class SummaryResult
    {
        public SummaryResult(string name, double average, int total, DateTime maxDate, int maxCount, int ageGroup1, int ageGroup2, int ageGroup3, int ageGroup4)
        {
            this.name = name;
            this.average = average;
            this.total = total;
            this.maxDate = maxDate;
            this.maxCount = maxCount;
            this.ageGroup1_0_to_18 = ageGroup1;
            this.ageGroup2_19_to_30 = ageGroup2;
            this.ageGroup3_31_to_50 = ageGroup3;
            this.ageGroup4_over50 = ageGroup4;
        }

        public string name { get; set; }
        public double average { get; set; }
        public int total { get; set; }
        public DateTime maxDate { get; set; }
        public int maxCount { get; set; }
        public int ageGroup1_0_to_18 { get; set; }
        public int ageGroup2_19_to_30 { get; set; }
        public int ageGroup3_31_to_50 { get; set; }
        public int ageGroup4_over50 { get; set; }
    }

    [Authorize]
    [Route("api/[controller]")]
    public class ReportController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger _logger;

        public ReportController(DataContext context, ILogger<ReportController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IActionResult ParkVisit()//(DateTime startTime, DateTime endTime)
        {
            //the following two lines are for testing purpose, comment out before passing parameters.
            DateTime startTime = new DateTime(2010, 1, 1);
            DateTime endTime = new DateTime(2011, 1, 1);

            /*
            TimeSpan difference = endTime - startTime;
            int difference_in_days = difference.Days + 1;
            */

            var park = (from ticket in _context.TicketRideEnters
                        where ticket.DateTime <= endTime && ticket.DateTime >= startTime
                        select new { TicketId = ticket.TicketId, DateTime = ticket.DateTime.Date }).Distinct();

            var park_grp = park.GroupBy(x => x.DateTime.Date)
                .Select(g => new { Dateinfo = g.Key, Count = g.Count() });

            int park_total = park.Count();
            double park_average = park_grp.Average(l => l.Count);
            
            var park_max = park_grp.OrderByDescending(y => y.Count).First();

            /*
            var park_max = park.GroupBy(x => x.DateTime.Date)
                .Select(g => new { Dateinfo = g.Key, Count = g.Count() }).OrderByDescending(y => y.Count).First();

            int park_total = park.Count();
            int park_average = park_total / difference_in_days;
            */

            DateTime park_max_dateinfo = park_max.Dateinfo;
            int park_max_count = park_max.Count;

            Result temp = new Result(park_average, park_total, park_max_dateinfo, park_max_count);
            return Ok(temp);
        }
        
        [AllowAnonymous]
        [HttpGet("[action]")]
        public IActionResult RideVisit()//(DateTime startTime, DateTime endTime, string rideID)
        {
            //the following three lines are for testing purpose, comment out before passing parameters.
            DateTime startTime = new DateTime(2010, 1, 1);
            DateTime endTime = new DateTime(2011, 1, 1);
            string rideID = "0000000000000000";

            //TimeSpan difference = endTime - startTime;
            //int difference_in_days = difference.Days + 1;

            var ride = from ticket in _context.TicketRideEnters
                       where ticket.DateTime <= endTime && ticket.DateTime >= startTime && ticket.RideId == rideID
                       select new { ticket.TicketId, ticket.RideId, ticket.DateTime };

            var ride_grp = ride.GroupBy(x => x.DateTime.Date)
                .Select(g => new { Dateinfo = g.Key, Count = g.Count() });

            var ride_max = ride_grp.OrderByDescending(y => y.Count).First();

            int ride_total = ride.Count();
            double ride_average = ride_grp.Average(l => l.Count);//ride_total / difference_in_days;

            DateTime ride_max_dateinfo = ride_max.Dateinfo;
            int ride_max_count = ride_max.Count;

            Result temp = new Result(ride_average, ride_total, ride_max_dateinfo, ride_max_count);
            return Ok(temp);
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IActionResult SummaryVisit(DateTime startTime, DateTime endTime)
        {
            List<SummaryResult> ls = new List<SummaryResult>();

            //hardcode start
            //DateTime startTime = new DateTime(2010, 1, 1);
            //DateTime endTime = new DateTime(2011, 1, 1);
            //hardcode end
            int ageGroup1 = 0;
            int ageGroup2 = 0;
            int ageGroup3 = 0;
            int ageGroup4 = 0;

            int thisYear = DateTime.Now.Year;

            var parklist = (from ticket in _context.TicketRideEnters
                        where ticket.DateTime <= endTime && ticket.DateTime >= startTime
                        select new { TicketId = ticket.TicketId, DateTime = ticket.DateTime.Date }).Distinct();

            if (parklist.Count() != 0)
            {
                var park_grp = parklist.GroupBy(x => x.DateTime.Date).Select(g => new { Dateinfo = g.Key, Count = g.Count() });
                int park_total = parklist.Count();
                double park_average = park_grp.Average(l => l.Count);
                var park_max = park_grp.OrderByDescending(y => y.Count).First();
                DateTime park_max_dateinfo = park_max.Dateinfo;
                int park_max_count = park_max.Count;
                
                //age distribution for park

                var customerAgeList = from p in parklist
                           join ttp in _context.TransactionTicketPurchases on p.TicketId equals ttp.TicketId
                           join ct in _context.CustomerTransaction on ttp.TransactionId equals ct.TransactionId
                           join c in _context.Customer on ct.CustomerId equals c.CustomerId
                           select new { Age = thisYear - c.DateOfBirth.Value.Year };

                foreach (var customer in customerAgeList)
                {
                    if (customer.Age < 18)
                        ageGroup1++;
                    else if (customer.Age < 30)
                        ageGroup2++;
                    else if (customer.Age < 50)
                        ageGroup3++;
                    else
                        ageGroup4++;
                }

                ls.Add(new SummaryResult("ParkInTotal", park_average, park_total, park_max_dateinfo, park_max_count, ageGroup1, ageGroup2, ageGroup3, ageGroup4));
            }

            foreach (var ride in _context.Ride)
            {
                string rideID = ride.RideId;
                string rideName = ride.RideName;
                ageGroup1 = 0;
                ageGroup2 = 0;
                ageGroup3 = 0;
                ageGroup4 = 0;

                var ridelist = from ticket in _context.TicketRideEnters
                           where ticket.DateTime <= endTime && ticket.DateTime >= startTime && ticket.RideId == rideID
                           select new { ticket.TicketId, ticket.RideId, ticket.DateTime };

                if (ridelist.Count() != 0)
                {
                    var ride_grp = ridelist.GroupBy(x => x.DateTime.Date).Select(g => new { Dateinfo = g.Key, Count = g.Count() });

                    var ride_max = ride_grp.OrderByDescending(y => y.Count).First();

                    int ride_total = ridelist.Count();
                    double ride_average = ride_grp.Average(l => l.Count);//ride_total / difference_in_days;

                    DateTime ride_max_dateinfo = ride_max.Dateinfo;
                    int ride_max_count = ride_max.Count;

                    //
                    var customerAgeList = from p in ridelist
                                          join ttp in _context.TransactionTicketPurchases on p.TicketId equals ttp.TicketId
                                          join ct in _context.CustomerTransaction on ttp.TransactionId equals ct.TransactionId
                                          join c in _context.Customer on ct.CustomerId equals c.CustomerId
                                          select new { Age = thisYear - c.DateOfBirth.Value.Year };

                    foreach (var customer in customerAgeList)
                    {
                        if (customer.Age < 18)
                            ageGroup1++;
                        else if (customer.Age < 30)
                            ageGroup2++;
                        else if (customer.Age < 50)
                            ageGroup3++;
                        else
                            ageGroup4++;
                    }

                    ls.Add(new SummaryResult(rideName, ride_average, ride_total, ride_max_dateinfo, ride_max_count, ageGroup1, ageGroup2, ageGroup3, ageGroup4));
                }
            }

            return Ok(ls);
        }

        [AllowAnonymous]
        [HttpGet("[action]")]
        public IActionResult LastWeekVisit()
        {
            //hardcode date for testing, replace before deployment
            DateTime today = new DateTime(2010, 1, 8);
            //DateTime today = DateTime.Today;

            DateTime mondayOfLastWeek = today.AddDays(-(int)today.DayOfWeek - 6);
            DateTime sundayOfLastWeek = today.AddDays(-(int)today.DayOfWeek);

            return SummaryVisit(mondayOfLastWeek, sundayOfLastWeek);
        } 
    }
}

