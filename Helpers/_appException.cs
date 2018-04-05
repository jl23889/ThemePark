using System;
using System.Globalization;

namespace ThemePark.Helpers
{
	// used to throw custom exceptions 
	
	public class AppException : Exception
	{
		public AppException() : base() {}

		public AppException(string message) : base(message) {}
	}
}