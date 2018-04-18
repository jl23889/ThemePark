﻿using System;
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
        public SummaryResult(string name, double average, int total, DateTime maxDate, int maxCount)
        {
            this.name = name;
            this.average = average;
            this.total = total;
            this.maxDate = maxDate;
            this.maxCount = maxCount;
        }

        public string name { get; set; }
        public double average { get; set; }
        public int total { get; set; }
        public DateTime maxDate { get; set; }
        public int maxCount { get; set; }
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

                ls.Add(new SummaryResult("Park", park_average, park_total, park_max_dateinfo, park_max_count));
            }

            foreach (var ride in _context.Ride)
            {
                string rideID = ride.RideId;
                string rideName = ride.RideName;

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

                    ls.Add(new SummaryResult(rideName, ride_average, ride_total, ride_max_dateinfo, ride_max_count));
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

