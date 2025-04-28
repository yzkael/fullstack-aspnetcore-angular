using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using src.Domain;
using src.Dtos.patients;
using src.Interfaces;

namespace src.Controllers
{
    [ApiController]
    [Route("/api/patients")]
    public class PatientControllers : ControllerBase
    {
        private readonly IPatientServices _patientServices;

        public PatientControllers(IPatientServices patientServices)
        {
            _patientServices = patientServices;
        }

        public async Task<IActionResult> GetAllPatients([FromQuery] QueryObject query)
        {
            var patients = await _patientServices.GetAllPatients(query);
            return Ok(patients);
        }
        public async Task<IActionResult> CreatePatient([FromBody] CreatePatientRequestDto dto)
        {

            return Ok();
        }
    }
}