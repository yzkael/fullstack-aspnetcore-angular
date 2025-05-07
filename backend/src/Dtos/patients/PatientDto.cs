using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace src.Dtos.patients
{
    public class PatientDto
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string CodHc { get; set; } = Guid.NewGuid().ToString();
    }
}