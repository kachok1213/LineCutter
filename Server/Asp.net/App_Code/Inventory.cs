using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Inventory
/// </summary>
public class Inventory
{
     
    public int Item_ID { get; set; }
    public string product_name { get; set; }
    public float Price { get; set; }
    public string Item_Pic { get; set; }

    public Inventory(int id,string name,float price,string pic)
    {
        Item_ID = id;
        product_name = name;
        Price = price;
        Item_Pic = pic;
    }

}