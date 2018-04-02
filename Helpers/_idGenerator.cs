using System;

namespace ThemePark.Helpers
{
    public class IdGenerator {
        // generate a 16 char unique id 
        //  not always guaranteed to be unique, so check against the database
        public static string _generateUniqueId()
        {
            Guid g = Guid.NewGuid();                
            string GuidString = g.ToString();
            GuidString = GuidString.Replace("-", "");
            GuidString = GuidString.Remove(16);
            return GuidString;
        }
    }
}
