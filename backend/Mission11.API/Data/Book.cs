using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mission11.API.Data
{
    [Table("Books")]
    public class Books
    {
        [Key] 
        [Required]
        public int BookID { get; set; }
        [Required]
        public string Title  { get; set; }
        [Required]
        public string Author  { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string ISBN  { get; set; }
        [Required]
        public string Classification  { get; set; }
        [Required]
        public string Category  { get; set; }
        [Required]
        public int PageCount  { get; set; }
        [Required]
        public string Price  { get; set; }
    }
}