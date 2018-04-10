using AutoMapper;
using System.Collections.Generic;
using ThemePark.Helpers;
using ThemePark.Entities;
using ThemePark.DTO;

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

	// create automapper mappings
	public class MaintenanceAutoMapperProfile : Profile
	{
		public MaintenanceAutoMapperProfile()
		{
			CreateMap<Maintenance, MaintenanceDTO>();
            CreateMap<MaintenanceDTO, MaintenanceUpdate>();
            CreateMap<MaintenanceUpdate, Maintenance>();
		}
	}
	public class MaintenanceEmployeeWorksAtAutoMapperProfile : Profile
	{
		public MaintenanceEmployeeWorksAtAutoMapperProfile()
		{
			CreateMap<MaintenanceEmployeeWorksAt, MaintenanceEmployeeWorksAtDTO>();
		}
	}
	public class MaintenanceEmployeeAutoMapperProfile : Profile
	{
		public MaintenanceEmployeeAutoMapperProfile()
		{
			CreateMap<Employee, MaintenanceEmployeeDTO>();
		}
	}
	public class MaintenanceRideAutoMapperProfile : Profile
	{
		public MaintenanceRideAutoMapperProfile()
		{
			CreateMap<Ride, MaintenanceRideDTO>();
		}
	}

}