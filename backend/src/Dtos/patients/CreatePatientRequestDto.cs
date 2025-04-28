using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace src.Dtos.patients
{
    public class CreatePatientRequestDto
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string LastName { get; set; } = null!;
        [Required]
        [MaxLength(30)]
        public string? ProductName { get; set; }
        [Required]
        public IFormFile? ImageFile { get; set; }

    }
}