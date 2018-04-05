namespace ThemePark.Helpers
{
	// this represents what the user enters in to a login form
	// password is only used for model binding data for authentication
	// password should never be included in outbound responses
	public class CustomerUserDataModel 
	{
		public string CustomerId { get; set; }
		public string CustomerUserName { get; set; }
		public string CustomerPassword { get; set; }
	}

	public class EmployeeUserDataModel 
	{
		public string EmployeeId { get; set; }
		public string EmployeeUserName { get; set; }
		public string EmployeePassword { get; set; }
	}
}