using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibreriaController : ControllerBase
    {
        IConfiguration _config;

        public LibreriaController(IConfiguration configuration)
        {
            _config = configuration;
        }
        // GET: api/<LibreriaController>
        [HttpGet]
        public IEnumerable<Libro> Libros()
        {
            string connStr = _config.GetSection("Configuration").GetSection("ConnString").Value;
            List<Libro> libros = new List<Libro>();
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand();
                conn.Open();
                cmd = new SqlCommand("select * from Libro", conn);
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Libro libro = new Libro
                    {
                        IDLibro = Convert.ToInt32(reader["IDLibro"].ToString()),
                        IDEditorial = Convert.ToInt32(reader["IDEditorial"].ToString()),
                        IDAutor = Convert.ToInt32(reader["IDAutor"].ToString()),
                        CantPaginas = Convert.ToInt32(reader["CantPaginas"].ToString()),
                        Disponibilidad= reader["Disponibilidad"].ToString(),
                        Estado = reader["Estado"].ToString(),
                        Titulo = reader["Titulo"].ToString()
                    };
                    libros.Add(libro);
                }
            }
            return libros;
        }

        // PUT api/<LibreriaController>/5
        [HttpPost, Route("Update")]
        public ActionResult Update([FromBody] Libro value)
        {
            string connStr = _config.GetSection("Configuration").GetSection("ConnString").Value;
            List<Libro> libros = new List<Libro>();
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand();
                conn.Open();
                cmd = new SqlCommand(string.Format("update Libro set IDEditorial={0}, Titulo='{1}', IDAutor={2}, CantPaginas={3}, Estado='{4}', Disponibilidad='{5}' where IDLibro={6}",
                    value.IDEditorial,value.Titulo,value.IDAutor,value.CantPaginas,value.Estado,value.Disponibilidad, value.IDLibro), conn);
                //SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(cmd);
                //cmd.Dispose();
                cmd.ExecuteNonQuery();
            }
            return Ok(true);
        }
    }
}
