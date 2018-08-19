using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebService
{
    public class User
    {
        public string UserName { get; set; }
        public int pass { get; set; }
        public int userID { get; set; }

        public User(int id , string userName, int password)
        {
            UserName = userName;
            pass = password;
            userID = id;
        }

    }
}