/*
Use Master
GO
Drop database LineCutter
GO
*/

go
CREATE DATABASE LineCutter  
ON (NAME = 'LineCutter_Data', 
    FILENAME = 'C:\sql Dbs\Line Cutter\LineCutter.MDF' , 
    SIZE = 10, 
    FILEGROWTH = 30%) 
LOG ON (NAME = 'LineCutter_Log', 
        FILENAME = 'C:\sql Dbs\Line Cutter\LineCutter.LDF' ,
        SIZE = 10, 
        FILEGROWTH = 30%)
COLLATE Hebrew_CI_AS
GO

Use LineCutter
GO

----------------------tables------------------------------------



CREATE TABLE [dbo].[Tbl_Users](
	[ID] [int] IDENTITY(1,1) PRIMARY KEY,
	[Name] [nvarchar](50) NOT NULL,
	[Lname] [nvarchar](50) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Pass] [int] NOT NULL,
	[DateOfBirth] [nvarchar](10) NOT NULL,
	[Age] [int] NOT NULL,
	[Adress] [nvarchar](50) NOT NULL,
)


CREATE TABLE [dbo].[Tbl_Inventory](
	[Item_ID] [int] IDENTITY(1,1) primary key NOT NULL,
	[Item_Name] [nvarchar](50) NOT NULL,
	[Item_Price] [float] NOT NULL,
	[Item_Quantity] [int] ,
    [Item_Picture] [nvarchar](50),
    [IsDiscount] bit not null
) ON [PRIMARY]

GO



CREATE TABLE [dbo].[Tbl_Orders](
 [ID] [int] foreign key references Tbl_Users([ID]),
 [Item_ID] int foreign key references Tbl_Inventory([Item_ID]),
 [Item_Quantity] int,
 PRIMARY KEY([ID],[Item_ID])
)

create table Shopping_Cart
(
	[ID] [int] foreign key references Tbl_Users([ID]),
	[Item_ID] int foreign key references Tbl_Inventory([Item_ID]),
	[Item_Quantity] int,
)




Set DateFormat dmy
GO
--------------------inserts-----------------------------

insert into [Tbl_Users]([Name],[Lname],[UserName],[Email],[Pass],[DateOfBirth],[Age],[Adress]) values('amit','peretz','kachok','amiperisr@gmail.com',123,'09/10/1990',27,'hatoren 1 yavne')
insert into [Tbl_Users]([Name],[Lname],[UserName],[Email],[Pass],[DateOfBirth],[Age],[Adress]) values('ohad','haviv','ohad92','ohad@gmail.com',123,'09/10/1992',26,'netanya')
insert into [Tbl_Users]([Name],[Lname],[UserName],[Email],[Pass],[DateOfBirth],[Age],[Adress]) values('orhay','benaim','shipstreet','shipstreet@gmail.com',123,'09/10/1994',23,'hatoren 1 yavne')

insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('Coca-cola',5.90,50,'cola.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('Sprite',5.90,50,'Sprite.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('במבה',6.80,50,'במבה.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('ביסלי',6.80,50,'ביסלי.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('קפה',4,50,'קפה.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('אספרסו',5.20,50,'אספרסו.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('הפוך',6,50,'הפוך.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('סנדוויץ-טונה',9,50,'סנדוויץ-טונה.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('סנדוויץ-חביתה',8.50,50,'סנדוויץ-חביתה.jpg',0)
insert into [Tbl_Inventory]([Item_Name],[Item_Price],[Item_Quantity],[Item_Picture],[IsDiscount]) values('טוסט',10.50,50,'טוסט.jpg',0)






----------------------------------View------------------

CREATE View Select_Favorites
as
SELECT TOP (3) dbo.Tbl_Orders.ID, dbo.Tbl_Orders.Item_ID, dbo.Tbl_Inventory.Item_Name, dbo.Tbl_Inventory.Item_Price, dbo.Tbl_Inventory.Item_Picture, dbo.Tbl_Orders.Item_Quantity
FROM            dbo.Tbl_Inventory INNER JOIN
                         dbo.Tbl_Orders ON dbo.Tbl_Inventory.Item_ID = dbo.Tbl_Orders.Item_ID
WHERE        (dbo.Tbl_Orders.ID = 1)
ORDER BY dbo.Tbl_Orders.Item_Quantity desc
go


create view GetShopingList
as
SELECT        site16.Shopping_Cart.ID, site16.Tbl_Inventory.Item_Name, site16.Tbl_Inventory.Item_Price, site16.Tbl_Inventory.Item_Picture, site16.Shopping_Cart.Item_Quantity
FROM            site16.Shopping_Cart INNER JOIN
                         site16.Tbl_Inventory ON site16.Shopping_Cart.Item_ID = site16.Tbl_Inventory.Item_ID
go



---------------------procs------------------------------


create PROCEDURE Register
@Name nvarchar(50),
@Lname nvarchar(50),
@UserName nvarchar(50),
@Email nvarchar(50),
@Pass int,
@DateOfBirth nvarchar(10),
@Age int,
@Adress nvarchar(50)
AS
Begin
 INSERT Into [dbo].[Tbl_Users]([Name],[Lname],[UserName],[Email],[Pass],[DateOfBirth],[Age],[Adress])values(@Name,@Lname,@UserName,@Email,@Pass,@DateOfBirth,@Age,@Adress)
END
GO

exec Register @Name='RAN',@Lname='koli',@UserName='ranko',@Email='ran@gmail.com',@Pass=123,@DateOfBirth='05/04/1990',@Age=27,@Adress='netanya'
go


CREATE PROCEDURE Buy_Items
    @Item_ID int,   
    @ID int,
	@Quantity int
AS   
Declare @counter int = (select [Item_Quantity] from [dbo].[Tbl_Orders] where [ID]= @ID and [Item_ID]=@Item_ID and [Item_Quantity]= @Quantity)
begin
    Update [Tbl_Inventory]
    SET [Item_Quantity]=[Item_Quantity]-@Quantity
    WHERE Item_ID = @Item_ID 
	if exists(select [Item_Quantity] from [dbo].[Tbl_Orders] where [ID]= @ID and [Item_ID]=@Item_ID  )
	begin
	update [dbo].[Tbl_Orders]
	set [Item_Quantity]=@counter+@Quantity
	where [ID]= @ID and [Item_ID]=@Item_ID
	end
	else
	begin
    INSERT Into [Tbl_Orders]([ID],[Item_ID],[Item_Quantity]) values( @ID , @Item_ID,@Quantity)
	end
end
GO  

exec Buy_Items @Item_ID=2,@ID=1,@Quantity=50
go


CREATE proc Discount_Undiscount
@Item_ID int ,
@Discount float,
@ISDiscount bit
as
if(@Discount=0.8)
begin
Update [Tbl_Inventory]
SET [Item_Price]=[Item_Price]*@Discount , [IsDiscount]=@ISDiscount
WHERE [Item_ID]=@Item_ID
end

go


exec Discount_Undiscount 3,0.8,1
go

create proc BuyFromCart(
@userID int
)
as
declare @ItemID int
declare @Quantity int

select top(1) @ItemID = [Item_ID], @Quantity = [Item_Quantity] from Shopping_Cart where ID = @userID;
while @@rowcount > 0
begin
    exec Buy_Items @ItemID , @userID, @Quantity;
	delete from Shopping_Cart where [Item_ID] = @ItemID and [Item_Quantity] = @Quantity and ID = @userID
    select top(1) @ItemID = [Item_ID], @Quantity = [Item_Quantity] from Shopping_Cart where ID = @userID;
end;
go


create proc UpdateCart
(
@userID int,
@ItemID int,
@Quantity int
)
as

	if(exists (select * from Shopping_Cart where ID = @userID and Item_ID = @ItemID))
	begin
		Update Shopping_Cart set Item_Quantity = @Quantity
	end
	else
	begin
		Insert into Shopping_Cart(ID , Item_ID, Item_Quantity) values(@userID, @ItemID, @Quantity)
	end

go
