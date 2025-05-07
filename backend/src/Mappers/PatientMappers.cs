using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using src.Domain;
using src.Dtos.patients;

namespace src.Mappers
{
    public static class PatientMappers
    {
        public static Patient FromCreatePatientRequestDtoToPatient(this CreatePatientRequestDto dto, string createdById)
        {
            return new Patient
            {
                Name = dto.Name,
                LastName = dto.LastName,
            };
        }
    }
}