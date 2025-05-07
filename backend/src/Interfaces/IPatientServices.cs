using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using src.Domain;

namespace src.Interfaces
{
    public interface IPatientServices
    {
        public Task<List<Patient>> GetAllPatients(QueryObject query);

        public Task<Patient?> CreatePatient(Patient patient);

        public Task<Patient?> GetPatientById(string id);
    }
}