using AutoMapper;
using ThemePark.Helpers;
using ThemePark.Entities;

namespace ThemePark.Helpers
{
	// we use mapping so we dont expose password information during
	// outgoing http requests
	public class CustomerAutoMapperProfile : Profile
	{
		public CustomerAutoMapperProfile()
		{
			CreateMap<CustomerLogin, CustomerUserDataModel>();
			CreateMap<CustomerUserDataModel, CustomerLogin>();
		}
	}

	public class EmployeeAutoMapperProfile : Profile
	{
		public EmployeeAutoMapperProfile()
		{
			CreateMap<EmployeeLogin, EmployeeUserDataModel>();
			CreateMap<EmployeeUserDataModel, EmployeeLogin>();
		}
	}
}