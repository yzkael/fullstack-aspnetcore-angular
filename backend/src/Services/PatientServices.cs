using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using src.Data;
using src.Domain;
using src.Interfaces;

namespace src.Services
{
    public class PatientServices : IPatientServices
    {
        private readonly AppDbContext _context;

        public PatientServices(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Patient?> CreatePatient(Patient patient)
        {
            var createdPatient = await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();
            return createdPatient.Entity;
        }

        public async Task<List<Patient>> GetAllPatients(QueryObject query)
        {
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            return await _context.Patients.AsQueryable().Skip(skipNumber ?? 0).Take(query.PageSize ?? 10).ToListAsync();
        }

        public async Task<Patient?> GetPatientById(string id)
        {
            return await _context.Patients.FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}