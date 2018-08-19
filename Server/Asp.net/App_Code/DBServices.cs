using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;

namespace WebService
{

    public class DbServices
    {
        static string ConStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
        static SqlConnection con = new SqlConnection(ConStr);
        static SqlCommand com = new SqlCommand();
        static SqlDataReader reader;


        public static IsOk Register(string name, string lastName, string userName, string email, int pass, string dateOfBirth, int age, string adress)
        {
            try
            {
                con.Open();
                com.Connection = con;
                com.Parameters.Clear();
                SqlCommand exec = new SqlCommand("Register", con);
                exec.CommandType = System.Data.CommandType.StoredProcedure;
                exec.Parameters.Add(new SqlParameter("@Name", name));
                exec.Parameters.Add(new SqlParameter("@Lname", lastName));
                exec.Parameters.Add(new SqlParameter("@UserName", userName));
                exec.Parameters.Add(new SqlParameter("@Email", email));
                exec.Parameters.Add(new SqlParameter("@Pass", pass));
                exec.Parameters.Add(new SqlParameter("@DateOfBirth", dateOfBirth));
                exec.Parameters.Add(new SqlParameter("@Age", age));
                exec.Parameters.Add(new SqlParameter("@Adress", adress));
                exec.ExecuteNonQuery();
                con.Close();
                return new IsOk(true);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    reader.Close();
                    con.Close();
                }
            }
            return new IsOk(false);
        }



        public static User Login(string UserName, int pass)
        {
            con.Open();
            com.Connection = con;
            com.Parameters.Clear();
            com.Parameters.Add(new SqlParameter("@UserName", UserName));
            com.Parameters.Add(new SqlParameter("@Pass", pass));
            com.CommandText = "select * from Tbl_Users where UserName = @UserName and Pass = @Pass";
            reader = com.ExecuteReader();

            if (reader.Read())
            {
                User u = new User(int.Parse(reader["ID"].ToString()),reader["UserName"].ToString(), int.Parse(reader["Pass"].ToString()));
                con.Close();
                return u;
            }
            reader.Close();
            con.Close();
            return null;
        }

        //public static Item Buy_Item(int userid, int item_ID, int quantity)
        //{
        //    con.Open();
        //    com.Connection = con;
        //    com.Parameters.Clear();
        //    SqlCommand exec = new SqlCommand("Buy_Items", con);
        //    exec.CommandType = System.Data.CommandType.StoredProcedure;
        //    exec.Parameters.Add(new SqlParameter("@item_ID", item_ID));
        //    exec.Parameters.Add(new SqlParameter("@quantity", quantity));
        //    exec.Parameters.Add(new SqlParameter("@ID", userid));
        //    exec.ExecuteNonQuery();
        //    Item item = new Item(item_ID, quantity);
        //    //com.CommandText = "exec Buy_Items @Item_ID =  @item_ID,@ID = @userid ,@Quantity = @quantity ";
        //    con.Close();
        //    return item;
        //}


        public static List<Inventory> GetIventory()
        {
            try
            {
                con.Open();
                com.Connection = con;
                com.CommandText = "select * from Tbl_Inventory";
                reader = com.ExecuteReader();
                List<Inventory> list = new List<Inventory>();
                while (reader.Read())
                {
                    list.Add(new Inventory(
                                     int.Parse(reader["Item_ID"].ToString()),
                                     reader["Item_Name"].ToString(),
                                     float.Parse(reader["Item_Price"].ToString()),
                                     reader["Item_Picture"].ToString()));

                }
                return list;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    reader.Close();
                    con.Close();
                }
            }
            return null;
        }

        public static List<Inventory> Favorites(int userid)
        {



            try
            {
                con.Open();
                com = new SqlCommand("select top 3 * from Top3Fav where ID = @id order by Item_Quantity desc", con);
                com.Parameters.Add(new SqlParameter("id", userid));
                reader = com.ExecuteReader();
                List<Inventory> list = new List<Inventory>();
                while(reader.Read())
                {
                    list.Add(new Inventory(
                                    int.Parse(reader["Item_ID"].ToString()),
                                    reader["Item_Name"].ToString(),
                                    float.Parse(reader["Item_Price"].ToString()),
                                    reader["Item_Picture"].ToString()));
                }
                return list;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }
                if(reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
            }
         
        }

        public static List<Item> GetCart(int userID)
        {
            try
            {
                con.Open();
                com.Connection = con;
                SqlCommand exec = new SqlCommand("select * from GetShopingList where ID = @userID", con);
                exec.Parameters.Add(new SqlParameter("@userID", userID));
                reader = exec.ExecuteReader();
                List<Item> Items = new List<Item>();
                while(reader.Read())
                {
                    Items.Add(new Item(
                                    int.Parse(reader["Item_ID"].ToString()),
                                    reader["Item_Name"].ToString(),
                                    float.Parse(reader["Item_Price"].ToString()),
                                    reader["Item_Picture"].ToString(),
                                    int.Parse(reader["Item_Quantity"].ToString())) );
                   
                }
                return Items;

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
            }

        }
        public static bool CheckOut(int userID)
        {
            try
            {
                con.Open();
                com.Connection = con;
                com.Parameters.Clear();
                SqlCommand exec = new SqlCommand("BuyFromCart", con);
                exec.CommandType = System.Data.CommandType.StoredProcedure;
                exec.Parameters.Add(new SqlParameter("@userID", userID));
                int rowEffected = exec.ExecuteNonQuery();
                if(rowEffected > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
            }
        }



        public static bool AddToCart(int userID,int ItemID , int quantity)
        {
            try
            {
                con.Open();
                com.Connection = con;
                com.Parameters.Clear();
                SqlCommand exec = new SqlCommand("UpdateCart", con);
                exec.CommandType = System.Data.CommandType.StoredProcedure;
                exec.Parameters.Add(new SqlParameter("@userID", userID));
                exec.Parameters.Add(new SqlParameter("@ItemID", ItemID));
                exec.Parameters.Add(new SqlParameter("@Quantity", quantity));
                int rowEffected = exec.ExecuteNonQuery();
                if (rowEffected > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
            }
        }

        public static List<Item> ISdiscount()
        {
            try
            {
                con.Open();
                com.Connection = con;
                SqlCommand exec = new SqlCommand("select * from Tbl_Inventory where IsDiscount = 'true'", con);
                reader = exec.ExecuteReader();
                List<Item> Items = new List<Item>();
                while (reader.Read())
                {
                    Items.Add(new Item(
                                    int.Parse(reader["Item_ID"].ToString()),
                                    reader["Item_Name"].ToString(),
                                    float.Parse(reader["Item_Price"].ToString()),
                                    reader["Item_Picture"].ToString(),
                                    int.Parse(reader["Item_Quantity"].ToString())));

                }
                return Items;

            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            finally
            {
                if (con.State == ConnectionState.Open)
                {
                    con.Close();
                }
                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }
            }
        }
    }
}