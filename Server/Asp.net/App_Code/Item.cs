using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebService
{
    public class Item
    {

        public int Item_ID { get; set; }
        public string Item_name { get; set; }
        public float Item_Price { get; set; }
        public string Item_Pic { get; set; }
        public int Item_quantity { get; set; }

        public Item(int itemID,string name ,float price , string pic , int quantity )
        {
            Item_ID = itemID;
            Item_name = name;
            Item_Price = price;
            Item_Pic = pic;
            Item_quantity = quantity;
       
        }
    }
}