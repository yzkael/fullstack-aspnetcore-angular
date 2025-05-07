using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using src.Domain;
using src.Dtos.patients;
using src.Interfaces;
using src.Mappers;

namespace src.Controllers
{
    [ApiController]
    [Route("/api/patients")]
    public class PatientControllers : ControllerBase
    {
        private readonly IPatientServices _patientServices;
        private readonly ITokenServices _tokenServices;

        public PatientControllers(IPatientServices patientServices, ITokenServices tokenServices)
        {
            _patientServices = patientServices;
            _tokenServices = tokenServices;
        }


        [Authorize]
        public async Task<IActionResult> GetAllPatients([FromQuery] QueryObject query)
        {
            var patients = await _patientServices.GetAllPatients(query);
            return Ok(patients);
        }

        [HttpPost]
        [Authorize]
        [Route("create")]
        public async Task<IActionResult> CreatePatient([FromBody] CreatePatientRequestDto dto)
        {
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            var token = "";
            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                token = authHeader.Substring("Bearer ".Length).Trim();
                // Now `token` contains the JWT token
            }

            var usernameFromToken = _tokenServices.DecodeTokenAndGetUsername(token);
            if (string.IsNullOrEmpty(usernameFromToken))
            {
                return Unauthorized("Invalid token.");
            }

            var newPatient = await _patientServices.CreatePatient(dto.FromCreatePatientRequestDtoToPatient(usernameFromToken));

            if (newPatient == null)
            {
                return BadRequest("Something went wrong while creating patient.");
            }

            // Return 201 Created, including URI (for RESTfulness)
            return CreatedAtAction(nameof(GetPatientById), new { id = newPatient.Id }, newPatient);
        }
        [Route(":id")]
        [HttpGet]
        public async Task<IActionResult> GetPatientById([FromQuery] string id)
        {
            var foundPatient = await _patientServices.GetPatientById(id);
            if (foundPatient == null) return NotFound("Patient is not found");
            return Ok(foundPatient);
        }

    }
}