using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ThemePark.Entities
{
    public partial class DataContext : DbContext
    {
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<CustomerLogin> CustomerLogin { get; set; }
        public virtual DbSet<CustomerTransaction> CustomerTransaction { get; set; }
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
        public virtual DbSet<MaintenanceEmployeeWorksAt> MaintenanceEmployeeWorksAt { get; set; }
        public virtual DbSet<Ride> Ride { get; set; }
        public virtual DbSet<RideEmployeeManages> RideEmployeeManages { get; set; }
        public virtual DbSet<RideEmployeeWorksAt> RideEmployeeWorksAt { get; set; }
        public virtual DbSet<Shop> Shop { get; set; }
        public virtual DbSet<ShopEmployeeManages> ShopEmployeeManages { get; set; }
        public virtual DbSet<ShopEmployeeWorksAt> ShopEmployeeWorksAt { get; set; }
        public virtual DbSet<ShopItem> ShopItem { get; set; }
        public virtual DbSet<Ticket> Ticket { get; set; }
        public virtual DbSet<TicketRideEnters> TicketRideEnters { get; set; }
        public virtual DbSet<TransactionTicketPurchases> TransactionTicketPurchases { get; set; }
        public virtual DbSet<Weather> Weather { get; set; }
        public virtual DbSet<WeatherTypeRideTypeAffects> WeatherTypeRideTypeAffects { get; set; }

        // Unable to generate entity type for table 'THEMEPARK.TransactionShopItemPurchases'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.CustomerHotelRoomStaysIn'. Please see the warning messages.
        // Unable to generate entity type for table 'THEMEPARK.ShopItemStores'. Please see the warning messages.
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

                entity.HasIndex(e => e.CustomerId)
                    .HasName("UQ__Customer__A4AE64B96DDD2A13")
                    .IsUnique();

                entity.HasIndex(e => e.CustomerUserName)
                    .HasName("UQ__Customer__4F2A282CE4A0CEFC")
                    .IsUnique();

                entity.Property(e => e.CustomerUserName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.CustomerId)
                    .IsRequired()
                    .HasColumnName("CustomerID")
                    .HasColumnType("char(16)");

                entity.Property(e => e.CustomerPasswordHash)
                    .IsRequired()
                    .HasColumnType("binary(64)");

                entity.Property(e => e.CustomerPasswordSalt)
                    .IsRequired()
                    .HasColumnType("binary(128)");

                entity.HasOne(d => d.Customer)
                    .WithOne(p => p.CustomerLogin)
                    .HasForeignKey<CustomerLogin>(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CustomerL__Custo__08B54D69");
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

                entity.Property(e => e.EmpProfileImage).IsUnicode(false);

                entity.HasOne(d => d.EmpTypeNavigation)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.EmpType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Employee__EmpTyp__0B91BA14");
            });

            modelBuilder.Entity<EmployeeLogin>(entity =>
            {
                entity.HasKey(e => e.EmployeeUserName);

                entity.ToTable("EmployeeLogin", "THEMEPARK");

                entity.HasIndex(e => e.EmployeeId)
                    .HasName("UQ__Employee__7AD04FF0BCB19E15")
                    .IsUnique();

                entity.HasIndex(e => e.EmployeeUserName)
                    .HasName("UQ__Employee__89DFCFF86856EF14")
                    .IsUnique();

                entity.Property(e => e.EmployeeUserName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .ValueGeneratedNever();

                entity.Property(e => e.EmployeeId)
                    .IsRequired()
                    .HasColumnName("EmployeeID")
                    .HasColumnType("char(16)");

                entity.Property(e => e.EmployeePasswordHash)
                    .IsRequired()
                    .HasColumnType("binary(64)");

                entity.Property(e => e.EmployeePasswordSalt)
                    .IsRequired()
                    .HasColumnType("binary(128)");

                entity.HasOne(d => d.Employee)
                    .WithOne(p => p.EmployeeLogin)
                    .HasForeignKey<EmployeeLogin>(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EmployeeL__Emplo__0C85DE4D");
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

            modelBuilder.Entity<MaintenanceEmployeeWorksAt>(entity =>
            {
                entity.HasKey(e => new { e.MaintenanceId, e.EmployeeId });

                entity.ToTable("MaintenanceEmployeeWorksAt", "THEMEPARK");

                entity.Property(e => e.MaintenanceId).HasColumnType("char(16)");

                entity.Property(e => e.EmployeeId).HasColumnType("char(16)");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.MaintenanceEmployeeWorksAt)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MaintenanceEmployeeWorksAt_Employee");

                entity.HasOne(d => d.Maintenance)
                    .WithMany(p => p.MaintenanceEmployeeWorksAt)
                    .HasForeignKey(d => d.MaintenanceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MaintenanceEmployeeWorksAt_Maintenance");
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

            modelBuilder.Entity<RideEmployeeManages>(entity =>
            {
                entity.HasKey(e => new { e.RideId, e.EmployeeId });

                entity.ToTable("RideEmployeeManages", "THEMEPARK");

                entity.Property(e => e.RideId).HasColumnType("char(16)");

                entity.Property(e => e.EmployeeId).HasColumnType("char(16)");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.RideEmployeeManages)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RideEmplo__Emplo__151B244E");

                entity.HasOne(d => d.Ride)
                    .WithMany(p => p.RideEmployeeManages)
                    .HasForeignKey(d => d.RideId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RideEmplo__RideI__160F4887");
            });

            modelBuilder.Entity<RideEmployeeWorksAt>(entity =>
            {
                entity.HasKey(e => new { e.RideId, e.EmployeeId });

                entity.ToTable("RideEmployeeWorksAt", "THEMEPARK");

                entity.Property(e => e.RideId).HasColumnType("char(16)");

                entity.Property(e => e.EmployeeId).HasColumnType("char(16)");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.RideEmployeeWorksAt)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RideEmplo__Emplo__17036CC0");

                entity.HasOne(d => d.Ride)
                    .WithMany(p => p.RideEmployeeWorksAt)
                    .HasForeignKey(d => d.RideId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RideEmplo__RideI__17F790F9");
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

            modelBuilder.Entity<ShopEmployeeManages>(entity =>
            {
                entity.HasKey(e => new { e.ShopId, e.EmployeeId });

                entity.ToTable("ShopEmployeeManages", "THEMEPARK");

                entity.Property(e => e.ShopId).HasColumnType("char(16)");

                entity.Property(e => e.EmployeeId).HasColumnType("char(16)");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.ShopEmployeeManages)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ShopEmplo__Emplo__18EBB532");

                entity.HasOne(d => d.Shop)
                    .WithMany(p => p.ShopEmployeeManages)
                    .HasForeignKey(d => d.ShopId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ShopEmplo__ShopI__19DFD96B");
            });

            modelBuilder.Entity<ShopEmployeeWorksAt>(entity =>
            {
                entity.HasKey(e => new { e.ShopId, e.EmployeeId });

                entity.ToTable("ShopEmployeeWorksAt", "THEMEPARK");

                entity.Property(e => e.ShopId).HasColumnType("char(16)");

                entity.Property(e => e.EmployeeId).HasColumnType("char(16)");

                entity.Property(e => e.EndDate).HasColumnType("date");

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.ShopEmployeeWorksAt)
                    .HasForeignKey(d => d.EmployeeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ShopEmplo__Emplo__1AD3FDA4");

                entity.HasOne(d => d.Shop)
                    .WithMany(p => p.ShopEmployeeWorksAt)
                    .HasForeignKey(d => d.ShopId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ShopEmplo__ShopI__1BC821DD");
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

            modelBuilder.Entity<TicketRideEnters>(entity =>
            {
                entity.HasKey(e => new { e.TicketId, e.RideId });

                entity.ToTable("TicketRideEnters", "THEMEPARK");

                entity.Property(e => e.TicketId).HasColumnType("char(16)");

                entity.Property(e => e.RideId).HasColumnType("char(16)");

                entity.HasOne(d => d.Ride)
                    .WithMany(p => p.TicketRideEnters)
                    .HasForeignKey(d => d.RideId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TicketRid__RideI__208CD6FA");

                entity.HasOne(d => d.Ticket)
                    .WithMany(p => p.TicketRideEnters)
                    .HasForeignKey(d => d.TicketId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__TicketRid__Ticke__2180FB33");
            });

            modelBuilder.Entity<TransactionTicketPurchases>(entity =>
            {
                entity.HasKey(e => new { e.TransactionId, e.TicketId });

                entity.ToTable("TransactionTicketPurchases", "THEMEPARK");

                entity.Property(e => e.TransactionId).HasColumnType("char(16)");

                entity.Property(e => e.TicketId).HasColumnType("char(16)");

                entity.HasOne(d => d.Ticket)
                    .WithMany(p => p.TransactionTicketPurchases)
                    .HasForeignKey(d => d.TicketId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Transacti__Ticke__2BFE89A6");

                entity.HasOne(d => d.Transaction)
                    .WithMany(p => p.TransactionTicketPurchases)
                    .HasForeignKey(d => d.TransactionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Transacti__Trans__2B0A656D");
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

            modelBuilder.Entity<WeatherTypeRideTypeAffects>(entity =>
            {
                entity.HasKey(e => new { e.WeatherTypeId, e.RideTypeId });

                entity.ToTable("WeatherTypeRideTypeAffects", "THEMEPARK");

                entity.HasOne(d => d.RideType)
                    .WithMany(p => p.WeatherTypeRideTypeAffects)
                    .HasForeignKey(d => d.RideTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WeatherTy__RideT__2B0A656D");

                entity.HasOne(d => d.WeatherType)
                    .WithMany(p => p.WeatherTypeRideTypeAffects)
                    .HasForeignKey(d => d.WeatherTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WeatherTy__Weath__2BFE89A6");
            });
        }
    }
}
