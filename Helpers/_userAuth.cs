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

// we use these methods to help abstract user authentication

namespace ThemePark.Helpers
{
	public interface IUserAuthService
	{
		// TODO: write update user methods
		CustomerLogin AuthenticateCustomerUser(string username, string password);
		CustomerLogin CreateCustomerUser(CustomerLogin user, string password);
		// void UpdateCustomerUser(CustomerUser user, string password = null); 

		EmployeeLogin AuthenticateEmployeeUser(string username, string password);
		EmployeeLogin CreateEmployeeUser(EmployeeLogin user, string password);
		// void UpdateEmployeeUser(EmployeeUser user, string password = null); 
	}

	public class UserAuthService : IUserAuthService
	{
		private readonly DataContext _context;
        private readonly ILogger _logger;

        public UserAuthService(DataContext context, ILogger<UserAuthService> logger)
        {
            _context = context;
            _logger = logger;
        }

        // returns a customerLogin given a username and password
        public CustomerLogin AuthenticateCustomerUser(string username, string password)
        {
        	if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        		return null;

        	var user = _context.CustomerLogin.SingleOrDefault(x => x.CustomerUserName == username);

        	// check if username exists
        	if (user == null)
        		return null;

        	// check if password is correct
        	if (!VerifyPasswordHash(password, user.CustomerPasswordHash, user.CustomerPasswordSalt))
        		return null;

        	// auth successful
        	return user;
        }

         // returns a employeeLogin given a username and password
        public EmployeeLogin AuthenticateEmployeeUser(string username, string password)
        {
        	if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        		return null;

        	var user = _context.EmployeeLogin.SingleOrDefault(x => x.EmployeeUserName == username);

        	// check if username exists
        	if (user == null)
        		return null;

        	// check if password is correct
        	if (!VerifyPasswordHash(password, user.EmployeePasswordHash, user.EmployeePasswordSalt))
        		return null;

        	// auth successful
        	return user;
        }

        // returns a customerUser after creating customer
        public CustomerLogin CreateCustomerUser(CustomerLogin user, string password)
        {
        	if (string.IsNullOrWhiteSpace(password))
        		throw new AppException("Password is required");

        	if (_context.CustomerLogin.Any(x => x.CustomerUserName == user.CustomerUserName))
        		throw new AppException("Username " + user.CustomerUserName + " is already taken");

        	byte[] passwordHash, passwordSalt;
        	// create encoded binary64 passwordHash and binary128 passwordSalt
        	CreatePasswordHash(password, out passwordHash, out passwordSalt);

        	user.CustomerPasswordHash = passwordHash;
        	user.CustomerPasswordSalt = passwordSalt;

        	_context.CustomerLogin.Add(user);
        	_context.SaveChanges();

        	return user;
        }

        // returns a employeeUser after creating employee
        public EmployeeLogin CreateEmployeeUser(EmployeeLogin user, string password)
        {
        	if (string.IsNullOrWhiteSpace(password))
        		throw new AppException("Password is required");

        	if (_context.EmployeeLogin.Any(x => x.EmployeeUserName == user.EmployeeUserName))
        		throw new AppException("Username " + user.EmployeeUserName + " is already taken");

        	byte[] passwordHash, passwordSalt;
        	// create encoded binary64 passwordHash and binary128 passwordSalt
        	CreatePasswordHash(password, out passwordHash, out passwordSalt);

        	user.EmployeePasswordHash = passwordHash;
        	user.EmployeePasswordSalt = passwordSalt;

        	_context.EmployeeLogin.Add(user);
        	_context.SaveChanges();

        	return user;
        }

        // private helper methods

        private static void CreatePasswordHash(
        	string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
        	if (password == null) throw new ArgumentNullException("password");
        	if (string.IsNullOrWhiteSpace(password)) {
        		throw new ArgumentException("Value cannot be empty", "password");
        	}

        	using (var hmac = new System.Security.Cryptography.HMACSHA512())
        	{
        		passwordSalt = hmac.Key;
        		passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        	}
        }

        private static bool VerifyPasswordHash(
        	string password, byte[] storedHash, byte[] storedSalt)
        {
        	if (password == null) throw new ArgumentNullException("password");
        	if (string.IsNullOrWhiteSpace(password)) {
        		throw new ArgumentException("Value cannot be empty", "password");
        	}
        	if (storedHash.Length != 64 )
        	{
        		throw new ArgumentException("Invalid length of password hash", "passwordHash");
        	}
        	if (storedSalt.Length != 128 )
        	{
        		throw new ArgumentException("Invalid length of password salt", "passwordSalt");
        	}

        	using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
        	{
        		// check stored passwordHash against given password computed by stored passwordSalt
        		var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        		
        		for (int i = 0; i < computedHash.Length; i++)
        		{
        			if (computedHash[i] != storedHash[i]) return false;
        		}
        	}

        	return true;
        }
	}
}
