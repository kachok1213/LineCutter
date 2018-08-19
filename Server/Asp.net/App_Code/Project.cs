using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using WebService;

/// <summary>
/// Summary description for Project
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Project : System.Web.Services.WebService
{

    public Project()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    [WebMethod]
    public string Register(string name, string lastName, string userName, string email, int pass, string dateOfBirth, int age, string adress)
    {
        IsOk output = DbServices.Register(name, lastName, userName, email, pass, dateOfBirth, age, adress);
        return new JavaScriptSerializer().Serialize(output);
    }


    [WebMethod]
    public string Login(string userName, int pass)
    {
        User user = DbServices.Login(userName, pass);

        string output = new JavaScriptSerializer().Serialize(user);
        return output;
    }


    [WebMethod]
    public string Inventory()
    {
        List<Inventory> list = DbServices.GetIventory();
        string output = new JavaScriptSerializer().Serialize(list);
        return output;
    }


    [WebMethod]
    public string Favorites(int userid)
    {
        List<Inventory> list = DbServices.Favorites(userid);
        string output = new JavaScriptSerializer().Serialize(list);
        return output;
    }

    [WebMethod]
    public string GetCart(int userid)
    {
        List<Item> list = DbServices.GetCart(userid);
        string output = new JavaScriptSerializer().Serialize(list);
        return output;
    }

    [WebMethod]
    public bool CheckOut(int userid)
    {

        return DbServices.CheckOut(userid);
    }

    [WebMethod]
    public bool AddToCart(int userid, int itemID, int quantity)
    {

        return DbServices.AddToCart(userid, itemID, quantity);
    }

    [WebMethod]
    public string ISdiscount()
    {
        List<Item> list = DbServices.ISdiscount();
        string output = new JavaScriptSerializer().Serialize(list);
        return output;
    }
}
