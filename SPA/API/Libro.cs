namespace API
{
    public class Libro
    {
        public int IDLibro { get; set; }
        public int IDEditorial { get; set; }
        public string Titulo { get; set; }
        public int IDAutor { get; set; }
        public int CantPaginas { get; set; }
        public string Estado { get; set; }
        public string Disponibilidad { get; set; }
    }
}
