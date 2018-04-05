using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ThemePark.Entities
{
    public partial class DataContext : DbContext
    {
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<CustomerTransaction> CustomerTransaction { get; set; }
        public virtual DbSet<CustomerLogin> CustomerLogin { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EmployeeLogin> EmployeeLogin { get; set; }
        public virtual DbSet<Hotel> Hotel { get; set; }
        public virtual DbSet<HotelRoom> HotelRoom { get; set; }
        public virtual DbSet<LookUpEmployeeType> LookUpEmployeeType { get; set; }
        public virtual DbSet<LookUpGender> LookUpGender { get; set; }
        public virtual DbSet<LookUpHotelRoomType> LookUpHotelRoomType { get; set; }
        public virtual DbSet<LookUpRideStatus> LookUpRideStatus { get; set; }
        public virtual DbSet<LookUpRideType> LookUpRideType { get; set; }
        public virtual DbSet<LookUpShopItemType> LookUpShopItemType { get; set; }
        public virtual DbSet<LookUpTicketType> LookUpTicketType { get; set; }
        public virtual DbSet<LookUpTransactionType> LookUpTransactionType { get; set; }
        public virtual DbSet<LookUpWeatherType> LookUpWeatherType { get; set; }
        public virtual DbSet<Maintenance> Maintenance { get; set; }
        public virtual DbSet<Ride> Ride { get; set; }
        public virtual DbSet<Shop> Shop { get; set; }
        public virtual DbSet<ShopItem> ShopItem { get; set; }
        public virtual DbSet<Ticket> Ticket { get; set; }
        public virtual DbSet<Weather> Weather { get; set; }

        // Unable to generate entity type for table 'THEMEPARK.TransactionShopItemPurchases'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.TransactionTicketPurchases'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.WeatherTypeRideTypeAffects'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.CustomerHotelRoomStaysIn'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.CustomerLogin'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.EmployeeLogin'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.MaintenanceEmployeeWorksAt'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.RideEmployeeManages'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.RideEmployeeWorksAt'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.ShopEmployeeManages'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.ShopEmployeeWorksAt'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.ShopItemStores'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.TicketRideEnters'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.TransactionHotelRoomPurchases'. Please see the warning messages.


        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer", "THEMEPARK");

                entity.Property(e => e.CustomerId)
                    .HasColumnName("CustomerID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.AddressCity)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AddressState).HasColumnType("char(2)");

                entity.Property(e => e.AddressStreet)
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.AddressZipCode).HasColumnType("char(5)");

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.EmergencyContactNumber)
                    .IsRequired()
                    .HasColumnType("char(9)");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.TotalSpending)
                    .HasColumnType("decimal(10, 2)")
                    .HasComputedColumnSql("([THEMEPARK].[Customer_TotalSpending]([CustomerID]))");

                entity.Property(e => e.TotalVisit).HasComputedColumnSql("([THEMEPARK].[Customer_TotalVisit]([CustomerID]))");

                entity.HasOne(d => d.GenderNavigation)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.Gender)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Customer__Gender__05D8E0BE");
            });

            modelBuilder.Entity<CustomerLogin>(entity => 
            {
                entity.HasKey(e => e.CustomerUserName);

                entity.ToTable("CustomerLogin", "THEMEPARK");

                entity.Property(e => e.CustomerId)
                    .IsRequired()
                    .HasColumnName("CustomerID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.CustomerUserName)
                    .IsRequired()
                    .HasColumnName("CustomerUserName")
                    .HasMaxLength(30)
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.CustomerPasswordHash)
                    .IsRequired()
                    .HasColumnName("CustomerPasswordHash")
                    .HasColumnType("binary(64)");

                entity.Property(e => e.CustomerPasswordSalt)
                    .IsRequired()
                    .HasColumnName("CustomerPasswordSalt")
                    .HasColumnType("binary(128)");
            });

            modelBuilder.Entity<CustomerTransaction>(entity =>
            {
                entity.HasKey(e => e.TransactionId);

                entity.ToTable("CustomerTransaction", "THEMEPARK");

                entity.Property(e => e.TransactionId)
                    .HasColumnName("TransactionID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.CustomerId)
                    .IsRequired()
                    .HasColumnName("CustomerID")
                    .HasColumnType("char(16)");

                entity.Property(e => e.Date)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TransactionTotal)
                    .HasColumnType("decimal(10, 2)")
                    .HasComputedColumnSql("([THEMEPARK].[TransactionTotal]([TransactionID]))");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.CustomerTransaction)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CustomerT__Custo__09A971A2");

                entity.HasOne(d => d.TransactionTypeNavigation)
                    .WithMany(p => p.CustomerTransaction)
                    .HasForeignKey(d => d.TransactionType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CustomerT__Trans__0A9D95DB");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee", "THEMEPARK");

                entity.Property(e => e.EmployeeId)
                    .HasColumnName("EmployeeID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.EmpAddressCity)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.EmpAddressState).HasColumnType("char(2)");

                entity.Property(e => e.EmpAddressStreet)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmpAddressZipCode).HasColumnType("char(5)");

                entity.Property(e => e.EmpFirstName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.EmpLastName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.EmpPhoneNumber)
                    .IsRequired()
                    .HasColumnType("char(9)");

                entity.HasOne(d => d.EmpTypeNavigation)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.EmpType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__EmpTyp__0B91BA14");
            });

            modelBuilder.Entity<EmployeeLogin>(entity => 
            {
                entity.ToTable("EmployeeLogin", "THEMEPARK");

                entity.HasKey(e => e.EmployeeUserName);

                entity.Property(e => e.EmployeeId)
                    .IsRequired()
                    .HasColumnName("EmployeeID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.EmployeeUserName)
                    .IsRequired()
                    .HasColumnName("EmployeeUserName")
                    .HasMaxLength(30)
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.EmployeePasswordHash)
                    .IsRequired()
                    .HasColumnName("EmployeePasswordHash")
                    .HasColumnType("binary(64)");

                entity.Property(e => e.EmployeePasswordSalt)
                    .IsRequired()
                    .HasColumnName("EmployeePasswordSalt")
                    .HasColumnType("binary(128)");
            });

            modelBuilder.Entity<Hotel>(entity =>
            {
                entity.ToTable("Hotel", "THEMEPARK");

                entity.Property(e => e.HotelId)
                    .HasColumnName("HotelID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.HotelName)
                    .IsRequired()
                    .HasColumnType("char(30)");

                entity.Property(e => e.MaxOccupancy).HasComputedColumnSql("([THEMEPARK].[Hotel_MaxOccupancy]([HotelID]))");
            });

            modelBuilder.Entity<HotelRoom>(entity =>
            {
                entity.ToTable("HotelRoom", "THEMEPARK");

                entity.Property(e => e.HotelRoomId)
                    .HasColumnName("HotelRoomID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.HotelId)
                    .IsRequired()
                    .HasColumnType("char(16)");

                entity.Property(e => e.HotelRoomPrice).HasColumnType("decimal(6, 2)");

                entity.HasOne(d => d.Hotel)
                    .WithMany(p => p.HotelRoom)
                    .HasForeignKey(d => d.HotelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__HotelRoom__Hotel__0E6E26BF");

                entity.HasOne(d => d.HotelRoomTypeNavigation)
                    .WithMany(p => p.HotelRoom)
                    .HasForeignKey(d => d.HotelRoomType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__HotelRoom__Hotel__0D7A0286");
            });

            modelBuilder.Entity<LookUpEmployeeType>(entity =>
            {
                entity.HasKey(e => e.EmployeeTypeId);

                entity.ToTable("LookUpEmployeeType", "THEMEPARK");

                entity.Property(e => e.EmployeeTypeId).ValueGeneratedNever();

                entity.Property(e => e.EmployeeType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpGender>(entity =>
            {
                entity.HasKey(e => e.GenderId);

                entity.ToTable("LookUpGender", "THEMEPARK");

                entity.Property(e => e.GenderId)
                    .HasColumnName("GenderID")
                    .ValueGeneratedNever();

                entity.Property(e => e.GenderType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpHotelRoomType>(entity =>
            {
                entity.HasKey(e => e.HotelRoomTypeId);

                entity.ToTable("LookUpHotelRoomType", "THEMEPARK");

                entity.Property(e => e.HotelRoomTypeId)
                    .HasColumnName("HotelRoomTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.HotelRoomType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpRideStatus>(entity =>
            {
                entity.HasKey(e => e.RideStatusId);

                entity.ToTable("LookUpRideStatus", "THEMEPARK");

                entity.Property(e => e.RideStatusId)
                    .HasColumnName("RideStatusID")
                    .ValueGeneratedNever();

                entity.Property(e => e.RideStatus)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpRideType>(entity =>
            {
                entity.HasKey(e => e.RideTypeId);

                entity.ToTable("LookUpRideType", "THEMEPARK");

                entity.Property(e => e.RideTypeId)
                    .HasColumnName("RideTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.RideType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpShopItemType>(entity =>
            {
                entity.HasKey(e => e.ShopItemTypeId);

                entity.ToTable("LookUpShopItemType", "THEMEPARK");

                entity.Property(e => e.ShopItemTypeId)
                    .HasColumnName("ShopItemTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.ShopItemType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpTicketType>(entity =>
            {
                entity.HasKey(e => e.TicketTypeId);

                entity.ToTable("LookUpTicketType", "THEMEPARK");

                entity.Property(e => e.TicketTypeId)
                    .HasColumnName("TicketTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.TicketType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpTransactionType>(entity =>
            {
                entity.HasKey(e => e.TransactionTypeId);

                entity.ToTable("LookUpTransactionType", "THEMEPARK");

                entity.Property(e => e.TransactionTypeId)
                    .HasColumnName("TransactionTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.TransactionType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<LookUpWeatherType>(entity =>
            {
                entity.HasKey(e => e.WeatherTypeId);

                entity.ToTable("LookUpWeatherType", "THEMEPARK");

                entity.Property(e => e.WeatherTypeId)
                    .HasColumnName("WeatherTypeID")
                    .ValueGeneratedNever();

                entity.Property(e => e.WeatherType)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Maintenance>(entity =>
            {
                entity.ToTable("Maintenance", "THEMEPARK");

                entity.Property(e => e.MaintenanceId)
                    .HasColumnName("MaintenanceID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.MainType)
                    .IsRequired()
                    .HasColumnType("char(1)");

                entity.Property(e => e.ManagerEmployeeId)
                    .IsRequired()
                    .HasColumnType("char(16)");

                entity.Property(e => e.RideId)
                    .IsRequired()
                    .HasColumnType("char(16)");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.ManagerEmployee)
                    .WithMany(p => p.Maintenance)
                    .HasForeignKey(d => d.ManagerEmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Maintenan__Emplo__03F0984C");

                entity.HasOne(d => d.Ride)
                    .WithMany(p => p.Maintenance)
                    .HasForeignKey(d => d.RideId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Maintenan__RideI__6D0D32F4");
            });

            modelBuilder.Entity<Ride>(entity =>
            {
                entity.ToTable("Ride", "THEMEPARK");

                entity.Property(e => e.RideId)
                    .HasColumnName("RideID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.InstallationDate).HasColumnType("date");

                entity.Property(e => e.LastMaintenanceSince)
                    .HasColumnType("date")
                    .HasComputedColumnSql("([THEMEPARK].[Ride_LastMaintenance]([RideID]))");

                entity.Property(e => e.RideName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.RideTypeNavigation)
                    .WithMany(p => p.Ride)
                    .HasForeignKey(d => d.RideType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ride__RideType__1332DBDC");

                entity.HasOne(d => d.StatusNavigation)
                    .WithMany(p => p.Ride)
                    .HasForeignKey(d => d.Status)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ride__Status__14270015");
            });

            modelBuilder.Entity<Shop>(entity =>
            {
                entity.ToTable("Shop", "THEMEPARK");

                entity.Property(e => e.ShopId)
                    .HasColumnName("ShopID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.ShopName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.ShopType)
                    .IsRequired()
                    .HasColumnType("char(1)");
            });

            modelBuilder.Entity<ShopItem>(entity =>
            {
                entity.ToTable("ShopItem", "THEMEPARK");

                entity.Property(e => e.ShopItemId)
                    .HasColumnName("ShopItemID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.CostPrice).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.SellPrice).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.TotalStock).HasComputedColumnSql("([THEMEPARK].[ShopItem_TotalStock]([ShopItemID]))");

                entity.HasOne(d => d.ShopItemTypeNavigation)
                    .WithMany(p => p.ShopItem)
                    .HasForeignKey(d => d.ShopItemType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ShopItem__ShopIt__1CBC4616");
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.ToTable("Ticket", "THEMEPARK");

                entity.Property(e => e.TicketId)
                    .HasColumnName("TicketID")
                    .HasColumnType("char(16)")
                    .ValueGeneratedNever();

                entity.Property(e => e.EffectiveDate).HasColumnType("date");

                entity.Property(e => e.ExpirationDate).HasColumnType("date");

                entity.Property(e => e.TicketPrice).HasColumnType("decimal(6, 2)");

                entity.HasOne(d => d.TicketTypeNavigation)
                    .WithMany(p => p.Ticket)
                    .HasForeignKey(d => d.TicketType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ticket__TicketTy__1F98B2C1");
            });

            modelBuilder.Entity<Weather>(entity =>
            {
                entity.HasKey(e => e.Date);

                entity.ToTable("Weather", "THEMEPARK");

                entity.Property(e => e.Date).HasColumnType("date");

                entity.HasOne(d => d.WeatherTypeNavigation)
                    .WithMany(p => p.Weather)
                    .HasForeignKey(d => d.WeatherType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Weather__Weather__2A164134");
            });
        }
    }
}
