using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace src.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class TestControllers : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public IActionResult AuthTest()
        {
            return Ok("Authorization Working Correctly");
        }

        [HttpGet]
        [Route("sudo")]
        [Authorize(Roles = "SUDO")]
        public IActionResult AuthorizationTest()
        {
            return Ok("Authorization Works");
        }

    }
}